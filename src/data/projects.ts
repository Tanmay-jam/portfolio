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
    title: "Graph-RAG Document Q&A",
    description:
      "FAISS retrieval with COMET query expansion and a cross-encoder reranker.",
    tags: "RAG · FAISS · Reranking",
    hue: "lav",
  },
];
