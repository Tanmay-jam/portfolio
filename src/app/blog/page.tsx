import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Short write-ups on the things I build: GenAI, RAG, MLOps and on-device LLMs.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="wrap">
      <section className="blog-page">
        <div className="eyebrow in d1"><b>Blog</b></div>
        <h1 className="disp grad in d2">Writing</h1>
        <p className="sub in d3">Short write-ups on what I build and what I learn along the way.</p>
        <div className="plist in d4">
          {posts.length === 0 && <p className="empty">No posts yet.</p>}
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="prow">
              <span className="dt">{formatDate(p.date)}</span>
              <span className="bd">
                <h2>{p.title}</h2>
                {p.summary && <p>{p.summary}</p>}
                {p.tags.length > 0 && <span className="tg">{p.tags.map((t) => <span key={t}>#{t}</span>)}</span>}
              </span>
              <span className="ar">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
