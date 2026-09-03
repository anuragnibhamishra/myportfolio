import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.75 bg-accent/15">
      <motion.div
        className="h-full w-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </div>
  );
}
