import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Columns2,
  FileCheck,
  Mail,
  MoveRight,
  Plus,
  Unplug,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import SwitchPlanner from "@/components/pages/switch/SwitchPlanner";

export const metadata: Metadata = {
  title: "Switch | Switch without switching anything off",
  description:
    "Import customers, plans and balances, run both systems side by side, move routers one at a time, and go live when the numbers match.",
};

/* ------------------------------ content ------------------------------ */

const promises: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: UserCheck, title: "A named migration engineer on your move", text: "One person from import to go-live. They know your network before the first router moves." },
  { icon: FileCheck, title: "A written migration plan before you commit", text: "The planner below builds a phased plan from your answers. Your engineer reviews it and sends the final version." },
  { icon: Unplug, title: "Your old system stays on until you approve", text: "No weekend cut-overs. Both systems run side by side for as long as you need." },
  { icon: Columns2, title: "One billing cycle side by side", text: "Every customer, every invoice, every payment compared across both systems before you retire the old one." },
  { icon: MoveRight, title: "Routers move one at a time, each reversible", text: "Start with a pilot site. Roll back any router in minutes. Move the rest when you are satisfied." },
];

const phases: { label: string; detail: string }[] = [
  { label: "Inventory", detail: "Export subscribers, plans, balances, open invoices and router details from your current system. Your engineer reviews the export and flags anything that needs attention." },
  { label: "Import and reconcile", detail: "The import wizard maps your CSV columns. Subscriber counts and balances are reconciled against the source before anything goes live." },
  { label: "Side-by-side billing cycle", detail: "Run one full billing cycle in both systems. Compare invoices, collections and active-customer totals line by line." },
  { label: "Pilot router", detail: "Pick one site and move its router. Verify that every subscriber behind it authenticates, gets the right speed and shows up in billing. Written rollback plan ready." },
  { label: "Router-by-router migration", detail: "Move routers in batches or one at a time. Each router is one connection — disconnect it from DataRadius and it returns to the old setup." },
  { label: "Payment migration", detail: "Point payment callbacks to DataRadius at a quiet hour. Card tokens transfer where the gateway allows. A dual-acceptance window catches payments to either system." },
  { label: "Cut-over and morning-after checks", detail: "Cut over at a billing-cycle boundary with a freeze window and named owners. Morning-after checks verify every subscriber is billed and connected. Old system stays read-only for at least 30 days." },
];

const guides: { title: string; text: string; href: string; linkLabel: string }[] = [
  { title: "Splynx", text: "What moves, field mapping, timeline and what to check.", href: "/switch/from-splynx", linkLabel: "Splynx switching guide" },
  { title: "UISP", text: "Customers, sites and devices — what transfers and what to watch for.", href: "/switch/from-uisp", linkLabel: "UISP switching guide" },
  { title: "MikroTik User Manager", text: "Profiles, users and limitations — from User Manager to plan-based billing.", href: "/switch/from-mikrotik-user-manager", linkLabel: "User Manager guide" },
  { title: "Mikhmon", text: "Vouchers, users and hotspot profiles — what changes when you move.", href: "/switch/from-mikhmon", linkLabel: "Mikhmon switching guide" },
  { title: "Sonar", text: "Subscribers, billing, IP management and field ops — what moves from Sonar.", href: "/switch/from-sonar", linkLabel: "Sonar switching guide" },
  { title: "Powercode", text: "Customers, services, inventory and dispatch — what transfers from Powercode.", href: "/switch/from-powercode", linkLabel: "Powercode switching guide" },
  { title: "Spreadsheets or another system", text: "Spreadsheets, a free tool or something else — tell us what you run and we will map the move.", href: "/switch/from-spreadsheets", linkLabel: "General switching guide" },
];

