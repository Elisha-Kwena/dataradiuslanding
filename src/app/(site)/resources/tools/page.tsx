import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  Lightbulb,
  Network,
  TrendingUp,
  Wand2,
} from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Free ISP tools and calculators",
  description:
    "Fiber power budget, revenue and churn, oversubscription, subnet calculator and hotspot login page generator: free, no sign-up required.",
};

const tools = [
  {
    icon: Lightbulb,
    title: "Fiber power budget calculator",
    text: "Calculate total optical loss, margin and pass/fail verdict for GPON and XGS-PON deployments.",
    href: "/resources/tools/fiber-power-budget",
  },
  {
    icon: TrendingUp,
    title: "ISP revenue and churn calculator",
    text: "Model monthly recurring revenue, project subscriber growth and see how churn rate affects your bottom line.",
    href: "/resources/tools/revenue-churn-calculator",
  },
  {
    icon: ArrowUpDown,
    title: "Oversubscription planner",
    text: "Size your uplink bandwidth based on subscriber count, plan speeds and a target oversubscription ratio.",
    href: "/resources/tools/oversubscription-planner",
  },
  {
    icon: Network,
    title: "Subnet and IP pool calculator",
    text: "Enter a CIDR block and get the network address, broadcast, usable host range and a suggested pool split.",
    href: "/resources/tools/subnet-calculator",
  },
  {
    icon: Wand2,
    title: "Hotspot login page generator",
    text: "Pick a layout, set your colours and logo, then copy the HTML for a MikroTik captive portal login page.",
    href: "/resources/tools/hotspot-login-generator",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">Free tools</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Free tools for <span className="text-blue-800">ISP operators.</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Calculators and generators built from the same code that powers
            DataRadius. No sign-up, no tracking — just answers.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={(i % 3) * 80}>
                <Link
                  href={t.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-800"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-5 font-semibold text-gray-200">{t.title}</h2>
                  <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-slate-400">{t.text}</p>
                  <span className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors group-hover:text-blue-400">
                    Open tool
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Run your ISP from <span className="text-blue-800">one place.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              14 days free · No credit card required · Cancel anytime
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
