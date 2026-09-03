import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let timeout;
    let current = 0;
    const started = performance.now();
    let cancelled = false;

    const tick = (now) => {
      if (cancelled) return;
      const elapsed = now - started;
      const target = Math.min(100, (elapsed / 900) * 100);
      current += (target - current) * 0.14;
      const next = Math.min(100, Math.round(current));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(onDone, 220);
      }
    };

    const start = async () => {
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 500)),
        ]);
      } catch {
        /* continue */
      }
      if (!cancelled) frame = requestAnimationFrame(tick);
    };

    start();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-surface"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex w-[220px] flex-col items-center gap-8">
        <p className="text-5xl font-medium tracking-[0.18em] text-fg">AM</p>
        <div className="h-px w-full overflow-hidden bg-fg/10">
          <motion.div
            className="h-full origin-left bg-accent"
            animate={{ scaleX: progress / 100 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        </div>
        <p className="font-mono text-xs tabular-nums tracking-[0.2em] text-fg-muted">
          {String(progress).padStart(3, "0")}
        </p>
      </div>
    </motion.div>
  );
}
