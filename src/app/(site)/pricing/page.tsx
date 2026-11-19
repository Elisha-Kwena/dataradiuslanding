import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Handshake, Mail, Plus, Receipt, Users, Wifi } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import PricingCalculator from "@/components/pages/pricing/PricingCalculator";
import { PRICING, WIFI_FEE_PCT } from "@/lib/pricingConfig";
import { CurrencyToggle, Money } from "@/contexts/PricingContext";

export const metadata: Metadata = {
  title: "Pricing — DataRadius",
  description:
    "Usage-based pricing for ISPs and hotspot operators. A small fee per active customer, a small share of Wi-Fi sales, and no contracts.",
};

/* ------------------------------ content ------------------------------ */
/* Copy from dataradius.net (apps/site pricing namespace). */

const unitDefinition =
  "An active customer is anyone with a broadband account (PPPoE, static IP or fixed wireless) that had service during the billing month. Suspended and expired accounts are not counted. Hotspot users who buy Wi-Fi passes are not customers — you pay a share of completed sales instead.";

const includedItems =
  "every module · unlimited routers · unlimited staff accounts · branded subscriber portal · captive portal designer · API and webhooks · data export (CSV, JSON) · daily backups · email support · onboarding help · mobile field app · reports and scheduled exports".split(" · ");

const guarantees = [
  "No contract — stop any time, and billing stops with you.",
  "Export everything — subscribers, payments, invoices, configuration — as CSV or JSON, whenever you want.",
  "Your first invoice arrives after a full calendar month of paid use, never mid-trial.",
];

const faqs: { q: string; a: string }[] = [
  { q: "How does the free trial work?", a: "Sign up and get full access to every feature for 14 days. No credit card required. At the end of the trial, your workspace and data stay — billing begins only when you choose to continue." },
  { q: "What counts as an active customer?", a: "Anyone with a broadband account (PPPoE, static IP or fixed wireless) that had service during the billing month. Suspended and expired accounts are not counted. Hotspot users who buy Wi-Fi passes are not customers — you pay a share of completed Wi-Fi sales instead." },
  { q: "How are Wi-Fi sales counted?", a: "Only completed payments through the captive portal count. Failed, reversed or refunded payments are excluded. The share applies to the amount your customer paid." },
  { q: "Which currencies can I pay in?", a: "DataRadius invoices in several currencies including USD, EUR, GBP, KES, ZAR and NGN. The pricing page shows rates in your local currency." },
  { q: "How do I pay DataRadius?", a: "You receive a monthly invoice for the previous month's usage. Payment methods depend on your region — card, bank transfer or mobile money — and are shown on your invoice." },
  { q: "Can I cancel anytime?", a: "Yes. There is no contract and no cancellation fee. Stop using the service and billing stops. Your data stays available for 90 days." },
  { q: "Do you help us move from our current system?", a: "Yes — we import your subscribers, plans and balances. You move routers one at a time, at your pace. Both systems can run side by side until you are ready." },
  { q: "Is my data mine? What if I leave?", a: "Yes. Export subscribers, payments, invoices and configuration as CSV or JSON at any time. Daily backups run automatically. If you cancel, your data is available for 90 days, then permanently deleted on request." },
];

/* ------------------------------ page ------------------------------ */

