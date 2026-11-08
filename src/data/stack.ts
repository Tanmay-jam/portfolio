import type { BrandKey } from "@/lib/brand-icons";

export type StackItem = { name: string; icon?: BrandKey; badge?: string };

// `icon` shows the brand logo; items without one get a small letter badge.
export const stack: { group: string; items: StackItem[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "C++", icon: "cplusplus" },
      { name: "SQL", badge: "SQL" },
      { name: "LookML", icon: "looker" },
    ],
  },
  {
    group: "ML & AI",
    items: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "llama.cpp", badge: "ll" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", badge: "LG" },
      { name: "Google ADK", badge: "AD" },
    ],
  },
  {
    group: "Data, Cloud & DevOps",
    items: [
      { name: "Airflow", icon: "apacheairflow" },
      { name: "Docker", icon: "docker" },
      { name: "GCP", icon: "googlecloud" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "BigQuery", icon: "googlebigquery" },
      { name: "Pydantic", icon: "pydantic" },
      { name: "FAISS", badge: "FA" },
    ],
  },
];
