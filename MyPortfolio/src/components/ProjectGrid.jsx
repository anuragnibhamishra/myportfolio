import { useEffect, useRef, useState } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import freshcartAdminDashboard from "../assets/freshcart/adminDashboard.png";
import freshcartAdminOrders from "../assets/freshcart/adminOrdersPage.png";
import freshcartAdminProducts from "../assets/freshcart/adminProductsPage.png";
import freshcartDeals from "../assets/freshcart/dealsPage.png";
import freshcartHome from "../assets/freshcart/freshcartHomeFull.png";
import freshcartLogin from "../assets/freshcart/loginPage.png";
import freshcartOrders from "../assets/freshcart/ordersPage.png";
import freshcartProducts from "../assets/freshcart/productPage.png";
import freshcartSignup from "../assets/freshcart/signupPage.png";
import ProjectCover from "./ProjectCover";
import TechBadge from "./TechBadge";

const freshcartGallery = [
  { src: freshcartHome, alt: "FreshCart home page" },
  { src: freshcartProducts, alt: "FreshCart product page" },
  { src: freshcartDeals, alt: "FreshCart deals page" },
  { src: freshcartOrders, alt: "FreshCart orders page" },
  { src: freshcartLogin, alt: "FreshCart login page" },
  { src: freshcartSignup, alt: "FreshCart sign-up page" },
  { src: freshcartAdminDashboard, alt: "FreshCart admin dashboard" },
  { src: freshcartAdminProducts, alt: "FreshCart admin products page" },
  { src: freshcartAdminOrders, alt: "FreshCart admin orders page" },
];

export default function ProjectGrid({ projects }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const galleryTriggerRef = useRef(null);
  const galleryCloseRef = useRef(null);
  const galleryDialogRef = useRef(null);

  useEffect(() => {
    if (!galleryOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setGalleryOpen(false);
      } else if (event.key === "ArrowRight") {
        setActiveGalleryIndex((index) => (index + 1) % freshcartGallery.length);
      } else if (event.key === "ArrowLeft") {
        setActiveGalleryIndex(
          (index) => (index - 1 + freshcartGallery.length) % freshcartGallery.length
        );
      } else if (event.key === "Tab") {
        const focusable = galleryDialogRef.current?.querySelectorAll(
          'button:not([disabled])'
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    galleryCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      galleryTriggerRef.current?.focus();
    };
  }, [galleryOpen]);

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
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-medium tracking-tight">{project.title}</h2>
                      {project.id === "freshcart" ? (
                        <button
                          ref={galleryTriggerRef}
                          type="button"
                          onClick={() => {
                            setActiveGalleryIndex(0);
                            setGalleryOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 border border-fg/15 px-3 py-1.5 text-xs text-fg-2 transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                          aria-haspopup="dialog"
                        >
                          <IconPhoto size={15} aria-hidden="true" />
                          View gallery
                        </button>
                      ) : null}
                    </div>
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
      {galleryOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setGalleryOpen(false);
          }}
        >
          <section
            ref={galleryDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="freshcart-gallery-heading"
            className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden border border-fg/15 bg-surface-2 shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-fg/10 px-5 py-4 md:px-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                  Screenshots · {String(activeGalleryIndex + 1).padStart(2, "0")} /{" "}
                  {String(freshcartGallery.length).padStart(2, "0")}
                </p>
                <h2 id="freshcart-gallery-heading" className="mt-1 text-lg font-medium">
                  FreshCart gallery
                </h2>
              </div>
              <button
                ref={galleryCloseRef}
                type="button"
                onClick={() => setGalleryOpen(false)}
                className="border border-fg/15 p-2 text-fg-2 transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                aria-label="Close FreshCart gallery"
              >
                <IconX size={18} aria-hidden="true" />
              </button>
            </header>
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/30 p-4 md:p-8">
              <img
                src={freshcartGallery[activeGalleryIndex].src}
                alt={freshcartGallery[activeGalleryIndex].alt}
                className="max-h-[55vh] max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryIndex(
                    (index) => (index - 1 + freshcartGallery.length) % freshcartGallery.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 border border-fg/20 bg-surface-2/90 p-2 text-fg transition-colors hover:border-accent hover:text-accent md:left-6"
                aria-label="Previous image"
              >
                <IconArrowLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryIndex((index) => (index + 1) % freshcartGallery.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 border border-fg/20 bg-surface-2/90 p-2 text-fg transition-colors hover:border-accent hover:text-accent md:right-6"
                aria-label="Next image"
              >
                <IconArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="border-t border-fg/10 px-4 py-3 md:px-6">
              <p className="mb-2 truncate text-xs text-fg-2">
                {freshcartGallery[activeGalleryIndex].alt}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {freshcartGallery.map((image, index) => (
                  <button
                    key={image.alt}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    className={`w-24 shrink-0 overflow-hidden border transition-colors ${
                      index === activeGalleryIndex
                        ? "border-accent"
                        : "border-fg/15 hover:border-fg/40"
                    }`}
                    aria-label={`Show image ${index + 1}: ${image.alt}`}
                    aria-current={index === activeGalleryIndex ? "true" : undefined}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className="aspect-video w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
