import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="wrap foot">
      <span>© 2026 {site.name}</span>
      <span>Built with Next.js</span>
    </footer>
  );
}
