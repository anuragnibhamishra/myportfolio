import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <Reveal>
        <div>
          {eyebrow ? (
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-fg-muted">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="max-w-xl text-3xl font-medium tracking-tight text-fg md:text-5xl">
            {title}
          </h2>
        </div>
      </Reveal>
      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  );
}
