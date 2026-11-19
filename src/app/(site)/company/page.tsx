import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Company — DataRadius",
  description:
    "DataRadius builds the software internet providers use to run their business. What it does, who it serves, the live numbers, how it ships, and how to reach us.",
};

const reachLinks = [
  { label: "hello@dataradius.net", href: "mailto:hello@dataradius.net" },
  { label: "Contact form", href: "/contact" },
  { label: "Trust & security", href: "/trust" },
  { label: "Status", href: "/status" },
  { label: "Press & brand", href: "/brand" },
];

export default function CompanyPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Company</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            The software behind internet providers.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            DataRadius builds billing, network and field operations software so
            internet service providers can run their whole business from one
            system.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">What DataRadius does.</h2>
          <p className="mt-4 font-serif leading-relaxed text-slate-400">
            DataRadius is billing, subscriber management and network monitoring
            software for internet service providers. Subscribers pay through
            the payment methods available in their country, and DataRadius
            handles invoices, access control and collections automatically.
            One customer record connects billing, network, fiber, field teams
            and reporting.
          </p>
          <p className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-5 font-serif text-sm leading-relaxed text-slate-400">
            Billing and payments, Wi-Fi hotspot, customers and support, network
            and devices, fiber and outside plant, field and inventory, reports
            and finance — on one platform.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">How we work.</h2>
          <p className="mt-4 font-serif leading-relaxed text-slate-400">
            DataRadius ships continuously. Every release appears in the
            changelog with customer-facing notes, so providers always know what
            changed. Bug fixes and security patches ship the same day; features
            ship when they are ready, tested and documented.
          </p>
          <Link
            href="/changelog"
            className="group mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-400 transition-colors hover:text-white"
          >
            See the changelog
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">Where we are.</h2>
          <p className="mt-4 font-serif leading-relaxed text-slate-400">
            Used by internet providers across multiple countries. Delivered
            through a global CDN. Built by a distributed, remote-first company.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">Reach us.</h2>
          <p className="mt-4 font-serif leading-relaxed text-slate-400">
            Questions, partnerships or press inquiries — we reply within one
            business day.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {reachLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-slate-300 transition-colors hover:border-blue-800 hover:text-white"
                >
                  {l.label}
                  <ArrowRight className="size-4 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/status"
                className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-slate-300 transition-colors hover:border-blue-800 hover:text-white"
              >
                <Activity className="size-4 text-emerald-500" /> Live platform status
              </Link>
            </li>
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-12 text-center">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">
              Questions? Let&apos;s talk.
            </h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-slate-400">
              We reply within one business day.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Contact
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-1" />
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                Or start a free trial
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