const faqs: { q: string; a: string }[] = [
  { q: "How long does switching take?", a: "Most providers finish within two to three weeks. Small networks with fewer than five routers often finish in days." },
  { q: "Is there downtime during the switch?", a: "No. You move routers one at a time while both systems run. Customers stay online throughout." },
  { q: "What file format do I need for the import?", a: "CSV. Export customers, plans and balances from your current system: the import wizard maps the columns." },
  { q: "Can I switch back if something goes wrong?", a: "Yes. Each router is moved independently. Disconnect it from DataRadius and it returns to your previous setup." },
  { q: "Do you help with the migration?", a: "Yes. Every account includes a named migration engineer who reviews your import and answers questions throughout." },
  { q: "What about my payment integrations?", a: "Point your payment callbacks to DataRadius when you are ready. Existing payment methods and accounts carry over." },
];

/* ------------------------------ page ------------------------------ */

export default function SwitchPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-32">
        <NetworkBackground />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">Switch</p>
          </div>

          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Switch to DataRadius without switching
            <br />
            anything <span className="text-blue-800">off.</span>
          </h1>

          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Most providers already run a system. Moving shouldn&apos;t mean a
            weekend of downtime.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#planner"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Plan your move
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
            </a>
            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              Start 14-day free trial
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ PROMISE LADDER ============================ */}
      <section className="mx-auto w-[90%] py-20">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">What we commit to</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Every migration, guaranteed.</h2>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Every migration includes these guarantees. No exceptions.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={(i % 3) * 80} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div className="group flex h-full gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-800">
                  <span className="grid size-10 flex-none place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-200">{p.title}</h3>
                    <p className="mt-1 font-serif text-sm text-slate-400">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* =============================== RUNBOOK =============================== */}
      <section className="mx-auto w-[90%] py-20">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">How migration works</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Seven phases, each with a clear checkpoint.</h2>
        </Reveal>

        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <li key={p.label} className="relative">
              <Reveal delay={i * 80} className="h-full">
                <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-6 pt-9 transition duration-300 hover:border-blue-800">
                  <span className="absolute left-6 top-0 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-blue-800 bg-black font-mono text-xs text-blue-300">
                    0{i + 1}
                  </span>
                  <h3 className="font-semibold text-gray-200">{p.label}</h3>
                  <p className="font-serif text-sm leading-relaxed text-slate-400">{p.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="relative">
            <Reveal delay={phases.length * 80} className="h-full">
              <div className="flex h-full flex-col justify-center gap-2 rounded-2xl border border-blue-800 bg-blue-800/10 p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-blue-300/80">Honest caveat</p>
                <p className="font-serif text-sm leading-relaxed text-slate-300">
                  A reliable timeline needs a tested plan for your network. The
                  planner below gives an estimate — your migration engineer
                  refines it after reviewing your export.
                </p>
              </div>
            </Reveal>
          </li>
        </ol>
      </section>

      {/* =============================== PLANNER =============================== */}
      <section id="planner" className="mx-auto w-[90%] scroll-mt-24 py-20">
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Plan your move</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Answer four questions. Get a phased plan.</h2>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Answer four questions and get a phased migration plan with a timeline estimate.
          </p>
        </Reveal>
        <Reveal>
          <SwitchPlanner />
        </Reveal>
      </section>

      {/* ================================ GUIDES ================================ */}
      <section className="mx-auto w-[90%] py-20">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Switching from…</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">A guide for every system.</h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 80}>
              <Link
                href={g.href}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-800"
              >
                <div>
                  <h3 className="font-semibold text-gray-200 group-hover:text-white">{g.title}</h3>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">{g.text}</p>
                </div>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors group-hover:text-blue-400">
                  {g.linkLabel}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================= FAQ ================================= */}
      <section className="mx-auto w-[90%] max-w-3xl py-20">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">FAQ</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Questions about switching</h2>
        </Reveal>

        <Reveal>
          <div className="border-t border-slate-800">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-slate-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-gray-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 flex-none text-slate-500 transition-transform duration-300 group-open:rotate-45 group-open:text-blue-500" />
                </summary>
                <p className="pb-5 pr-10 font-serif text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================= CTA ================================= */}
      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Ready to <span className="text-blue-800">switch?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              14 days free. Move at your own pace.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-slate-700 p-4 px-6 text-white backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                <Mail className="size-5" />
                Talk to us about your migration
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
