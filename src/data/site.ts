// Everything personal lives in src/data so the components stay generic.

export const site = {
  name: "Tanmay Pawar",
  role: "ML Engineer",
  location: "Bengaluru",
  email: "tanmaymsp@gmail.com",
  github: "https://github.com/Tanmay-jam",
  linkedin: "https://www.linkedin.com/in/tanmay-pawar0",
  // Drop your PDF at public/Tanmay_pawar_resume.pdf
  resume: "/Tanmay_pawar_resume.pdf",
  tagline:
    "I build GenAI, RAG and MLOps systems, from an LLM running inside a phone's memory budget to pipelines that retrain themselves.",
  description:
    "Tanmay Pawar is an ML engineer building GenAI, RAG and MLOps systems. Portfolio, experience, projects and writing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const about = [
  "I'm an ML engineer who likes taking a model from a notebook to something that actually runs. Most of my recent work is GenAI: RAG systems, LLM-based evaluation, and fine-tuning with LoRA and quantization.",
  "I hold an M.Tech in AI from IIT Patna (2026), where my research was on grounding empathetic dialogue with RAG. Before that I worked on predictive maintenance at Volkswagen and computer vision at Intangles Labs.",
  "At Warner Bros. Discovery I worked on how video captions get evaluated, using OCR and Gemini. Outside work I build on-device LLM experiments for Android and write up what I learn here.",
];
