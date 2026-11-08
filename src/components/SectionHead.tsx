export default function SectionHead({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="rv sec-head">
      <div className="eyebrow"><b>{label}</b></div>
      <h2 className="shead">{title}</h2>
    </div>
  );
}
