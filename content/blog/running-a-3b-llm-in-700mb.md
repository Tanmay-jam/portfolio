---
title: "Running a 3B LLM in ~700 MB of phone RAM"
date: "2026-11-07"
summary: "Layer streaming with llama.cpp keeps peak RSS around 600–700 MB for a model that doesn't fit in that budget whole. What I measured and what I rejected."
topic: "On-device LLM"
tags: ["llama.cpp", "On-device", "Quantization", "Android"]
featured: true
draft: false
---

> **Placeholder post.** The structure below is an outline. Replace every `[...]` with your own numbers and write-up, then delete this note. Posts are plain markdown files in `content/blog/`.

## The constraint

[Why a 3B-class model, and why the phone's RAM budget is the hard limit. Which device(s) you measured on.]

## Layer streaming with llama.cpp

[How layers are loaded and released during the forward pass, and how the next layers are prefetched to hide latency.]

## What I measured

Peak RSS stayed around **600–700 MB**.

| Setup | Peak RSS | Tokens/s |
| --- | --- | --- |
| [baseline: whole model resident] | [..] | [..] |
| [layer streaming] | ~600–700 MB | [..] |

## What I rejected

[Options you tried and dropped, with the reason: for example weight repacking, other quantization choices.]

## Where it ends up

This work runs inside Mist, my Android focus app, where a local agentic LLM judges whether a task was done.

## Takeaways

[Two or three lines you would tell someone starting the same project.]
