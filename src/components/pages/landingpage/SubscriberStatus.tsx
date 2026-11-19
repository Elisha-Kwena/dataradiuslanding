"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const states = [
  {
    pill: "Overdue",
    sub: "Suspended",
    pillCls: "bg-rose-500/15 text-rose-300",
    avatarCls: "bg-rose-500/20 text-rose-300",
    trackCls: "bg-rose-500/80",
    on: true,
    duration: 1800,
  },
  {
    pill: "Payment received",
    sub: "PPPoE · 10 Mbps",
    pillCls: "bg-amber-500/15 text-amber-300",
    avatarCls: "bg-amber-500/20 text-amber-300",
    trackCls: "bg-white/10",
    on: false,
    duration: 1400,
  },
  {
    pill: "Online",
    sub: "PPPoE · 10 Mbps",
    pillCls: "bg-emerald-500/15 text-emerald-300",
    avatarCls: "bg-emerald-500/20 text-emerald-300",
    trackCls: "bg-emerald-500/80",
    on: true,
    duration: 2600,
  },
];

export default function SubscriberStatus() {
  const [i, setI] = useState(0);
  const paused = useReducedMotion();
  const s = states[i % states.length];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % states.length), s.duration);
    return () => clearTimeout(t);
  }, [i, paused, s.duration]);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
      <span
        className={`flex size-9 flex-none items-center justify-center rounded-full text-xs font-semibold transition-colors duration-500 ${s.avatarCls}`}
      >
        K
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-200">Kamau W.</p>
        <p
          className={`text-[10px] transition-colors duration-500 ${
            s.pill === "Overdue" ? "text-rose-400" : "text-slate-500"
          }`}
        >
          {s.sub}
        </p>
      </div>
      <span
        className={`ml-auto hidden rounded-full px-2 py-1 text-[9px] transition-colors duration-500 sm:block ${s.pillCls}`}
      >
        {s.pill}
      </span>
      <span
        className={`relative h-5 w-9 flex-none rounded-full transition-colors duration-500 ${s.trackCls}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform duration-500 ${
            s.on ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </div>
  );
}
