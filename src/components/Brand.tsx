import { brandIcons, type BrandKey } from "@/lib/brand-icons";

/** Inline brand logo. Pass `mono` to inherit currentColor instead of the brand colour. */
export default function Brand({ name, mono = false }: { name: BrandKey; mono?: boolean }) {
  const i = brandIcons[name];
  // Very dark brand colours (e.g. LangChain) get lightened on the dark theme via the .adapt class.
  const [r, g, b] = [0, 2, 4].map((k) => parseInt(i.hex.slice(k, k + 2), 16));
  const dark = !mono && 0.2126 * r + 0.7152 * g + 0.0722 * b < 70;
  return (
    <svg viewBox="0 0 24 24" fill={mono ? "currentColor" : `#${i.hex}`} className={dark ? "adapt" : undefined} aria-hidden="true">
      <path d={i.path} />
    </svg>
  );
}
