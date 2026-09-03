import Reveal from "./Reveal";

export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-fg/10">
      {items.map((item, index) => (
        <Reveal key={item.org} delay={index * 0.08} className="relative mb-12 ml-8 last:mb-0">
          <span className="absolute -left-[37px] top-1.5 h-2 w-2 rounded-full bg-accent" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-fg-muted">{item.period}</p>
          <h3 className="mt-2 text-xl font-medium text-fg">
            {item.org} — {item.role}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-2">{item.note}</p>
        </Reveal>
      ))}
    </ol>
  );
}
