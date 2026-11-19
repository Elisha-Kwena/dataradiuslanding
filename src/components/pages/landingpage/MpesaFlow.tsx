"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  { n: "01", label: "STK Push sent" },
  { n: "02", label: "PIN confirmed" },
  { n: "03", label: "Payment matched" },
  { n: "04", label: "Session live" },
];

const TOTAL = steps.length;

export default function MpesaFlow() {
  const [current, setCurrent] = useState(0); // index in progress; TOTAL = all done
  const paused = useReducedMotion();
  const done = current >= TOTAL;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setCurrent((c) => (c >= TOTAL ? 0 : c + 1)),
      done ? 2200 : 1200,
    );
    return () => clearTimeout(t);
  }, [current, done, paused]);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {steps.map((s, i) => {
        const state =
          i < current || done ? "done" : i === current ? "active" : "pending";
        return (
          <div
            key={s.n}
            className={`rounded-lg border px-3 py-2.5 transition-all duration-500 ${
              state === "done"
                ? "border-emerald-500/25 bg-emerald-500/10"
                : state === "active"
                  ? "border-blue-500/40 bg-blue-500/10 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]"
                  : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p
              className={`font-mono text-[9px] transition-colors duration-500 ${
                state === "done"
                  ? "text-emerald-400"
                  : state === "active"
                    ? "text-blue-300"
                    : "text-slate-600"
              }`}
            >
              {s.n}
            </p>
            <p
              className={`mt-1 text-[11px] leading-snug transition-colors duration-500 ${
                state === "done"
                  ? "text-slate-300"
                  : state === "active"
                    ? "text-blue-100"
                    : "text-slate-500"
              }`}
            >
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
