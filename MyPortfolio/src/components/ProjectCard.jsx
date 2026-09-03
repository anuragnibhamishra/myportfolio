import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectCover from "./ProjectCover";
import TechBadge from "./TechBadge";

export default function ProjectCard({ project, layout = "default" }) {
  const isWide = layout === "wide";

  return (
    <motion.article
      whileHover="hover"
      className={`group relative overflow-hidden border border-fg/10 bg-surface-2 ${
        isWide ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <Link
        to="/projects"
        className={`relative block overflow-hidden ${isWide ? "min-h-[320px]" : "min-h-[260px]"}`}
        aria-label={`View ${project.title}`}
      >
        <motion.div
          className="h-full"
          variants={{ hover: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCover cover={project.cover} title={project.title} />
        </motion.div>
      </Link>

      <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
        <div>
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-fg-muted">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-fg md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <TechBadge key={item} label={item} />
            ))}
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm text-fg transition-colors hover:text-accent"
          >
            View Project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
