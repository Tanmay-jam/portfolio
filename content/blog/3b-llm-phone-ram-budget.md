---
title: "Running a 3B LLM on a phone's RAM budget: what actually moves the number"
date: "2026-11-11"
summary: "Repack, KV cache and mmap, measured on Qwen2.5 3B Q4_K_M. One flag cuts 1.2 GiB of peak RAM; the floor without layer streaming is about 2.2 GiB."
topic: "On-device LLM"
tags: ["llama.cpp", "On-device", "Quantization", "Qwen2.5"]
featured: true
draft: false
---

I wanted to run a usefully-smart LLM on a phone with about 1.5 GB of free RAM, CPU only. "Usefully smart" meant Qwen2.5 3B at Q4_K_M, because the 0.5B sibling gets simple reasoning and arithmetic wrong often enough to be a frustrating demo. This post is the CPU-side half of that work: what each llama.cpp knob: repack, KV cache, mmap actually does to peak RSS and tokens per second on Qwen2.5 3B Q4_K_M, measured on a Colab machine (2 vCPUs, CPU only), context 2048 tokens unless stated, 256-token prompt, 32 generated tokens. The next post covers evicting weights on purpose, which is what it takes to go below the floor this one lands on.

## Picking the model and the quant

Within a model family, larger generally means better answers at the cost of storage and compute. For simple reasoning Qwen2.5 3B is the smallest Qwen that holds up; Qwen2.5 0.5B does not.

Quantization is the first lever for shrinking a model with little quality cost. A model trained in FP16 stores each weight as 16 bits; dropping to 8-bit or 4-bit storage cuts size proportionally. Modern methods go further than uniform quantization by assigning more bits to weights the model is more sensitive to. I picked Q4_K_M, a mixed-precision format that sits near the sweet spot of size and quality. Qwen2.5 3B in FP16 is about 6.2 GB; the Q4_K_M build is 2007 MiB, roughly a third of the original. That is the file used in every experiment below.

## Reading the load log

llama.cpp uses the GGUF format, which packs tokenizer, model weights, and metadata into one file. When the model loads, it prints how much memory it allocates for weights and runtime buffers:

```
load_tensors:   CPU_Mapped model buffer size =   2001.74 MiB
load_tensors:   CPU_REPACK model buffer size =   1265.62 MiB
llama_kv_cache:        CPU KV buffer size =    72.00 MiB
llama_context:        CPU  output buffer size =     0.58 MiB
```

These four lines tell us quite a bit about where the memory is going.

- **CPU_Mapped (2001.74 MiB)** is the model weights themselves, memory-mapped from the GGUF file.
- **CPU_REPACK (1265.62 MiB)** is a second copy of the subset of weights that have fast SIMD kernels available. The repacked copy is reshaped so those kernels can read them efficiently.
- **CPU KV buffer (72 MiB)** holds the keys and values attention caches as it generates. It grows with context length.
- **Output buffer (0.58 MiB)** is scratch space for the final logits. Negligible here.

So before any experiments: weights are the overwhelming cost, repack can almost double that cost, and the KV cache is small as long as the context stays short.

## Experiment 1: repack

Repack is a CPU-side optimization that lays weights out for specific SIMD kernels. The cost is a second copy of those weights in anonymous RAM, on top of the file-backed original. Whether that cost buys speed depends on the CPU and the phase (prefill vs decode).

| Repack | Peak RSS (MiB) | File-backed (MiB) | Anonymous (MiB) | Load time (s) | Decode (tok/s) | Prefill (tok/s) |
|---|---|---|---|---|---|---|
| On | 3475 | 2028 | 1451 | 4.3 | 2.3 | 6.0 |
| Off | 2209 | 2023 | 185 | 0.66 | 2.17 | 6.7 |

Turning repack off cut peak RSS by 1266 MiB, matching the `CPU_REPACK` line almost exactly. Load time dropped from 4.3 s to 0.66 s because nothing has to be rearranged. Decode and prefill moved by under 5%, which on single runs is noise-dominated. Where repack does help is mostly prompt processing on CPUs with the matching SIMD support: bartowski's [benchmark](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF) of Qwen2 3B on an AVX2 EPYC server shows the pre-repacked Q4_0_8_8 format 24 to 33% faster than plain Q4_0 at prompt processing but only about 11% faster at generation. That's Q4_0, not Q4_K_M, and a different CPU, but it fits what I saw: at best a small decode gain on CPU, not worth 1.3 GB of extra RAM for this budget.

**Takeaway.** `--no-repack` for a phone budget, always.

## Experiment 2: KV cache length and quantization

