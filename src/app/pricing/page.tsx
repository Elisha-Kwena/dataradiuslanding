import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Braces,
  CalendarCheck,
  Cable,
  ChartColumn,
  CreditCard,
  DatabaseBackup,
  Download,
  DoorOpen,
  Globe,
  Handshake,
  Layers,
  LifeBuoy,
  Mail,
  Palette,
  Plus,
  Receipt,
  Router,
  Scale,
  ShieldCheck,
  Smartphone,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import PricingCalculator from "@/components/pages/pricing/PricingCalculator";
import { PRICING, WIFI_FEE_PCT } from "../../lib/pricingConfig";
import { CurrencyToggle, Money } from "@/contexts/PricingContext";

export const metadata: Metadata = {
  title: "Pricing | Pay only for customers you serve",
  description:
    "Usage-based pricing for ISPs and hotspot operators. A small fee per active customer, a small share of Wi-Fi sales, and no contracts.",
};

/* ------------------------------ content ------------------------------ */

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Activity, title: "Usage is counted", text: "All month long we count active customers and completed Wi-Fi payments. Nothing to configure." },
  { icon: CalendarCheck, title: "Month closes", text: "On the last day we freeze the numbers. Suspended and expired accounts are left out." },
  { icon: Receipt, title: "One invoice", text: "You get a single invoice for the month just finished, with every line explained." },
  { icon: CreditCard, title: "You pay your way", text: "Pay by M-Pesa, card or bank transfer. No surprise charges in between." },
];

const included: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Layers, title: "Every module", text: "Billing, network, fiber, hotspot, field and reports. Nothing locked behind a tier." },
  { icon: Router, title: "Unlimited routers", text: "Add as many sites and routers as you run." },
  { icon: Users, title: "Unlimited staff", text: "Give every technician and agent their own login." },
  { icon: Globe, title: "Branded subscriber portal", text: "Your name and colours on the page customers see." },
  { icon: Palette, title: "Captive portal designer", text: "Design the Wi-Fi login page from templates." },
  { icon: Cable, title: "Fiber tools", text: "OLTs, ONUs, power budgets and the plant map." },
  { icon: Smartphone, title: "Mobile field app", text: "Jobs, maps and installs in a technician's pocket." },
  { icon: ChartColumn, title: "Reports & exports", text: "Scheduled reports sent to the inbox that needs them." },
  { icon: Braces, title: "API & webhooks", text: "Connect your own tools to live events." },
  { icon: Download, title: "Data export", text: "Take everything out as CSV or JSON, any day." },
  { icon: DatabaseBackup, title: "Daily backups", text: "Automatic, with no setting to forget." },
  { icon: LifeBuoy, title: "Support & onboarding", text: "Email support and hands-on help getting your first router live." },
];

const worries: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "No surprise bills", text: "Only customers with service that month count. Suspended, expired and failed or refunded payments cost you nothing." },
  { icon: DoorOpen, title: "No lock-in", text: "Month-to-month with no contract and no cancellation fee. Export everything and leave whenever you like." },
  { icon: Scale, title: "Fair in slow months", text: "The platform grows with you and shrinks with you. The minimum only applies when your usage is lower than it." },
];

