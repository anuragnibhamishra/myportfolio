import { IconArrowUpRight } from "@tabler/icons-react";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { site } from "../data/site";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "GitHub", value: "github.com", href: site.github },
  { label: "Instagram", value: "instagram.com", href: site.instagram },
  { label: "LinkedIn", value: "linkedin.com", href: site.linkedin },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Have an idea, opportunity, or just want to say hello? Get in touch with Anurag Mishra."
      />
      <main id="main" className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-fg-muted">Contact</p>
        <h1 className="max-w-4xl text-5xl font-medium tracking-tight md:text-7xl">
          Let's build something.
        </h1>
        <p className="mt-5 max-w-xl text-base text-fg-2 md:text-lg">
          Have an idea, opportunity, or just want to say hello?
        </p>

        <section className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ul className="space-y-8">
              {channels.map((item) => (
                <li key={item.label}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-2 inline-flex items-center gap-1 text-xl text-fg transition-colors hover:text-accent md:text-2xl"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {item.value}
                    <IconArrowUpRight size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </section>

      </main>
    </>
  );
}
