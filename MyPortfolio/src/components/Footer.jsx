import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { navItems, site } from "../data/site";

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.97 3.22 9.18 7.7 10.66.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 1.72 2.72 1.22.08-.76.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.1-2.98 0 0 .95-.3 3.1 1.15a10.7 10.7 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.6 1.55.22 2.7.1 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.55.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54 4.47-1.48 7.69-5.69 7.69-10.66C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.2 3.5A2.2 2.2 0 1 1 .8 3.5a2.2 2.2 0 0 1 4.4 0ZM1 8h4.3v13H1V8Zm6.8 0H12v1.8h.1c.6-1.1 2-2.2 4.2-2.2 4.5 0 5.3 3 5.3 6.9V21h-4.3v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H7.8V8Z" />
    </svg>
  );
}

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
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a href={site.linkedin} className="inline-flex w-fit items-center gap-3 text-fg-2 transition-colors hover:text-accent" target="_blank" rel="noreferrer">
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex w-fit items-center gap-3 text-fg-2 transition-colors hover:text-accent">
            <Mail size={17} strokeWidth={1.5} />
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
