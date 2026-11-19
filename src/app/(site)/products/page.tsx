import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import RoleSwitcher from "@/components/pages/products/RoleSwitcher";

export const metadata: Metadata = {
  title: "ISP management software — DataRadius",
  description:
    "Billing, network devices, fiber, Wi-Fi hotspot, field teams and subscribers — one system for every role in your ISP.",
};

/* ------------------------------ content ------------------------------ */

const automations: { title: string; text: string }[] = [
  { title: "Payment → reconnect", text: "A subscriber pays. The account is credited, the router restores access and the receipt is sent: in seconds." },
  { title: "Non-payment → disconnect", text: "Invoice overdue past the grace period. Access is suspended automatically; the subscriber is told why and how to pay." },
  { title: "New subscriber → provisioned", text: "A new sign-up creates the account, provisions the router, generates the first invoice and sends a welcome message." },
  { title: "Outage → customers notified", text: "A router or fiber link goes down. Every affected subscriber gets an SMS or WhatsApp message within minutes." },
  { title: "Outage → credits applied", text: "When service is restored, lost time is calculated and credited to each affected account automatically." },
  { title: "Outage → repair dispatched", text: "A fiber cut creates a work order, assigns a technician and sends the job to their phone." },
  { title: "Router brownout → reprovisioned", text: "If a router stops responding, DataRadius detects it, waits for recovery and re-pushes the configuration." },
  { title: "Voucher purchase → access granted", text: "A hotspot customer buys a voucher. The code is generated, access is granted and the sale is recorded." },
  { title: "Invoice cycle → generated", text: "On the billing date, invoices are generated for every active subscriber and sent via their preferred channel." },
  { title: "Expiry warning → sent", text: "Subscribers approaching plan expiry get a reminder at D-5 and D-1 so they can renew before losing access." },
  { title: "Health check → alert", text: "Every router runs a periodic health check. Anomalies trigger alerts to the staff contact group on duty." },
  { title: "Month-end → reconciled", text: "At month close, revenue, collections and outstanding balances are reconciled automatically for the finance report." },
];

/* ------------------------------ page ------------------------------ */

export default function ProductsPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-32">
        <NetworkBackground />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">Product</p>
          </div>

          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            See every part of your <span className="text-blue-800">ISP.</span>
          </h1>

          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Billing, routers, fiber, hotspots, technicians and subscribers in
            one place. Pick a role to see what matters to you.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Start 14-day free trial
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
            </Link>
            <a
              href="#roles"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              See by role ↓
            </a>
          </div>
        </div>
      </section>

      {/* ============================== ROLE SWITCHER ============================== */}
      <section id="roles" className="mx-auto w-[90%] scroll-mt-24 py-20">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">One system, every role</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Everyone sees what they need.</h2>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Nothing they don&apos;t. Pick a role to see the modules that matter.
          </p>
        </Reveal>
        <Reveal>
          <RoleSwitcher />
        </Reveal>
      </section>

      {/* ============================== AUTOMATIONS ============================== */}
      <section className="mx-auto w-[90%] py-20">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">What runs on its own</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Twelve things it does for you.</h2>
          <p className="mt-4 font-serif text-lg text-slate-400">
            No manual step. Every one is live today.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {automations.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl border border-slate-800 bg-slate-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-800">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 flex-none place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                    <Zap className="size-4" />
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-gray-200">{a.title}</h3>
                </div>
                <p className="mt-3 font-serif text-sm leading-relaxed text-slate-400">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================== AI BAND ============================== */}
      <section className="mx-auto w-[90%] py-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-blue-800 bg-blue-800/10 p-8 md:flex-row md:items-center md:p-10">
            <div className="flex items-start gap-5">
              <span className="grid size-12 flex-none place-items-center rounded-xl bg-blue-800 text-white">
                <Sparkles className="size-6" />
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-akhirtahun text-2xl font-extrabold md:text-3xl">AI that learns your network.</h3>
                  <span className="rounded-full border border-blue-700 bg-blue-800/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                    Coming
                  </span>
                </div>
                <p className="mt-2 max-w-xl font-serif text-slate-400">
                  We are building AI capabilities that predict outages, suggest
                  optimal plans for subscribers and automate routine support
                  responses. Request early access when you sign up.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================ CTA ================================ */}
      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Start free. See every part of your ISP in <span className="text-blue-800">one place.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              14 days free · No credit card · Free help moving
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
                href="/#live-demo"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-slate-700 p-4 px-6 text-white backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                <Play className="size-5" />
                Explore the live product
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
