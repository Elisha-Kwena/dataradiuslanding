"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Camera, Check, Lock, MapPin, WifiOff } from "lucide-react";
import { useCountUp, useInView } from "@/lib/useCountUp";
import Reveal from "@/components/ui/Reveal";

/* ---------- field stats (scroll count-up) ---------- */
const fieldStats = [
  { value: 41, suffix: "%", label: "truck rolls avoided" },
  { value: 47, suffix: "s", label: "median claim time" },
  { value: 96, suffix: "%", label: "jobs closed with proof" },
  { value: 12480, suffix: "", label: "jobs auto-created" },
];

function FieldStats() {
  const { ref, inView } = useInView(0.4);

  return (
    <div ref={ref} className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
      {fieldStats.map((s, i) => (
        <FieldStatCell key={s.label} target={s.value} suffix={s.suffix} label={s.label} delay={i * 120} started={inView} />
      ))}
    </div>
  );
}

function FieldStatCell({
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
    <div className="bg-black p-6">
      <p className="font-ibmblockserif text-3xl text-white tabular-nums md:text-4xl">
        {shown.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

/* ---------- animated job card ---------- */
const PHASES = 5; // 0 created · 1 claimed · 2 step1 · 3 step2+photo · 4 synced

function JobCard({ paused }: { paused: boolean }) {
  const [phase, setPhase] = useState(0);
  const [sla, setSla] = useState(4 * 3600 + 12 * 60 + 40);

  // SLA countdown (always ticking)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSla((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [paused]);

  // phase loop
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setPhase((p) => (p >= PHASES - 1 ? 0 : p + 1)),
      phase >= PHASES - 1 ? 2800 : 1400,
    );
    return () => clearTimeout(t);
  }, [phase, paused]);

  const h = Math.floor(sla / 3600);
  const m = Math.floor((sla % 3600) / 60);
  const s = sla % 60;
  const claimed = phase >= 1;
  const stepsDone = phase >= 2 ? Math.min(phase - 1, 2) : 0;
  const synced = phase >= 4;

  const steps = ["Arrive on site & confirm ONT", "Swap ONT + test signal", "Photo proof + signature"];

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
      {/* job header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-wider text-slate-500">JOB-2841</p>
        <span
          className={`rounded px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider transition-colors duration-500 ${
            claimed ? "bg-blue-500/10 text-blue-300" : "bg-amber-400/10 text-amber-300"
          }`}
        >
          {claimed ? "CLAIMED" : "AUTO-CREATED"}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-white">
        ONT offline: Block C, Maseno
      </p>

      {/* meta */}
      <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-slate-500">
        <span className="rounded bg-rose-500/10 px-1.5 py-0.5 font-semibold text-rose-300">P1</span>
        <span className="tabular-nums">
          SLA {h}h {String(m).padStart(2, "0")}m {String(s).padStart(2, "0")}s
        </span>
        <span className="truncate">Team West</span>
      </div>

      {/* assignee */}
      <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
        <span
          className={`flex size-6 items-center justify-center rounded-full font-mono text-[9px] font-semibold transition-colors duration-500 ${
            claimed ? "bg-blue-500/10 text-blue-300" : "bg-white/5 text-slate-500"
          }`}
        >
          {claimed ? "KM" : ": "}
        </span>
        <p className="text-[11px] text-slate-400">
          {claimed ? "Kevin M. · claimed in 12s" : "Awaiting claim…"}
        </p>
      </div>

      {/* required steps */}
      <ul className="mt-3 flex flex-col gap-1.5">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2 text-[11px]">
            <span
              className={`flex size-3.5 items-center justify-center rounded-sm border transition-colors duration-500 ${
                i < stepsDone
                  ? "border-blue-500 bg-blue-500 text-black"
                  : "border-white/20 text-transparent"
              }`}
            >
              <Check className="size-2.5" strokeWidth={4} />
            </span>
            <span className={i < stepsDone ? "text-slate-200" : "text-slate-500"}>
              {label}
            </span>
            <Lock className="ml-auto size-3 text-slate-600" />
          </li>
        ))}
      </ul>

      {/* photo proof thumbnail */}
      <div
        className={`mt-3 overflow-hidden rounded-md border border-white/10 transition-all duration-500 ${
          phase >= 3 ? "max-h-24 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex h-14 items-center justify-center gap-2 bg-white/5">
          <Camera className="size-4 text-slate-500" />
          <span className="font-mono text-[9px] text-slate-500">photo_1432.jpg</span>
        </div>
        <p className="flex items-center gap-1 px-2 py-1 font-mono text-[8px] text-slate-500">
          <MapPin className="size-2.5" />
          -0.0917, 34.7680 · 14:32 · K.M.
        </p>
      </div>

      {/* sync badge */}
      <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] tracking-wider">
        {synced ? (
          <>
            <span className="size-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-300">SYNCED</span>
          </>
        ) : (
          <>
            <WifiOff className="size-3 text-amber-300" />
            <span className="text-amber-300">QUEUED OFFLINE</span>
          </>
        )}
      </div>
    </div>
  );
}

function PhoneMock({ paused }: { paused: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[330px] rounded-[2rem] border border-white/15 bg-[#0a0a0f] p-2">
      <div className="rounded-[1.6rem] bg-black px-3 pb-4 pt-2">
        {/* status bar */}
        <div className="flex items-center justify-between px-2 font-mono text-[9px] text-slate-500">
          <span className="tabular-nums">14:32</span>
          <span className="rounded-full bg-white/10 px-6 py-0.5" />
          <span>85%</span>
        </div>
        <p className="mt-3 px-1 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
          Today · 7 jobs · 41 km
        </p>
        <div className="mt-2">
          <JobCard paused={paused} />
        </div>
      </div>
    </div>
  );
}

/* ---------- core loop rows ---------- */
const mono = "font-mono text-[10px] tracking-wider";

export default function FieldService() {
  const paused = useReducedMotion();

  const loops = [
    {
      tag: "01 / AUTO-JOBS",
      title: "The fault files the ticket",
      body: "Faults create jobs: priority, deadline, owning team. First tech to claim wins; cleared faults cancel themselves.",
    },
    {
      tag: "02 / DISPATCH",
      title: "Drag, drop: phone buzzed",
      body: "Assign by dragging. Best-tech suggestions, closest, free today, knows the site, plus a routed day plan.",
    },
    {
      tag: "03 / JOB RUNNER",
      title: "Steps that can't be skipped",
      body: "Guided on-phone execution: briefing, locked steps, on-screen signature, GPS-stamped proof.",
    },
    {
      tag: "04 / OFFLINE-FIRST",
      title: "No signal is not an excuse",
      body: "Photos, readings and sign-offs queue on the phone and sync when coverage returns.",
    },
    {
      tag: "05 / REMOTE DIAGNOSE",
      title: "Fixed from the office",
      body: "Check light levels and router state, restart or re-apply the plan: no truck roll.",
    },
  ];

  const extras = [
    "Site history",
    "Van stock",
    "Supervisor queue",
    "Integrity flags",
    "Self-booking & messaging",
    "Spoken guidance",
    "Cash reconciliation",
    "Safety incidents",
    "Lead capture",
  ];

  return (
    <section className="w-full bg-black py-24 text-white">
      <div className="mx-auto w-[90%]">
        {/* hero */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className={`${mono} flex items-center gap-2 text-blue-500`}>
                <span className="size-1.5 rounded-full bg-blue-500" />
                DATARADIUS FIELD
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-akhirtahun text-2xl sm:text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
                Jobs that create themselves.
                <br />
                Crews that just move.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 font-serif max-w-lg text-lg leading-relaxed text-slate-400">
                Dispatch, guided job-running, photo proof and van stock: the
                field half of your ISP platform, offline-first and built for
                crews on tight margins.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] text-slate-500">
                <span>· auto-jobs from network faults</span>
                <span>· offline-first</span>
                <span>· GPS-stamped proof</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <PhoneMock paused={paused} />
          </Reveal>
        </div>

        {/* core loops: compact grid */}
        <div className="mt-20 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {loops.map((loop, i) => (
            <Reveal key={loop.tag} delay={i * 80}>
              <div className="border-t-2 border-blue-500/30 pt-4">
                <p className={`${mono} text-blue-500`}>{loop.tag}</p>
                <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-white">
                  {loop.title}
                </h3>
                <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">
                  {loop.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* field stats */}
        <FieldStats />

        {/* everything else */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <Reveal>
            <p className={`${mono} text-slate-500`}>ALSO IN THE APP</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {extras.map((title) => (
                <span
                  key={title}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-400"
                >
                  {title}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
