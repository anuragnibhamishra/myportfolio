import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCover from "./ProjectCover";
import TechBadge from "./TechBadge";

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
                    <IconBrandGithub size={16} strokeWidth={1.5} aria-hidden="true" />
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    className="inline-flex items-center gap-1 text-sm text-fg-2 transition-colors hover:text-accent"
                  >
                    Live Demo
                    <IconArrowUpRight size={16} />
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
