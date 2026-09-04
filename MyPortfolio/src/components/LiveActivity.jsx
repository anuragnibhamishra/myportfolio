import { useEffect, useState } from "react";
import { subscribeToActivity } from "../services/activitySocket";

const initialState = {
  activity: null,
  connectionState: "disconnected",
};

export default function LiveActivity() {
  const [state, setState] = useState(initialState);

  useEffect(() => subscribeToActivity(setState), []);

  const { activity, connectionState } = state;
  const label = activity?.action?.toUpperCase() ??
    (connectionState === "connecting" ? "CONNECTING" : "OFFLINE");
  const isLive = Boolean(activity) && connectionState === "connected";

  return (
    <div className="inline-flex items-center">
      <div className="inline-flex items-center gap-2 border border-[#D6FFB7]/30 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#D6FFB7]">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {isLive ? <span className="absolute inset-0 animate-ping rounded-full bg-[#D6FFB7]/50" /> : null}
          <span className={`relative h-2 w-2 rounded-full ${isLive ? "bg-[#D6FFB7]" : "bg-neutral-600"}`} />
        </span>
        <span>{label}</span>
      </div>
    </div>
  );
}