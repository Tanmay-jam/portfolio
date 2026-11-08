import { about } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="sec">
      <div className="row2">
        <div className="left rv">
          <div className="eyebrow"><b>About</b></div>
          <h2 className="shead">A bit<br />about me</h2>
        </div>
        <div className="right about-text">
          {about.map((p, i) => <p key={i} className="rv">{p}</p>)}
        </div>
      </div>
    </section>
  );
}
