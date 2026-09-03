import { useMemo, useState } from "react";
import ProjectGrid from "../components/ProjectGrid";
import Seo from "../components/Seo";
import { projectCategories, projects } from "../data/projects";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <Seo
        title="Projects"
        description="Experiments, products, and projects Anurag Mishra has worked on."
      />
      <main id="main" className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-fg-muted">Work</p>
        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">Things I've built.</h1>
        <p className="mt-5 max-w-xl text-base text-fg-2 md:text-lg">
          Experiments, products, and projects I've worked on.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {projectCategories.map((category) => {
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "border-accent bg-accent text-surface"
                    : "border-fg/12 text-fg-2 hover:border-accent hover:text-accent"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <ProjectGrid projects={visible} />
        </div>
      </main>
    </>
  );
}
