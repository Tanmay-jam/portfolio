import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/data/site";

const links = [
  { href: "/blog", label: "Blog", always: true },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#education", label: "Education" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <div className="nav-wrap wrap">
      <header className="nav">
        <Link href="/" className="brand disp">tanmay.</Link>
        <nav aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`navl${l.always ? "" : " hide-sm"}`}>{l.label}</Link>
          ))}
          <ThemeToggle />
          <a className="resume-btn" href={site.resume} download>Résumé ↓</a>
        </nav>
      </header>
    </div>
  );
}
