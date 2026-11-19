import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Eye, FileLock2, KeyRound, ShieldCheck, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Security & trust | DataRadius",
  description:
    "How DataRadius protects workspace and subscriber data: encryption, tenant isolation, access control and transparency.",
};

const measures = [
  { icon: FileLock2, title: "Encryption everywhere", text: "Traffic is encrypted in transit and workspace data encrypted at rest. Subscriber credentials are stored hashed, never in plaintext." },
  { icon: Users, title: "Tenant isolation", text: "Every workspace is isolated at the database level. A query in your workspace cannot reach another provider's data by construction, not by convention." },
  { icon: KeyRound, title: "Least-privilege access", text: "Staff access to production data is logged, time-boxed and requires a reason. Workspace owners can see audit events on their own data." },
  { icon: ShieldCheck, title: "Payments held to standard", text: "Card details never touch our servers; they go straight to the payment processor. M-Pesa callbacks are validated by signature and amount." },
  { icon: Eye, title: "Transparent sub-processors", text: "Every third party that can touch workspace data is listed publicly, with notice before changes." },
  { icon: Activity, title: "Status in the open", text: "Platform availability and incidents are published on the status page, not disclosed after the fact." },
];

export default function TrustPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Security &amp; trust</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Your subscribers&apos; data, protected like it&apos;s ours.
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-slate-400">
            The commitments behind the service, in plain terms. Legal details
            live in the <Link href="/legal/privacy" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">privacy policy</Link> and{" "}
            <Link href="/legal/dpa" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">data processing addendum</Link>.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {measures.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.title} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-6">
                  <span className="grid size-10 place-items-center rounded-lg bg-blue-800/30 text-blue-400">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="font-semibold text-gray-200">{m.title}</h2>
                  <p className="font-serif text-sm leading-relaxed text-slate-400">{m.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div>
              <h2 className="font-semibold text-gray-200">Found a vulnerability?</h2>
              <p className="mt-1 font-serif text-sm text-slate-400">
                Report it to security@dataradius.net. We acknowledge reports within 48 hours.
              </p>
            </div>
            <Link
              href="/status"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-blue-400"
            >
              <span className="size-2 rounded-full bg-emerald-500" /> System status
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
