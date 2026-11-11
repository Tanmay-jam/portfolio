/**
 * Brand logo from /public/logos, shown in its original colours.
 * Pass `dark` for a logo that needs a different file on the dark theme (the swap is CSS-only).
 */
export default function Logo({ src, dark }: { src: string; dark?: string }) {
  /* eslint-disable @next/next/no-img-element */
  if (!dark) return <img src={`/logos/${src}`} alt="" width={24} height={24} loading="lazy" decoding="async" />;
  return (
    <>
      <img className="lg-l" src={`/logos/${src}`} alt="" width={24} height={24} loading="lazy" decoding="async" />
      <img className="lg-d" src={`/logos/${dark}`} alt="" width={24} height={24} loading="lazy" decoding="async" />
    </>
  );
}
