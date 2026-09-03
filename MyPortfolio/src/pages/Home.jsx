import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import IdentityPanel from "../components/IdentityPanel";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Seo from "../components/Seo";
import TechBadge from "../components/TechBadge";
import { featuredProjects } from "../data/projects";
import { currentlyBuilding, site, techStack, activity } from "../data/site";
import LiveActivity from "../components/LiveActivity";

const headline = ["Building digital experiences", "that feel alive."];

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="Anurag Mishra — Full Stack Developer building digital experiences that feel alive."
      />
      <main id="main">
        <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center lg:gap-16">
          <section className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-fg-muted">
              <span>Full Stack Developer</span>
              <span className="hidden h-px min-w-4 max-w-6 flex-1 bg-fg/20 sm:block" />
              <span className="inline-flex items-center gap-2 tracking-[0.2em] text-accent">
                <LiveActivity activity={activity} />
              </span>
            </div>
            <h1 className="max-w-5xl text-[12vw] font-medium leading-[0.92] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-8xl">
              {headline.map((line, i) => (
                <motion.span
                  key={line}
                  className="block overflow-hidden"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="mt-8 max-w-xl text-base leading-relaxed text-fg-2 md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
            >
              I’m a developer focused on building modern web applications, thoughtful
              interfaces, and products that solve real problems.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
            >
              <Button to="/projects">View Projects</Button>
              <Button to="/about" variant="secondary">
                About Me
              </Button>
            </motion.div>
            <motion.div
              className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-fg-muted"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.5 }}
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <ArrowDown size={17} className="text-accent" />
              </motion.span>
              <span>Scroll</span>
            </motion.div>
          </section>
          <section className="min-w-0 lg:justify-self-end">
            <IdentityPanel />
          </section>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
          <SectionHeading
            eyebrow="Archive"
            title="Selected Work"
            action={
              <Link
                to="/projects"
                className="inline-flex items-center gap-1 text-sm text-fg-2 transition-colors hover:text-accent"
              >
                View All Projects
                <ArrowUpRight size={16} />
              </Link>
            }
          />
          <div className="flex flex-col gap-6">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.06}>
                <div
                  className={
                    project.featuredLayout === "offset-left"
                      ? "md:mr-[12%]"
                      : project.featuredLayout === "offset-right"
                        ? "md:ml-[12%]"
                        : ""
                  }
                >
                  <ProjectCard project={project} layout={project.featuredLayout} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
          <SectionHeading eyebrow="Now" title="Currently Building" />
          <Reveal>
            <article className="overflow-hidden rounded-lg border border-fg/10 bg-surface-2 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
                    {currentlyBuilding.status}
                  </p>
                  <h3 className="mt-3 max-w-2xl text-xl font-medium tracking-tight md:text-3xl">
                    {currentlyBuilding.title}
                  </h3>
                </div>
                <span className="font-mono text-sm text-fg-muted">
                  {currentlyBuilding.progress}%
                </span>
              </div>
              <div className="mt-8 h-0.5 overflow-hidden bg-fg/10">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${currentlyBuilding.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {currentlyBuilding.technologies.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </article>
          </Reveal>
        </section>

        <section className="relative overflow-hidden pb-8">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHeading eyebrow="Toolkit" title="Tech Stack" />
          </div>
          <div className="border-y border-fg/8 bg-surface-2/40 py-6">
            <div className="marquee-track flex w-max gap-3 px-4">
              {[...techStack, ...techStack].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-md border border-fg/10 bg-surface px-5 py-3 text-sm text-fg-2 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Reveal className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
          <a
            href={`mailto:${site.email}`}
            className="group block overflow-hidden rounded-lg border border-fg/10 bg-surface-2 px-6 py-16 text-center md:px-12 md:py-24"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-fg-muted">
              Open to work &amp; collaboration
            </p>
            <p className="mt-4 text-4xl font-medium tracking-tight md:text-7xl">
              Have a project in mind?
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-2 md:text-lg">
              Whether it&apos;s a product, an opportunity or an experiment, I&apos;d like to
              hear about it.
            </p>
            <span className="mt-10 inline-flex items-center gap-2 rounded-md bg-accent hover:bg-[#C5FF99] px-6 py-4 text-[16px] font-medium text-surface transition-colors">
              Let&apos;s talk
              <ArrowUpRight size={18} />
            </span>
          </a>
        </Reveal>
      </main>
    </>
  );
}
