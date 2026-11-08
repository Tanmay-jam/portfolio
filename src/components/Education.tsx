import SectionHead from "./SectionHead";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="sec">
      <SectionHead label="Education" title={<>Academic<br />Background</>} />
      <div className="edu-row rv">
        {education.map((e) => (
          <div key={e.school} className="eu" style={{ "--c": e.primary ? "var(--acct)" : "var(--line)" } as React.CSSProperties}>
            <span className="mono">{e.period}</span>
            <h3>{e.school}</h3>
            <p>{e.degree}</p>
            {e.lines.map((l) => <p key={l}>{l}</p>)}
          </div>
        ))}
      </div>
    </section>
  );
}