The KV cache grows linearly with context length. The load log reports 72 MiB at context 2048 tokens. If weights dominate, this knob does not matter much; if you push to long contexts or try to fit onto a tighter budget, it starts to.

| Context | KV cache type | Flash attention | Peak RSS (MiB) | Anonymous (MiB) | Decode (tok/s) | Prefill (tok/s) |
|---|---|---|---|---|---|---|
| 2048 | f16 | Off | 2209 | 185 | 2.17 | 6.7 |
| 4096 | f16 | Off | 2282 | 259 | 2.22 | 6.6 |
| 4096 | q8_0 | On | 2213 | 189 | 2.21 | 6.0 |

Doubling the context added 74 MiB of anonymous RAM, which is what the log numbers predict. Quantizing the KV cache to 8-bit halves that cost. llama.cpp exposes the K and V types separately: `type_k` and `type_v` in the Python API (`-ctk` / `-ctv` on the CLI), both defaulting to `f16`. A quantized V cache additionally requires flash attention, a kernel that computes attention in small tiles without materializing the full score matrix; without flash attention it refuses to run. Quantizing K alone would work on its own, but here I set `type_k=q8_0`, `type_v=q8_0`, and `flash_attn=True` together. That brought 4096-context memory back in line with the 2048-token baseline at no decode cost.

**Takeaway.** At 2048 tokens the KV cache is not where the RAM is going; stop worrying about it and move on to the weights. At 4096+ it becomes worth quantizing.

## Experiment 3: mmap vs ordinary loading vs direct I/O

By default, llama.cpp loads weights via `mmap`, the Linux system call that maps the file into the process's address space without reading it into RAM up front. Pages are brought in by the kernel when the model first touches them, and the OS is allowed to drop them under memory pressure. The alternative is reading the whole file into anonymous memory, which the OS cannot evict.

mmap isn't trying to use less RAM than the model needs; it's letting the OS decide what stays resident. The process holds page-table entries for the whole file, pages are brought in when first touched, and the kernel can drop them under memory pressure and reload them from disk if touched again. On a machine with enough RAM and no pressure, the whole file ends up resident anyway and nothing is evicted, which is what the numbers below show.

| Load mode | Load time (s) | Peak RSS (MiB) | File-backed (MiB) | Anonymous (MiB) | Decode (tok/s) |
|---|---|---|---|---|---|
| mmap | 0.66 | 2209 | 2023 | 185 | 2.17 |
| No mmap | 2.3 | 2209 | 22 | 2187 | 2.35 |
| Direct I/O | 9.0 | 2216 | 22 | 2193 | 2.14 |

Peak RSS is identical across the three; about 2.2 GiB. What differs is composition and load time. With mmap, 2023 MiB of that total is file-backed, which the kernel *can* drop under pressure; only 185 MiB is pinned anonymous memory. Without mmap, nearly all 2.2 GiB is anonymous and un-evictable. Direct I/O, which bypasses the page cache, pays a 9-second load tax for no runtime benefit.

Decode speed sat at 2.14 to 2.35 tok/s across all three, within noise. This is the honest result: on this machine mmap did not lower peak RSS, because nothing forced the kernel to drop pages. What mmap *did* buy was a 7× faster load and the right for the kernel to evict weights if something else needs RAM.

**Takeaway.** mmap is the right default on any device. On an under-pressure phone it is the only option that lets the OS reclaim weight pages instead of killing your process.

## The floor without streaming

With the three settings tuned for memory: repack off, mmap on, KV cache at the default f16 and context 2048, peak RSS lands at about **2.2 GiB** for Qwen2.5 3B Q4_K_M. Weights account for essentially all of that: the 2 GB GGUF file, with a few hundred MiB of anonymous memory for the KV cache, output buffer, and runtime scratch. Repack, which doubled anonymous memory for no decode speed on this CPU, is off. mmap costs nothing at load time and makes most of the resident bytes file-backed, which is the shape the OS can reclaim under pressure. The KV cache at context 2048 is trivially small against 2 GB of weights. Going below 2.2 GiB means refusing to keep all weights resident at once, which is the layer streaming experiment in the next post.

## A note on phones: thermal throttling

On a real octa-core phone with around 1.5 GB of free RAM, the first run shipped the model under budget but still ran slow. The CPU clock dropped from 2.2 GHz to 1.4 GHz within a minute. That was heat, not RAM pressure. The same thermal throttling you feel when a phone chugs through a long high-graphics game session. It is the quiet third constraint behind CPU-only inference: even if the RAM fits and the kernel is efficient, sustained load pulls the clock down and tokens per second with it.

