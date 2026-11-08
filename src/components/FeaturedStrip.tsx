import Link from "next/link";
import Brand from "./Brand";
import { experience } from "@/data/experience";
import { getFeaturedPosts } from "@/lib/blog";

// Tile palette cycles through these. With several featured posts the tiles stack as you scroll.
const palette = [
  { tb: "#10111a", tf: "#f5f5f7", ta: "#d4f25a" },
  { tb: "var(--accent)", tf: "#ffffff", ta: "#d4f25a" },
  { tb: "#d4f25a", tf: "#0b0b0f", ta: "#0b0b0f" },
];

export default function FeaturedStrip() {
  const posts = getFeaturedPosts();
  return (
    <div className="wrap">
      <div className="strip">
        {posts.length > 0 && (
          <div className="stack">
            {posts.map((p, i) => {
              const c = palette[i % palette.length];
              const a = 40 + i * 17;
              return (
                <div
                  key={p.slug}
                  className="sc"
                  style={{ "--i": i, "--tb": c.tb, "--tf": c.tf, "--ta": c.ta, "--a": `${a}%`, "--b": `${a + 17}%` } as React.CSSProperties}
                >
                  <Link href={`/blog/${p.slug}`} className="sc-in">
                    {posts.length > 1 && <span className="num">{String(i + 1).padStart(2, "0")}</span>}
                    {p.topic && <span className="eyebrow">{p.topic}</span>}
                    <span className="ttl">{p.title}</span>
                    <span className="dsc">{p.summary}</span>
                    <span className="rd">Read the post →</span>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <div className="prev in d4">
          <span className="eyebrow">Previously at</span>
          <div className="prev-list">
            {experience.map((j) => (
              <a key={j.id} className="co" href={`#${j.id}`}>
                <span className="lg">{j.logo ? <Brand name={j.logo} /> : <i>{j.mono}</i>}</span>
                <span>
                  <b>{j.company}</b>
                  <em>{j.short}</em>
                </span>
                <span className="ar">↓</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
