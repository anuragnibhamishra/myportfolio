import { useState } from "react";
import { site } from "../data/site";
import Button from "./Button";

const field =
  "w-full rounded-md border border-fg/12 bg-surface-2 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-muted/50 focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Portfolio inquiry"
    )}&body=${body}`;
    setStatus("sent");
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          Name
        </span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          Email
        </span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          Message
        </span>
        <textarea name="message" required rows={6} className={`${field} resize-none`} />
      </label>
      <div className="flex items-center gap-4 pt-2">
        <Button type="submit">Send Message</Button>
        {status === "sent" ? (
          <p className="text-sm text-accent">Opening your email client…</p>
        ) : null}
      </div>
    </form>
  );
}
