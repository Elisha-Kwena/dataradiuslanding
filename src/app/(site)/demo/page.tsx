import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cable, Router, Wifi, type LucideIcon } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Live product demo — DataRadius",
  description:
    "Try DataRadius without signing up. Choose your scenario — fiber, wireless or hotspot — and explore the real product with demo data.",
};

const scenarios: { icon: LucideIcon; label: string; description: string; href: string }[] = [
  {
    icon: Router,
    label: "Wireless ISP",
    description: "Six towers, 700 subscribers, PPPoE billing, daily payments. See routers, subscriber accounts, invoices, dispatch and the command centre.",
    href: "https://demo.dataradius.net/?story=wireless-isp",
  },
  {
    icon: Cable,
    label: "Fiber ISP",
    description: "Two OLTs, 24 ONUs, 120 subscribers, recurring billing, a plant map with light levels. See the fiber dashboard, power budgets and field jobs.",
    href: "https://demo.dataradius.net/?story=fiber-isp",
  },
  {
    icon: Wifi,
    label: "Hotspot operator",
    description: "Three sites, voucher sales, mobile money payments, a branded captive portal. See plans, codes, per-site analytics and the portal designer.",
    href: "https://demo.dataradius.net/?story=hotspot-operator",
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <span className="size-1.5 animate-pulse rounded-full bg-blue-400" />
            <p className="px-1 font-mono text-xs uppercase tracking-widest text-white">Live product</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Try it before you <span className="text-blue-800">sign up.</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Pick your scenario and explore the real product with a demo network.
            No account needed.
          </p>
          <p className="font-mono text-xs text-slate-500">
            When you&apos;re ready: 14 days free, no card needed.
          </p>
        </div>
      </section>

      {/* ============================= SCENARIOS ============================= */}
      <section className="mx-auto w-[90%] py-16">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Live demo network</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Choose your network.</h2>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Each scenario opens the full product loaded with a realistic demo network.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 80}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-800"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-gray-200 group-hover:text-white">{s.label}</h3>
                  <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-slate-400">{s.description}</p>
                  <span className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors group-hover:text-blue-400">
                    Open demo
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================ CTA ================================ */}
      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Start free. Your first router can be online <span className="text-blue-800">today.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              14 days free. Everything you just saw is included.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