const faqs: { q: string; a: string }[] = [
  { q: "How does the free trial work?", a: `You get ${PRICING.trialDays} days with every feature and no card. Your workspace and data stay if you decide to continue. Billing starts only after a full calendar month of paid use, never mid-trial.` },
  { q: "What counts as an active customer?", a: "A broadband account that had service during the billing month: PPPoE, static IP or fixed wireless. Suspended and expired accounts do not count, and hotspot guests are not customers." },
  { q: "How are Wi-Fi sales counted?", a: "Only completed captive-portal payments. Failed, reversed and refunded payments are excluded, so you never pay a fee on money you did not collect." },
  { q: "How do I pay my invoice?", a: "You get one invoice at the end of each month, in your region's currency. Pay by mobile money, card or bank transfer." },
  { q: "Can I cancel any time?", a: "Yes. There is no contract and no cancellation fee. Your data stays available for 90 days after you leave, and you can ask us to delete it sooner." },
  { q: "Will you help me move from another system?", a: "Yes. We import your subscribers, plans and balances, and you move routers one at a time while both systems run side by side. Nothing has to go offline." },
  { q: "Who owns my data?", a: "You do. Export it as CSV or JSON whenever you want, and we back it up every day." },
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
              <p className="text-sm text-white">Simple, usage-based pricing</p>
            </div>

            <h1 className="font-akhirtahun text-5xl font-extrabold leading-[1.05] md:text-7xl">
              Pay for the customers
              <br />
              you <span className="text-blue-800">actually serve.</span>
            </h1>

            <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
              No tiers, no seats, no feature gates. Every module is included, and your bill follows your network.
            </p>

            <CurrencyToggle />

            <div className="mt-4 grid w-full gap-4 text-left md:grid-cols-3">
              {[
                { icon: Users, label: "Per active customer", price: <Money of="subscriberRate" />, unit: "/ month", text: "Broadband subscribers on recurring plans. Suspended and expired accounts are free." },
                { icon: Wifi, label: "Per Wi-Fi sale", price: <>{WIFI_FEE_PCT}%</>, unit: "of completed payments", text: "Only counted when the guest has paid. Failed and refunded payments cost nothing." },
                { icon: Receipt, label: "Monthly minimum", price: <Money of="monthlyMinimum" />, unit: "/ month", text: "Applied only when your usage comes in lower, and never during the trial." },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.label} delay={i * 100}>
                    <div className="group h-full rounded-2xl border border-slate-700 bg-black/70 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-blue-800">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                          <Icon className="size-5" />
                        </span>
                        <p className="text-sm text-slate-400">{c.label}</p>
                      </div>
                      <p className="font-ibmblockserif text-4xl font-extrabold text-white">{c.price}</p>
                      <p className="mb-4 font-mono text-xs text-slate-500">{c.unit}</p>
                      <p className="text-sm text-slate-400">{c.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <p className="font-mono text-xs text-slate-500">
              One-time activation <Money of="activationFee" /> after your trial: nothing else to set up.
            </p>

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
                Estimate your bill
              </a>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <li>No card required</li>
              <li>Cancel any time</li>
              <li>Export everything</li>
            </ul>
          </div>
        </section>

        {/* ============================= CALCULATOR ============================= */}
        <section id="calculator" className="mx-auto w-[90%]  scroll-mt-24 py-20">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Estimate your cost</p>
            <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Move the sliders. Watch the invoice.</h2>
            <p className="mt-4 text-lg text-slate-400">
              Pick a typical profile or enter your own numbers. The invoice and the math update as you go.
            </p>
          </Reveal>
          <PricingCalculator />
        </section>

        {/* ============================== HOW BILLING ============================== */}
        <section className="mx-auto w-[90%] py-20">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">How you are billed</p>
            <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">One invoice, once a month.</h2>
          </Reveal>

          <ol className="relative grid gap-6 md:grid-cols-4">
            {/* connector line behind the numbered badges (desktop only) */}
            <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-slate-800 md:block" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative">
                  <Reveal delay={i * 120} className="h-full">
                    <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 pt-10 transition duration-300 hover:border-blue-800">
                      <span className="absolute left-6 top-0 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-blue-800 bg-black font-mono text-sm text-blue-300">
                        0{i + 1}
                      </span>
                      <Icon className="size-6 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-200">{s.title}</h3>
                      <p className="text-sm text-slate-400">{s.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* =============================== INCLUDED =============================== */}
        <section className="mx-auto w-[90%] py-20">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Everything included</p>
            <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">One price. The whole platform.</h2>
            <p className="mt-4 text-lg text-slate-400">
              Whether you have fifty customers or five thousand, you get the same product.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <div className="group flex h-full gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-800">
                    <span className="grid size-10 flex-none place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-200">{f.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============================= INTEGRATIONS ============================= */}
        <Marquee />

        {/* ============================== WORRIES ============================== */}
        <section className="mx-auto w-[90%] py-20">
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">Built for ISP owners</p>
            <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Designed around what keeps you up at night.</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {worries.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={i * 120}>
                  <div className="h-full rounded-3xl border border-slate-800 bg-slate-950 p-8 transition duration-300 hover:border-blue-800">
                    <Icon className="mb-6 size-8 text-blue-500" />
                    <h3 className="mb-3 text-xl font-semibold text-gray-200">{w.title}</h3>
                    <p className="text-slate-400">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
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
                  <h3 className="font-akhirtahun text-2xl font-extrabold md:text-3xl">Running a larger network?</h3>
                  <p className="mt-2 max-w-xl text-slate-400">
                    Past {PRICING.customersMax.toLocaleString("en-US")} customers, several regions or special requirements? We offer volume pricing and a dedicated onboarding plan.
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
                  <p className="pb-5 pr-10 text-slate-400">{f.a}</p>
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
                Connect your first router <span className="text-blue-800">today.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
                {PRICING.trialDays} days free, no card, and hands-on help moving over.
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
              <p className="mt-6 font-mono text-xs text-slate-500">No card required · cancel any time</p>
            </div>
          </Reveal>
        </section>
      </main>
  );
}