"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const sites = [
  { name: "Maseno", base: 22 },
  { name: "Malaba", base: 34 },
  { name: "Keroka", base: 58 },
  { name: "Garissa", base: 41 },
];

const WARN_MS = 50;

export default function SiteHealth() {
  const [latency, setLatency] = useState<number[]>(sites.map((s) => s.base));
  const paused = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () =>
        setLatency(
          sites.map((s) =>
            Math.max(8, Math.round(s.base + (Math.random() * 18 - 8))),
          ),
        ),
      1400,
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      {sites.map((site, i) => {
        const ms = latency[i];
        const warn = ms >= WARN_MS;
        const pct = Math.min(98, Math.max(6, 100 - ms));
        return (
          <div
            key={site.name}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3.5 py-2.5"
          >
            <span
              className={`size-1.5 flex-none rounded-full transition-colors duration-500 ${
                warn ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            <p className="w-28 flex-none truncate text-xs text-slate-200">
              {site.name}
            </p>
            <p
              className={`w-12 flex-none font-mono text-[10px] tabular-nums transition-colors duration-500 ${
                warn ? "text-amber-300" : "text-slate-500"
              }`}
            >
              {ms} ms
            </p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  warn ? "bg-amber-400" : "bg-blue-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
