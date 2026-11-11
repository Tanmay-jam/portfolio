import Logo from "./Logo";
import { stack } from "@/data/stack";

export default function TechStack() {
  return (
    <section id="stack" className="sec">
      <div className="row2">
        <div className="left rv">
          <div className="eyebrow"><b>Stack</b></div>
          <h2 className="shead">My<br />Stack</h2>
        </div>
        <div className="right groups rv">
          {stack.map((g) => (
            <div key={g.group} className="group">
              <span className="eyebrow">{g.group}</span>
              <div className="chips">
                {g.items.map((it) => (
                  <span key={it.name} className="chip">
                    {it.logo ? <Logo src={it.logo} dark={it.logoDark} /> : <i>{it.badge}</i>}
                    {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
