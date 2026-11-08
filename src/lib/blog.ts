import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Posts are markdown files in content/blog. Frontmatter:
//   title, date (YYYY-MM-DD), summary, tags: [..], topic (small label), featured: true|false, draft: true|false
const dir = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  topic: string;
  featured: boolean;
  minutes: number;
  content: string;
};

function parse(file: string): Post | null {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft && process.env.NODE_ENV === "production") return null;
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    topic: String(data.topic ?? ""),
    featured: Boolean(data.featured),
    minutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
