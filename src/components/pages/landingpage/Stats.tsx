"use client";

import { useCountUp, useInView } from "@/lib/useCountUp";

const stats = [
  { value: 4, suffix: "s", label: "pay to online, typical" },
  { value: 100, suffix: "%", label: "payments auto-matched" },
  { value: 0, suffix: "", label: "manual reconnects" },
  { value: 14, suffix: " days", label: "free trial, no card" },
];

const STAGGER_MS = 120;

function StatCell({
  target,
  suffix,
  label,
  delay,
  started,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
  started: boolean;
}) {
  const shown = useCountUp(target, started, delay);

  return (
    <div className="bg-black p-8">
      <p className="font-ibmblockserif text-4xl text-white tabular-nums md:text-5xl">
        {shown}
        {suffix}
      </p>
      <p className="mt-3 text-xs text-slate-500">{label}</p>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView(0.4);

  return (
    <section className="flex w-full justify-center bg-black pb-24">
      <div ref={ref} className="w-[90%]">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCell
              key={s.label}
              target={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * STAGGER_MS}
              started={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
