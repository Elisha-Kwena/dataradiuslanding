"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  Check,
  FileText,
  LayoutDashboard,
  Pause,
  Play,
  PlugZap,
  Router,
  Send,
  UserPlus,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const customers = [
  { name: "Elena Taylor", plan: "Home Plus" },
  { name: "Jacob Kingsley", plan: "Business Pro" },
  { name: "Mitchelle Kemunto", plan: "Family Fiber" },
];

type Step = { icon: LucideIcon; text: string };

function stepsFor(name: string, plan: string): Step[] {
  return [
    { icon: UserPlus, text: `${name} signs up for ${plan}` },
    { icon: Router, text: "Account created on router" },
    { icon: FileText, text: "Invoice for KES 5,000 generated" },
    { icon: Send, text: "Welcome SMS sent" },
    { icon: Wrench, text: "Installation job booked" },
    { icon: PlugZap, text: "ONU provisioned, CPE connected" },
    { icon: Wifi, text: `${name} is online` },
    { icon: LayoutDashboard, text: "Dashboard updated" },
  ];
}

const TOTAL = 8;

export default function LiveDemo() {
  const [run, setRun] = useState(0);
  const [current, setCurrent] = useState(0); // index in progress; TOTAL = all done
  const [userPaused, setUserPaused] = useState(false);
  const reduce = useReducedMotion();
  const paused = userPaused || reduce;

  const customer = customers[run % customers.length];
  const steps = stepsFor(customer.name, customer.plan);
  const done = current >= TOTAL;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => {
        if (done) {
          setCurrent(0);
          setRun((r) => r + 1);
        } else {
          setCurrent((c) => c + 1);
        }
      },
      done ? 2800 : 1100,
    );
    return () => clearTimeout(t);
  }, [current, done, paused]);

  return (
    <div className="relative w-full">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="live-demo-ambient ambient-glow absolute -inset-4 -z-10 rounded-[2rem] bg-blue-600/15 blur-2xl"
      />
      <div
        role="region"
        aria-label="Live demo network simulation"
        className="live-demo-card w-full rounded-2xl border border-white/10  p-5  backdrop-blur-xl sm:p-6"
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Live demo network
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
              {done ? "Synced" : "Live"}
            </span>
          </div>
        </div>

        {/* progress bar */}
        <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-linear-to-r from-blue-500 to-emerald-400 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-700 ease-out"
            style={{ width: `${(current / TOTAL) * 100}%` }}
          />
        </div>

        {/* steps */}
        <ul className="relative mt-5 flex flex-col gap-1">
          {/* timeline connector */}
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-[21.5px] top-5 w-px bg-white/5"
          >
            <div
              className="w-full bg-emerald-400/40 transition-all duration-700 ease-out"
              style={{ height: `${(current / TOTAL) * 100}%` }}
            />
          </div>
          {steps.map((step, i) => {
            const state = i < current || done ? "done" : i === current ? "active" : "pending";
            const Icon = step.icon;
            return (
              <li
                key={step.text}
                className={`relative flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors duration-500 ${
                  state === "active" ? "bg-white/5 ring-1 ring-white/10" : ""
                }`}
              >
                {/* status indicator */}
                <span className="flex w-5 flex-none items-center justify-center">
                  {state === "done" ? (
                    <span className="flex size-[18px] items-center justify-center rounded-full bg-emerald-500/90 shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                      <Check className="size-3 text-emerald-950" strokeWidth={3.5} />
                    </span>
                  ) : state === "active" ? (
                    <span className="size-[18px] rounded-full border-2 border-slate-600 border-t-blue-400 motion-safe:animate-spin" />
                  ) : (
                    <span className="size-[18px] rounded-full border border-slate-700/80 bg-[#0a0a0f]" />
                  )}
                </span>

                {/* step icon */}
                <span
                  className={`flex size-7 flex-none items-center justify-center rounded-md transition-colors duration-500 ${
                    state === "done"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : state === "active"
                        ? "bg-blue-500/10 text-blue-300"
                        : "bg-white/5 text-slate-500"
                  }`}
                >
                  <Icon className="size-3.5" />
                </span>

                {/* label */}
                <span
                  className={`text-sm transition-colors duration-500 ${
                    state === "done"
                      ? "text-slate-200"
                      : state === "active"
                        ? "text-white"
                        : "text-slate-500"
                  }`}
                >
                  {step.text}
                </span>
              </li>
            );
          })}
        </ul>

        {/* footer */}
        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Step {Math.min(current + 1, TOTAL)}/{TOTAL}
          </p>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={paused ? "Resume simulation" : "Pause simulation"}
            className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
          >
            {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
