import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { subscribeToActivity } from "../services/activitySocket";

const initialState = {
  activity: null,
  connectionState: "disconnected",
};

export default function LiveActivity() {
  const [state, setState] = useState(initialState);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => subscribeToActivity(setState), []);

  const { activity, connectionState } = state;
  const label = activity?.action?.toUpperCase() ??
    (connectionState === "connecting" ? "CONNECTING" : "OFFLINE");
  const isLive = Boolean(activity) && connectionState === "connected";

  return (
    <div className="group/info relative inline-flex items-center">
      <div className="inline-flex items-center gap-2 border-2 border-[#D6FFB7]/40 px-3 rounded-lg py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#D6FFB7]">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {isLive ? <span className="absolute inset-0 animate-ping rounded-full bg-[#D6FFB7]/50" /> : null}
          <span className={`relative h-2 w-2 rounded-full ${isLive ? "bg-[#D6FFB7]" : "bg-neutral-600"}`} />
        </span>
        <span>{label}</span>
        <button
          type="button"
          className="relative ml-2 inline-flex h-5 w-5 items-center justify-center text-[#D6FFB7]/60 transition-colors hover:text-[#D6FFB7]"
          aria-label="About live activity"
          aria-expanded={isInfoOpen}
          onClick={() => setIsInfoOpen((open) => !open)}
        >
          <IconInfoCircle size={14} strokeWidth={1.5} aria-hidden="true" />

        </button>
      </div>
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 border border-[#D6FFB7]/20 bg-[#0A0A0A]/90 px-3 py-1.5 text-left font-sans text-xs normal-case leading-relaxed tracking-normal text-[#F7F7F7] shadow-lg transition-opacity ${isInfoOpen ? "opacity-100" : "opacity-0 group-hover/info:opacity-100"}`}
      >
        This is Anurag&apos;s live activity, your activity is not tracked.
      </span>
    </div>
  );
}