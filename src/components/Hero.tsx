import Link from "next/link";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <div className="hz">
      <div className="hfade" aria-hidden="true">
        <div className="dots" />
        <div className="blob" style={{ width: 520, height: 520, right: -100, top: 40, background: "var(--lime)", opacity: 0.38 }} />
        <div className="blob" style={{ width: 560, height: 560, left: -180, top: 220, background: "var(--lav)", opacity: 0.45, animationDelay: "-8s" }} />
      </div>
      <div className="wrap">
        <section id="top" className="hero">
          <div className="eyebrow in d1">
            <span className="dot" />
            <span>{site.role} · {site.location} · <b>Open to roles</b></span>
          </div>
          <h1 className="disp gradw in d2">Tanmay<br />Pawar</h1>
          <p className="in d3">{site.tagline}</p>
          <div className="btns in d4">
            <a className="btn solid" href="#projects">See my work →</a>
            <Link className="btn ghost" href="/blog">Read the blog</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
