import type { Metadata } from "next";
import { Activity } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Status | All systems operational",
  description: "Live status for the DataRadius platform: uptime and incident history.",
};

const systems = [
  "Dashboard & API",
  "Subscriber portal",
  "Payments & billing engine",
  "Router & RADIUS services",
  "Field app sync",
  "Captive portal hosting",
];

export default function StatusPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 p-2 pr-4">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            <p className="px-1 font-mono text-xs uppercase tracking-widest text-emerald-300">All systems operational</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            System <span className="text-blue-800">status.</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Uptime and incident history for the DataRadius platform.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] max-w-3xl py-16">
        <Reveal>
          <div className="rounded-3xl border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Components</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">100% uptime · 90 days</p>
            </div>
            <ul>
              {systems.map((s) => (
                <li key={s} className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4 last:border-0">
                  <span className="text-sm text-slate-300">{s}</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Operational
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <Activity className="size-5 flex-none text-blue-400" />
            <p className="font-serif text-sm text-slate-400">
              No incidents in the last 90 days. Scheduled maintenance is
              announced here and by email in advance.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
