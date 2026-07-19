"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  target: string;
  className?: string;
}

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function Countdown({ target, className }: CountdownProps) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hrs", value: time?.hours },
    { label: "Min", value: time?.minutes },
    { label: "Sec", value: time?.seconds },
  ];

  return (
    <div className={className}>
      <div className="flex gap-4">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="font-mono text-3xl font-semibold tabular-nums text-foreground md:text-4xl">
              {u.value !== undefined ? String(u.value).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
