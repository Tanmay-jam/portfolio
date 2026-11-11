export type Project = {
  title: string;
  description: string;
  tags?: string;
  hue: "accent" | "lime" | "lav";
  wide?: boolean;
  // Optional links. Only add what is public.
  links?: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    title: "Golden Response Generation for Empathetic Dialogue",
    description:
      "A RAG pipeline grounded in psychology literature, with COMET query expansion and reranking, plus a generator fine-tuned on synthetic data.",
    hue: "accent",
    wide: true,
  },
  {
    title: "GPT-2 Playground",
    description:
      "A GPT built from scratch with a live demo that includes experiments for token generation, constrained decoding and speculative decoding.",
    tags: "PyTorch · Streamlit",
    hue: "lav",
    links: [
      {
        label: "Live demo ↗",
        href: "https://taanmaay-gpt-2-playground.hf.space/",
        external: true,
      },
    ],
  },
  {
    title: "Mist",
    description:
      "Android focus app: blocked apps unlock by doing tasks, judged by a local agentic LLM that runs on-device with llama.cpp layer streaming.",
    tags: "Kotlin · llama.cpp · Agents",
    hue: "accent",
  },
  {
    title: "Burnt-in Subtitle Remover",
    description:
      "Burnt-in subtitle removal for ASR caption evaluation: PaddleOCR, Gemini classification and tiered fuzzy matching, cutting average WER by about 23% on heavily subtitled videos.",
    tags: "Warner Bros · Internal",
    hue: "lime",
  },
  {
    title: "Driver Identification System",
    description:
      "On-edge face detection with YOLOv4-tiny fine-tuned for a custom face class using Darknet, extended to driver identification with FaceNet embeddings and similarity search at about 93% accuracy on a balanced class distribution.",
    tags: "Intangles Labs · Internal",
    hue: "lav",
  },
];
