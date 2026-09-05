import { Link } from "react-router-dom";
import { navItems, site } from "../data/site";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 border-y border-fg/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <p className="text-2xl font-medium tracking-tight">{site.name}</p>
          <p className="mt-2 text-base text-fg-2">{site.role}</p>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-fg-muted">
            Building modern web applications, thoughtful interfaces, and products that
            solve real problems.
          </p>
        </div>
        <nav className="flex flex-col gap-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            Navigation
          </p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="link-underline w-fit text-sm text-fg-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 text-base">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            Elsewhere
          </p>
          <a href={site.github} className="inline-flex w-fit items-center gap-3 text-fg-2 transition-colors hover:text-accent" target="_blank" rel="noreferrer">
            <IconBrandGithub size={24} strokeWidth={1.5} />
            <span>GitHub</span>
          </a>
          <a href={site.instagram} className="inline-flex w-fit items-center gap-3 text-fg-2 transition-colors hover:text-accent" target="_blank" rel="noreferrer">
            <IconBrandInstagram size={24} strokeWidth={1.5} />
            <span>Instagram</span>
          </a>
          <a href={site.linkedin} className="inline-flex w-fit items-center gap-3 text-fg-2 transition-colors hover:text-accent" target="_blank" rel="noreferrer">
            <IconBrandLinkedin size={24} strokeWidth={1.5} />
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex w-fit items-center gap-3 text-fg-2 transition-colors hover:text-accent">
            <IconMail size={24} strokeWidth={1.5} />
            <span>Email</span>
          </a>
        </div>
      </div>
      <div className="mx-auto flex  flex-col gap-6 border-t border-fg/8 px-5 py-8 text-[11px] uppercase tracking-[0.2em] text-fg-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>Designed &amp; built with curiosity.</p>
        
        <p>© {year} {site.name}</p>
      </div>
    </footer>
  );
}
