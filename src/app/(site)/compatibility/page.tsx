import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Plus } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import CompatibilityChecker from "@/components/pages/compatibility/CompatibilityChecker";
import { CATEGORY_LABELS, getCompatibilityByCategory } from "@/lib/content/compatibility";

export const metadata: Metadata = {
  title: "Compatibility checker — DataRadius",
  description:
    "Check whether your routers, OLTs, payment providers and messaging services work with DataRadius. Request support for unlisted devices.",
};

const faqs: { q: string; a: string }[] = [
  { q: "How do I connect my MikroTik router?", a: "Enter your router's identity in DataRadius. The router connects through an outbound tunnel — no public IP or port forwarding needed." },
  { q: "Which OLT vendors can I monitor?", a: "Hioso OLTs have full support. Huawei, ZTE, BDCOM, VSOL and C-Data OLTs work for SNMP monitoring today, with native provisioning on the roadmap." },
  { q: "Can I use multiple payment providers at once?", a: "Yes. Enable the providers your customers use — card payments through Stripe, mobile money through M-Pesa or Paystack, and manual payments for cash or bank transfers." },
  { q: "What if my device is not listed?", a: "Send a request using the form above. We add support based on demand and can often ship new integrations within weeks." },
];

export default function CompatibilityPage() {
  const groups = getCompatibilityByCategory();

  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">For internet service providers</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Will it work with <span className="text-blue-800">your gear?</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Check routers, OLTs, payment providers and messaging services. If
            yours is missing, tell us and we will prioritise it.
          </p>
          <Link
            href="/signup"
            className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
          >
            Start free
            <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* ============================== CHECKER ============================== */}
      <section className="mx-auto w-[90%] max-w-4xl py-16">
        <Reveal>
          <CompatibilityChecker />
        </Reveal>
      </section>

      {/* ============================= CATEGORIES ============================= */}
      <section className="mx-auto w-[90%] py-10">
        <Reveal>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g.category} className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <dt className="font-semibold text-gray-200">{g.label ?? CATEGORY_LABELS[g.category]}</dt>
                <dd className="mt-2 font-serif text-sm text-slate-400">
                  {g.entries.filter((e) => e.status === "live").length} live ·{" "}
                  {g.entries.filter((e) => e.status === "live_with_limits").length} with limits ·{" "}
                  {g.entries.filter((e) => e.status === "planned").length} planned
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ============================== REQUEST ============================== */}
      <section className="mx-auto w-[90%] max-w-3xl py-16">
        <Reveal>
          <div className="rounded-3xl border border-blue-800 bg-blue-800/10 p-8 text-center md:p-10">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">Don&apos;t see your device or provider?</h2>
            <p className="mx-auto mt-3 max-w-lg font-serif text-slate-400">
              Tell us what you use. New integrations are prioritised by demand — every request counts.
            </p>
            <a
              href="mailto:hello@dataradius.net?subject=Compatibility%20request"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-blue-400 transition-colors hover:text-white"
            >
              <Mail className="size-4" />
              Request an integration
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ================================ FAQ ================================ */}
      <section className="mx-auto w-[90%] max-w-3xl py-20">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">FAQ</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">Common questions</h2>
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
              Your equipment. Your providers. <span className="text-blue-800">One system.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              14 days free. Connect your own routers and payment providers.
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
                Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
