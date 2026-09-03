import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCover from "./ProjectCover";
import TechBadge from "./TechBadge";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.97 3.22 9.18 7.7 10.66.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 1.72 2.72 1.22.08-.76.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.1-2.98 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.6 1.55.22 2.7.1 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.55.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54 4.47-1.48 7.69-5.69 7.69-10.66C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid gap-4 md:grid-cols-6">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => {
          const span =
            index % 5 === 0
              ? "md:col-span-4"
              : index % 5 === 1
                ? "md:col-span-2"
                : index % 5 === 2
                  ? "md:col-span-3"
                  : index % 5 === 3
                    ? "md:col-span-3"
                    : "md:col-span-6";

          return (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className={`group overflow-hidden border border-fg/10 bg-surface-2 ${span}`}
            >
              <div className="overflow-hidden">
                <div className="origin-center transition-transform duration-700 group-hover:scale-[1.04]">
                  <ProjectCover cover={project.cover} title={project.title} />
                </div>
              </div>
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                      {project.category} · {project.year}
                    </p>
                    <h2 className="text-2xl font-medium tracking-tight">{project.title}</h2>
                  </div>
                  <span className="hidden text-xs text-fg-muted md:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-fg-2">
                  {project.longDescription || project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 text-sm text-fg-2 transition-colors hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    className="inline-flex items-center gap-1 text-sm text-fg-2 transition-colors hover:text-accent"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
