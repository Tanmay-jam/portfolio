import SectionHead from "./SectionHead";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="sec">
      <SectionHead label="Experience" title="Where I've worked" />
      {experience.map((j) => (
        <div key={j.id} id={j.id} className="xp rv">
          <div className="when">{j.period}<br />{j.place}</div>
          <div className="what">
            <h3>{j.company} <span>· {j.role}</span></h3>
            <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      ))}
    </section>
  );
}
