const covers = {
  semicolon: {
    kicker: "01 / SOCIAL",
    lines: ["feed.filter(dev)", "thread.open()", "ship quietly"],
  },
  binix: {
    kicker: "02 / CIVIC",
    lines: ["route.optimize()", "city.collect()", "waste → signal"],
  },
  continuum: {
    kicker: "03 / RITUAL",
    lines: ["habit.streak += 1", "goal.horizon", "today → later"],
  },
  lumen: {
    kicker: "04 / STUDY",
    lines: ["grid.breathe()", "type.measure", "motion.hold"],
  },
  aether: {
    kicker: "05 / AI",
    lines: ["note → brief", "retrieve.context", "human.inLoop"],
  },
  trace: {
    kicker: "06 / OPS",
    lines: ["decision.log()", "why.shipped", "defer || do"],
  },
};

export default function ProjectCover({ cover = "semicolon", title }) {
  const data = covers[cover] || covers.semicolon;

  return (
    <div className="relative h-full min-h-[240px] overflow-hidden bg-surface-2">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(214,255,183,0.08),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(214,255,183,0.12),transparent_36%)]" />
      <div className="absolute inset-6 border border-fg/10" />
      <div className="absolute left-8 top-8 text-[10px] uppercase tracking-[0.28em] text-accent">
        {data.kicker}
      </div>
      <div className="absolute bottom-8 left-8 right-8">
        <p className="mb-4 font-mono text-[11px] leading-6 text-fg-muted">
          {data.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="text-2xl font-medium tracking-tight text-fg md:text-3xl">{title}</p>
      </div>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-accent/20" />
      <div className="absolute bottom-10 right-10 h-2 w-2 bg-accent" />
    </div>
  );
}
