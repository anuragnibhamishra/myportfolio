import portrait from "../assets/Images/PortfolioImageMain.png";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import TechBadge from "../components/TechBadge";
import Timeline from "../components/Timeline";
import { approach, experience, skills } from "../data/site";

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="A little about Anurag Mishra — full stack developer focused on modern web products and thoughtful interfaces."
      />
      <main id="main" className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-fg-muted">About</p>
        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">A little about me.</h1>

        <section className="mt-16 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden border border-fg/10 bg-surface-2">
              <img
                src={portrait}
                alt="Portrait of Anurag Mishra"
                className="aspect-[4/5] w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="lg:max-w-lg space-y-6 text-base leading-relaxed text-fg-2 md:text-lg">
              <p>
                I’m Anurag, a software developer who enjoys turning ideas into functional, polished digital experiences. I like taking something that starts as a simple idea and shaping it into a product that feels thoughtful, intuitive, and genuinely useful.
              </p>
              <p>
                I work across both the frontend and backend, with a particular interest in modern web development, interactive interfaces, and building products from scratch. I enjoy working on the entire process — from figuring out how something should work, to designing the experience, writing the code, connecting the systems, and refining the small details that make a product feel complete.
              </p>
              <p>
                For me, development is not just about making something technically functional. I care about how a product looks, how it behaves, how quickly it responds, and how naturally a person can interact with it. I’m especially drawn to clean interfaces, subtle interactions, thoughtful animations, and simple solutions to complex problems.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mt-28">
          <h2 className="mb-10 text-3xl font-medium tracking-tight md:text-5xl">My Approach</h2>
          <div className="grid gap-px overflow-hidden border border-fg/10 bg-fg/10 md:grid-cols-2 lg:grid-cols-3">
            {approach.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="bg-surface p-6 md:p-8">
                <p className="font-mono text-[11px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-2">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-28">
          <h2 className="mb-10 text-3xl font-medium tracking-tight md:text-5xl">Experience</h2>
          <Timeline items={experience} />
        </section>

        <section className="mt-28">
          <h2 className="mb-10 text-3xl font-medium tracking-tight md:text-5xl">Skills</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <Reveal key={group}>
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                  {group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <TechBadge key={item} label={item} interactive />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
