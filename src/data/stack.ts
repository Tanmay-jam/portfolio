// `logo` is a file in public/logos (original brand colours). `logoDark` swaps in on the dark theme.
// Items without a logo get a small letter badge.
export type StackItem = { name: string; logo?: string; logoDark?: string; badge?: string };

export const stack: { group: string; items: StackItem[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", logo: "python.png" },
      { name: "C++", logo: "cplusplus.png" },
      { name: "SQL", logo: "postgresql.png" },
      { name: "LookML", logo: "looker.svg" },
    ],
  },
  {
    group: "ML & AI",
    items: [
      { name: "PyTorch", logo: "pytorch.svg" },
      { name: "llama.cpp", logo: "llama-light.svg", logoDark: "llama-dark.svg" },
      { name: "Hugging Face", logo: "huggingface.svg" },
      { name: "LangChain", logo: "langchain.svg" },
      { name: "LangGraph", logo: "langgraph.svg" },
      { name: "Google ADK", logo: "adk.png" },
    ],
  },
  {
    group: "Data, Cloud & DevOps",
    items: [
      { name: "Airflow", logo: "airflow.png" },
      { name: "Docker", logo: "docker.svg" },
      { name: "GCP", logo: "gcp.svg" },
      { name: "GitHub Actions", logo: "githubactions.svg" },
      { name: "BigQuery", logo: "bigquery.svg" },
      { name: "Pydantic", logo: "pydantic.svg" },
      { name: "FAISS", badge: "FA" },
    ],
  },
];
