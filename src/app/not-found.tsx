import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap">
      <section className="blog-page">
        <div className="eyebrow"><b>404</b></div>
        <h1 className="disp grad">Not found</h1>
        <p className="sub">That page doesn&apos;t exist. <Link href="/" style={{ color: "var(--acct)" }}>Back home →</Link></p>
      </section>
    </main>
  );
}
