import type { BrandKey } from "@/lib/brand-icons";

export type Job = {
  id: string; // anchor target for the "Previously at" links
  company: string;
  role: string;
  period: string;
  place: string;
  short: string; // "Previously at" row subtitle
  logo?: BrandKey; // simple-icons brand (Volkswagen)
  img?: string; // file in public/logos, original colours
  mono?: string; // letter badge when there is no logo
  points: string[];
};

// Newest first.
export const experience: Job[] = [
  {
    id: "xp-wbd",
    company: "Warner Bros. Discovery",
    role: "ML Engineer Intern",
    period: "Oct 2025 – Jul 2026",
    place: "Bangalore",
    short: "ML Engineer Intern · 2025–26",
    img: "wbd.png",
    points: [
      "Built burnt-in subtitle removal for ASR caption evaluation: PaddleOCR, Gemini classification and tiered fuzzy matching. About 23% lower average WER on heavily subtitled videos (21-video test set).",
      "Evaluated caption positioning with macro precision/recall, orchestrated with Airflow.",
      "Classified on-screen text in videos using Gemini.",
      "Implemented GitHub Actions workflow to build and publish a versioned Python package to GCP Artifact Registry.",
      "Built Looker dashboards with BigQuery.",
    ],
  },
  {
    id: "xp-vw",
    company: "Volkswagen",
    role: "Software Engineer",
    period: "Aug 2022 – Jun 2024",
    place: "Pune",
    short: "Software Engineer",
    logo: "volkswagen",
    points: [
      "Delivered a predictive maintenance PoC on in-house sensor data: remaining useful life regression and Autoencoder based degradation onset detection, with the threshold set at the 95th percentile of healthy reconstruction error.",
      "Handled SAP BASIS operations alongside.",
    ],
  },
  {
    id: "xp-intangles",
    company: "Intangles Labs",
    role: "ML Project Intern",
    period: "Oct 2021 – Apr 2022",
    place: "Pune",
    short: "ML Project Intern",
    mono: "IL",
    points: [
      "Worked on a Driver Monitoring System with on-edge face detection using YOLOv4-tiny fine-tuned for a custom face class using Darknet.",
      "Extended it to embedding-based driver identification using FaceNet with similarity search, achieving ≈93% accuracy on a balanced class distribution.",
    ],
  },
];
