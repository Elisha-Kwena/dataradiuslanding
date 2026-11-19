import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight, Clock, Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact DataRadius",
  description:
    "Questions about DataRadius? Talk to our team. Email hello@dataradius.net; we reply within one business day.",
};

const topics = [
  { label: "Sales", body: "Running a larger network and want to see how DataRadius fits? Tell us about your setup and we'll walk you through a demo in your currency." },
  { label: "Support", body: "Already using DataRadius? Reach out about your workspace, including if you need your workspace address resent." },
  { label: "Partners & resellers", body: "Sell, install or bundle internet services? Let's talk about working together." },
  { label: "Switching from another system", body: "Already running an ISP on another platform? We assign a migration engineer, build a plan and move you without downtime." },
  { label: "Press & media", body: "Writing about ISP software or the internet access industry? We're happy to help with facts, quotes or background." },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Contact</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Talk to us.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            Sales, migration, support or press. We reply within one business day.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-semibold text-gray-200">How can we help?</h2>
          <div className="mt-5 flex flex-col gap-4">
            {topics.map((topic, i) => (
              <Reveal key={topic.label} delay={i * 60}>
                <a
                  href={`mailto:hello@dataradius.net?subject=${encodeURIComponent(topic.label)}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-blue-800"
                >
                  <div>
                    <h3 className="font-semibold text-gray-200 group-hover:text-white">{topic.label}</h3>
                    <p className="mt-1.5 font-serif text-sm leading-relaxed text-slate-400">{topic.body}</p>
                  </div>
                  <ArrowRight className="size-4 flex-none self-center text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400" />
                </a>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 flex-none text-blue-400" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Email</p>
                <a href="mailto:hello@dataradius.net" className="mt-1 block font-mono text-sm text-blue-400 transition-colors hover:text-white">
                  hello@dataradius.net
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle aria-hidden className="mt-0.5 size-4 flex-none text-blue-400" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">WhatsApp</p>
                <p className="mt-1 font-serif text-sm text-slate-400">Available on request</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock aria-hidden className="mt-0.5 size-4 flex-none text-blue-400" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Business hours</p>
                <p className="mt-1 font-mono text-sm text-slate-300">Mon to Fri, 06:00 to 15:00 UTC</p>
                <p className="mt-0.5 font-serif text-xs text-slate-500">We reply within one business day.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Activity aria-hidden className="mt-0.5 size-4 flex-none text-blue-400" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">System status</p>
                <Link href="/status" className="group mt-1 inline-flex items-center gap-1.5 font-mono text-sm text-blue-400 transition-colors hover:text-white">
                  Status page
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-10 text-center">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">Ready to get started?</h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-sm text-slate-400">
              14 days free. No card required. Cancel anytime.
            </p>
            <Link
              href="/signup"
              className="group mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Start free
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
