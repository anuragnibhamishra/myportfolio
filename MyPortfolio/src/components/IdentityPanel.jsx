import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const lines = [
  { token: "const", rest: " identity = {" },
  { token: "  role:", rest: ' "full-stack",' },
  { token: "  stack:", rest: " [react, node]," },
  { token: "  focus:", rest: ' "interfaces",' },
  { token: "  status:", rest: " available" },
  { token: "}", rest: "" },
];

export default function IdentityPanel() {
  const ref = useRef(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 18 });
  const springY = useSpring(my, { stiffness: 80, damping: 18 });
  const rotateX = useTransform(springY, [-40, 40], [6, -6]);
  const rotateY = useTransform(springX, [-40, 40], [-8, 8]);
  const shiftX = useTransform(springX, (value) => value * 0.08);
  const shiftY = useTransform(springY, (value) => value * 0.06);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(event.clientX - rect.left - rect.width / 2);
    my.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX, rotateY, x: shiftX, y: shiftY }}
      className="relative mx-auto w-full lg:min-w-lg overflow-hidden rounded-lg border border-fg/10 bg-surface-2 p-6 shadow-[0_0_80px_rgba(214,255,183,0.06)] md:p-8"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            anurag — session
          </span>
        </div>
        <time
          dateTime={currentTime.toISOString()}
          className="shrink-0 font-mono text-[11px] tabular-nums tracking-[0.12em] text-accent"
        >
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </time>
      </div>
      <pre className="overflow-x-auto font-mono text-[12px] leading-7 text-fg-2 md:text-[13px]">
        {lines.map((line) => (
          <div key={line.token + line.rest}>
            <span className="text-accent">{line.token}</span>
            <span>{line.rest}</span>
          </div>
        ))}
      </pre>
      <div className="mt-6 flex items-center justify-between border-t border-fg/8 pt-4 text-[11px] uppercase tracking-[0.18em] text-fg-muted">
        <span>latency 12ms</span>
        <span className="text-accent">compiled</span>
      </div>
    </motion.div>
  );
}