export default function PricingPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-32">
        <NetworkBackground />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <div className="flex size-6 items-center justify-center rounded-full bg-blue-800/20 p-1">
              <Wifi className="size-5 animate-pulse text-blue-600" />
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-white">Pricing</p>
          </div>

          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Start free. Pay only for{" "}
            <span className="text-blue-800">active customers.</span>
          </h1>

          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            No setup fee, no contract. One price per active customer, and a small share of Wi-Fi sales.
          </p>

          <CurrencyToggle />

          <div className="mt-4 grid w-full gap-4 text-left md:grid-cols-3">
            {[
              { icon: Users, label: <><Money of="subscriberRate" /></>, unit: "per active customer per month", text: "Broadband customers on monthly or recurring plans (PPPoE, static IP, fixed wireless). Suspended and expired accounts are not counted." },
              { icon: Wifi, label: <>{WIFI_FEE_PCT}%</>, unit: "of Wi-Fi sales", text: "Counted on completed payments through the captive portal. Failed, reversed or refunded payments are excluded." },
              { icon: Receipt, label: <Money of="monthlyMinimum" />, unit: "monthly minimum", text: "Minimum applied only when usage is lower, and never during the trial." },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.unit} delay={i * 100}>
                  <div className="group h-full rounded-2xl border border-slate-700 bg-black/70 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-blue-800">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                        <Icon className="size-5" />
                      </span>
                      <p className="font-mono text-xs text-slate-500">{c.unit}</p>
                    </div>
                    <p className="font-ibmblockserif text-4xl font-extrabold text-white">{c.label}</p>
                    <p className="mt-4 text-sm text-slate-400">{c.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              <p>Start {PRICING.trialDays}-day free trial</p>
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
            </Link>
            <a
              href="#calculator"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              Estimate your cost
            </a>
          </div>

          <p className="font-mono text-xs text-slate-500">
            14 days free · no card required · cancel anytime
          </p>
        </div>
      </section>

      {/* ========================= WHAT COUNTS ========================= */}
      <section className="mx-auto w-[90%] max-w-3xl py-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">What counts</p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-300">{unitDefinition}</p>
        </Reveal>
      </section>

      {/* ============================= ESTIMATOR ============================= */}
      <section id="calculator" className="mx-auto w-[90%] scroll-mt-24 py-20">
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">See the math</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Estimate your cost.</h2>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Enter your numbers. See what you keep after DataRadius.
          </p>
        </Reveal>
        <PricingCalculator />
      </section>

      {/* ============================== HOW BILLING ============================== */}
      <section className="mx-auto w-[90%] max-w-3xl py-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Billing</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">How DataRadius bills you.</h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            At the end of each calendar month, DataRadius counts your active broadband customers and completed Wi-Fi payments for that month. You receive one invoice for the previous month&apos;s usage, in your local currency.
          </p>
          <p className="mt-3 font-serif text-lg leading-relaxed text-slate-400">
            Payment methods depend on your region — card, bank transfer or mobile money. The method and due date are shown on your invoice.
          </p>
        </Reveal>
      </section>

      {/* =============================== INCLUDED =============================== */}
      <section className="mx-auto w-[90%] py-20">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Everything included</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">One price. The whole platform.</h2>
        </Reveal>

        <Reveal>
          <ul className="flex flex-wrap gap-3">
            {includedItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-300"
              >
                <Check aria-hidden className="size-4 flex-none text-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ============================== GUARANTEES ============================== */}
      <section className="mx-auto w-[90%] max-w-3xl py-20">
        <Reveal className="mb-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Guarantees</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Built around what ISPs worry about.</h2>
        </Reveal>
        <ul className="flex flex-col gap-5">
          {guarantees.map((g, i) => (
            <Reveal key={g} delay={i * 80}>
              <li className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <Check aria-hidden className="mt-0.5 size-5 flex-none text-blue-400" />
                <p className="font-serif leading-relaxed text-slate-300">{g}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ============================ DATA OWNERSHIP ============================ */}
      <section className="mx-auto w-[90%] max-w-3xl py-16">
        <Reveal>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 md:p-10">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">Your data stays yours.</h2>
            <p className="mt-4 font-serif leading-relaxed text-slate-400">
              Your subscriber records, payment history, invoices, router configurations and network maps belong to you. Export anything as CSV or JSON at any time. Daily backups run automatically. If you leave, your data is available for 90 days after cancellation, then permanently deleted on request.
            </p>
          </div>
        </Reveal>
      </section>

      {/* =========================== LARGER NETWORKS =========================== */}
      <section className="mx-auto w-[90%] py-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-blue-800 bg-blue-800/10 p-8 md:flex-row md:items-center md:p-10">
            <div className="flex items-start gap-5">
              <span className="grid size-12 flex-none place-items-center rounded-xl bg-blue-800 text-white">
                <Handshake className="size-6" />
              </span>
              <div>
                <h3 className="font-akhirtahun text-2xl font-extrabold md:text-3xl">Larger networks</h3>
                <p className="mt-2 max-w-xl font-serif text-slate-400">
                  Over 10,000 customers, several regions or special requirements? Talk to us about volume pricing.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group flex flex-none items-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Talk to sales
              <ArrowRight className="transition-all duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ================================ FAQ ================================ */}
      <section className="mx-auto w-[90%] max-w-3xl py-20">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">FAQ</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Frequently asked questions</h2>
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

      {/* ================================ CTA ================================ */}
      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Try DataRadius free for <span className="text-blue-800">14 days.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              Then pay only for active customers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                <p>Start free</p>
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-slate-700 p-4 px-6 text-white backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                <Mail className="size-5" />
                Talk to us
              </Link>
            </div>
            <p className="mt-6 font-mono text-xs text-slate-500">No card required · cancel anytime</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
