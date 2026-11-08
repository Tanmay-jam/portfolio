/** Decorative drifting colour blobs behind the page content. */
export default function Ambient() {
  const blobs = [
    { w: 560, left: "38%", top: 520, bg: "var(--lav)", delay: -12 },
    { w: 560, right: -180, top: 1900, bg: "var(--lav)", delay: -3 },
    { w: 620, left: -200, top: 3100, bg: "var(--accent)", delay: -9 },
    { w: 720, right: "5%", bottom: -260, bg: "var(--lime)", delay: -15 },
  ] as const;
  return (
    <div className="bg" aria-hidden="true">
      <div className="dots" />
      {blobs.map((b, i) => (
        <div
          key={i}
          className="blob"
          style={{ width: b.w, height: b.w, left: "left" in b ? b.left : undefined, right: "right" in b ? b.right : undefined, top: "top" in b ? b.top : undefined, bottom: "bottom" in b ? b.bottom : undefined, background: b.bg, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}
