import { useEffect, useState } from "react";

type LiveActivityProps = {
  app?: string;
  action?: string;
  startedAt?: number;
  isOnline?: boolean;
};

export default function LiveActivity({
  app = "Instagram",
  action = "Scrolling",
  startedAt = Date.now() - 8 * 60 * 1000,
  isOnline = true,
}: LiveActivityProps) {
  const [elapsed, setElapsed] = useState(
    Math.floor((Date.now() - startedAt) / 1000)
  );

  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, isOnline]);

  const formatTime = () => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="inline-flex items-center">
      {/* Connector line */}

      {/* Activity badge */}
      <div
        className="
          inline-flex items-center gap-2
          border border-[#D6FFB7]/30
          px-3 py-2
          font-mono text-[11px]
          uppercase tracking-[0.16em]
          text-[#D6FFB7]
        "
      >
        {/* Live indicator */}
        <span className="relative flex h-2 w-2">
          {isOnline && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#D6FFB7]/50" />
          )}

          <span
            className={`relative h-2 w-2 rounded-full ${
              isOnline ? "bg-[#D6FFB7]" : "bg-neutral-600"
            }`}
          />
        </span>

        {/* Activity */}
        <span>
          {isOnline ? `${action} ${app}` : "DOING SOMETHING OFFLINE"}
        </span>
      </div>
    </div>
  );
}