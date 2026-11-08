import SectionHead from "./SectionHead";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="sec">
      <SectionHead label="Projects" title="Things I've built" />
      <div className="pgrid">
        {projects.map((p) => (
          <div key={p.title} className={`pc rv${p.wide ? " wide" : ""}`} style={{ "--h": `var(--${p.hue === "accent" ? "acct" : p.hue})` } as React.CSSProperties}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.tags && <div className="tags">{p.tags}</div>}
            {p.links && (
              <div className="lk">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{l.label}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
