export const projectCategories = [
  "All",
  "Web Apps",
  "Full Stack",
  "UI / Experiments",
  "AI",
];

export const projects = [
  {
    id: "semicolon",
    title: "Semicolon",
    year: "2025",
    category: "Full Stack",
    featured: true,
    featuredLayout: "wide",
    description:
      "A social platform designed specifically for developers — quieter than the feed, sharper than the forum.",
    longDescription:
      "Threads, snippets, and conversations built around how developers actually share work. Profiles, posts, and a calm reading surface instead of noise.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/",
    live: "#",
    cover: "semicolon",
  },
  {
    id: "binix",
    title: "Binix",
    year: "2025",
    category: "Full Stack",
    featured: true,
    featuredLayout: "offset-left",
    description:
      "A smart waste-management platform focused on improving urban waste collection.",
    longDescription:
      "Routing, collection visibility, and civic operations in one system — built to make city-scale logistics feel local and accountable.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/",
    live: "#",
    cover: "binix",
  },
  {
    id: "continuum",
    title: "Continuum",
    year: "2024",
    category: "Web Apps",
    featured: true,
    featuredLayout: "offset-right",
    description:
      "A productivity system for tracking habits, tasks, and long-term goals.",
    longDescription:
      "A local-first ritual for daily work. Habits, tasks, and goals live in one editorial surface without the clutter of a typical productivity app.",
    tech: ["React", "Tailwind CSS", "LocalStorage"],
    github: "https://github.com/",
    live: "#",
    cover: "continuum",
  },
  {
    id: "lumen",
    title: "Lumen",
    year: "2025",
    category: "UI / Experiments",
    featured: false,
    featuredLayout: "default",
    description:
      "An experimental interface study in light, grid, and restrained motion.",
    longDescription:
      "A playground for typography, layout systems, and micro-interactions — less product, more craft.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/",
    live: "#",
    cover: "lumen",
  },
  {
    id: "aether",
    title: "Aether",
    year: "2025",
    category: "AI",
    featured: false,
    featuredLayout: "default",
    description:
      "An assistant surface for summarizing research and turning notes into structured briefs.",
    longDescription:
      "A focused AI workspace that keeps the human in the loop — retrieve, rewrite, and organize without drowning in chat.",
    tech: ["Next.js", "Node.js", "OpenAI"],
    github: "https://github.com/",
    live: "#",
    cover: "aether",
  },
  {
    id: "trace",
    title: "Trace",
    year: "2024",
    category: "Web Apps",
    featured: false,
    featuredLayout: "default",
    description:
      "A lightweight issue and decision log for small product teams.",
    longDescription:
      "Capture why something shipped, what was deferred, and what still needs a call. Built for teams that hate heavy project tools.",
    tech: ["React", "Express", "MongoDB"],
    github: "https://github.com/",
    live: "#",
    cover: "trace",
  },
  {
    id: "freshcart",

    title: "FreshCart",

    year: "2025",

    category: "E-Commerce",

    featured: false,

    featuredLayout: "default",

    description:
      "A modern grocery shopping platform designed for a simple and seamless buying experience.",

    longDescription:
      "A full-stack e-commerce experience for browsing groceries, managing a cart, and placing orders with ease. Built with a focus on clean product discovery, responsive interactions, and a straightforward checkout experience.",

    tech: ["React", "Node.js", "Express", "MongoDB"],

    github: "https://github.com/",

    live: "#",

    cover: "freshcart",
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
