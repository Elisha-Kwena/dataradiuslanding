import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight, Check, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Trust and security | DataRadius",
  description:
    "How DataRadius keeps your ISP online and your data under your control: availability, exports, backups, access controls and privacy.",
};

const dataItems = [
  "Export any record, any time, in CSV or JSON.",
  "Request full deletion of your workspace and all its data.",
  "Data is stored in a professionally managed data centre with encrypted storage and encrypted connections.",
  "Cancel and your data stays accessible for 90 days. After that it is deleted unless you ask us to keep it.",
];

const accessItems = [
  "Role-based permissions control what each person can see and change.",
  "Two-factor sign-in with a time-based code is available for every account.",
  "An append-only audit log records who did what, when and to which record. Entries cannot be edited or deleted.",
  "Each workspace is fully separated. Database-enforced rules ensure one ISP never sees another's subscribers, payments or devices.",
  "An auditor workspace gives read-only access to billing, payments and compliance records without touching live operations.",
];

const complianceLinks = [
  { label: "Data processing agreement", href: "/legal/dpa" },
  { label: "Sub-processors", href: "/legal/sub-processors" },
  { label: "Privacy policy", href: "/legal/privacy" },
];

function Section({
  title,
  body,
  items,
  links,
}: {
  title: string;
  body: string;
  items?: string[];
  links?: { label: string; href: string }[];
}) {
  return (
    <Reveal>
      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
        <h2 className="font-akhirtahun text-xl font-extrabold sm:text-2xl">{title}</h2>
        <p className="mt-3 font-serif text-sm leading-relaxed text-slate-400 sm:text-[15px]">{body}</p>
        {items && (
          <ul className="mt-5 flex flex-col gap-2.5">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                <Check aria-hidden className="mt-0.5 size-4 flex-none text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {links && (
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-blue-400 transition-colors hover:text-white"
              >
                {l.label}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </Reveal>
  );
}

export default function TrustPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Trust</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Built for systems that can&apos;t go down.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            Your subscribers depend on your network. DataRadius protects their
            data, keeps your billing running and puts you in control of
            everything you store with us.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5">
          <Section
            title="Always visible, always accountable."
            body="The public status page shows live system health and a 90-day history of every incident: what happened, when it was resolved and what changed. You never have to ask whether DataRadius is up."
            links={[{ label: "View status page", href: "/status" }]}
          />

          <Section
            title="Your data is yours."
            body="Subscribers, invoices, payments, device records: export everything at any time in CSV or JSON. No waiting on support, no fee, no lock-in."
            items={dataItems}
          />

          <Section
            title="Access only where it belongs."
            body="Every team member gets exactly the permissions they need: nothing more."
            items={accessItems}
          />

          <Section
            title="Backups run every day."
            body="Automated daily backups are encrypted and stored separately from the primary database. Point-in-time recovery restores to any second within the previous hour. Target recovery time after a major failure: 30 minutes. Every connection to DataRadius is encrypted. Credentials, secrets and sensitive fields are encrypted before they are written to the database."
          />

          <Section
            title="Compliance and roadmap."
            body="DataRadius publishes what it can today: a data processing agreement, a sub-processor list, a privacy policy and a vulnerability disclosure process. The marketing site uses cookie-free analytics: no consent banner required. Formal third-party security auditing is planned; dates and results will appear here as they happen."
            links={complianceLinks}
          />

          <Section
            title="Privacy and data processing."
            body="DataRadius acts as a data processor; your ISP is the data controller. You control how subscriber data is collected, stored and used. DataRadius processes it on your behalf under the terms of the data processing agreement."
          />

          <Reveal>
            <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
              <div>
                <h2 className="font-akhirtahun text-xl font-extrabold sm:text-2xl">Report a vulnerability.</h2>
                <p className="mt-2 font-serif text-sm text-slate-400">
                  Found a security issue? Reports are acknowledged within two business days.
                </p>
              </div>
              <a
                href="mailto:security@dataradius.net"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:border-blue-800 hover:text-white"
              >
                <Mail className="size-4" /> security@dataradius.net
              </a>
            </section>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-10 text-center">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">
              Run your whole ISP on DataRadius.
            </h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-sm text-slate-400">
              Free for 14 days. Then pay only for active customers.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                <Activity className="size-4" /> Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
