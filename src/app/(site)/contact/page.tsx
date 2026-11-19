import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Mail, MessageSquare } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact | DataRadius",
  description: "Talk to the DataRadius team: sales, support and migration help.",
};

const channels = [
  {
    icon: Mail,
    title: "Sales",
    email: "sales@dataradius.net",
    text: "Pricing, trials, demos and which plan fits your subscriber count.",
  },
  {
    icon: MessageSquare,
    title: "Support",
    email: "support@dataradius.net",
    text: "Technical help with your workspace, routers, payments or imports. Replies within one business day.",
  },
  {
    icon: BookOpen,
    title: "Migration",
    email: "migrate@dataradius.net",
    text: "Moving from Splynx, UISP, Mikhmon, Sonar or spreadsheets: a migration engineer answers here.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Contact</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Talk to a person.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            Pick the address that matches what you need. Every inbox is read by
            the team that ships the product.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <a
                  href={`mailto:${c.email}`}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-blue-800"
                >
                  <span className="grid size-11 flex-none place-items-center rounded-xl bg-blue-800/30 text-blue-400 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-200 group-hover:text-white">{c.title}</h2>
                    <p className="mt-1 font-serif text-sm leading-relaxed text-slate-400">{c.text}</p>
                    <p className="mt-2 font-mono text-sm text-blue-400">{c.email}</p>
                  </div>
                  <ArrowRight className="ml-auto size-4 flex-none self-center text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400" />
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <p className="font-serif text-sm text-slate-500">
            Prefer self-service? The <Link href="/docs" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">documentation</Link> and{" "}
            <Link href="/resources/learn" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">learn guides</Link>{" "}
            answer most setup questions.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
