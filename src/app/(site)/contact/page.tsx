import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/pages/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact DataRadius",
  description:
    "Questions about DataRadius? Talk to our team. Email hello@dataradius.net or use the form; we reply within one business day.",
};

const topics = [
  { label: "Sales", body: "Running a larger network and want to see how DataRadius fits? Tell us about your setup and we'll walk you through a demo in your currency." },
  { label: "Support", body: "Already using DataRadius? Reach out about your workspace, including if you need your workspace address resent." },
  { label: "Partners & resellers", body: "Sell, install or bundle internet services? Let's talk about working together." },
  { label: "Switching from another system", body: "Already running an ISP on another platform? We assign a migration engineer, build a plan and move you without downtime." },
  { label: "Press & media", body: "Writing about ISP software or the internet access industry? We're happy to help with facts, quotes or background." },
];

const info = [
  { label: "Email", value: "hello@dataradius.net", href: "mailto:hello@dataradius.net" },
  { label: "WhatsApp", value: "Available on request" },
  { label: "Business hours", value: "Mon to Fri, 06:00 to 15:00 UTC", note: "We reply within one business day." },
  { label: "System status", value: "Status page", href: "/status" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Contact</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Talk to us.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            Sales, migration, support or press. We reply within one business day.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">How can we help?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <Reveal key={topic.label} delay={i * 60}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-950 p-6">
                  <h3 className="font-semibold text-gray-200">{topic.label}</h3>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">{topic.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[7fr_4fr] xl:gap-16">
            <div>
              <h2 className="mb-8 font-akhirtahun text-2xl font-extrabold sm:text-3xl">Send a message</h2>
              <ContactForm />
            </div>

            <aside className="mt-2 lg:mt-12">
              <div className="space-y-8 border-t border-slate-800 pt-8 lg:border-t-0 lg:pt-0">
                {info.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    {item.href ? (
                      item.href.startsWith("/") ? (
                        <Link href={item.href} className="group mt-1.5 inline-flex items-center gap-1.5 font-mono text-sm text-blue-400 transition-colors hover:text-white">
                          {item.value}
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <a href={item.href} className="mt-1.5 block font-mono text-sm text-blue-400 transition-colors hover:text-white">
                          {item.value}
                        </a>
                      )
                    ) : (
                      <p className="mt-1.5 font-serif text-sm text-slate-400">{item.value}</p>
                    )}
                    {item.note ? <p className="mt-0.5 font-serif text-xs text-slate-500">{item.note}</p> : null}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-10 text-center">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">Ready to get started?</h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-sm text-slate-400">
              14 days free. No card required. Cancel anytime.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-1" />
              </Link>
              <Link href="/demo" className="font-serif text-sm text-slate-400 transition-colors hover:text-white">
                Or explore the live product
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
