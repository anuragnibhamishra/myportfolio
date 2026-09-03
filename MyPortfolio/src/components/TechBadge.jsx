export default function TechBadge({ label, interactive = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-fg/10 bg-surface-2 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-fg-muted ${
        interactive
          ? "transition-colors duration-300 hover:border-accent/50 hover:text-accent"
          : ""
      }`}
    >
      {label}
    </span>
  );
}
