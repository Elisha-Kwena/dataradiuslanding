import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About | DataRadius",
  description:
    "Software that runs internet providers: billing, payments, routers, hotspots, fibre and field teams in one system.",
};

const points = [
  { title: "Built for ISPs", text: "Not generic invoicing software with a network theme. Every feature exists because an internet provider needed it: prepaid plans, router automation, hotspot vouchers, M-Pesa." },
  { title: "One workspace", text: "Subscribers, payments, routers, maps and technicians share one database. What billing knows, the network knows." },
  { title: "Emerging-market first", text: "Mobile money, intermittent power, prepaid subscribers and lean teams are the design defaults, not edge cases." },
];

export default function CompanyPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Company</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Software that runs internet providers.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            DataRadius is ISP management software. A provider connects a router,
            creates plans and starts collecting payment: billing, RADIUS,
            hotspot portals, network maps and field jobs run in one workspace.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <h2 className="font-semibold text-gray-200">{p.title}</h2>
                <p className="font-serif text-sm leading-relaxed text-slate-400">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-12 text-center">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">See it running.</h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-slate-400">
              14 days free, no card required. Connect a router and watch the
              first subscriber pay.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
