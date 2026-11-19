import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import { docs } from "@/lib/content/docs";

export const metadata: Metadata = {
  title: "Docs | Set up, configure and go live",
  description:
    "Step-by-step guides for connecting routers, accepting payments, customising your portal, migrating and managing your team.",
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function DocsPage() {
  const sections = [...new Set(docs.map((d) => d.section))];

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">Docs</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Set up, configure and <span className="text-blue-800">go live.</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Step-by-step guides for connecting routers, accepting payments,
            customising your portal, migrating and managing your team.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] max-w-5xl py-16">
        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section}>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                {section}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {docs
                  .filter((d) => d.section === section)
                  .map((d, i) => (
                    <Reveal key={d.slug} delay={(i % 2) * 80}>
                      <Link
                        href={`/docs/${d.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-800"
                      >
                        <h2 className="font-semibold text-gray-200 group-hover:text-white">
                          {d.title}
                        </h2>
                        <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-slate-400">
                          {d.description}
                        </p>
                        <div className="mt-6 flex items-center justify-between">
                          {d.updatedAt && (
                            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
                              Updated {formatDate(d.updatedAt)}
                            </span>
                          )}
                          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors group-hover:text-blue-400">
                            Read doc
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
