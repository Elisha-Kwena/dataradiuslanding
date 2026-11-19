import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus, RefreshCw, Wrench } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import { changelog } from "@/lib/resourcesData";

export const metadata: Metadata = {
  title: "Changelog | What we shipped",
  description: "Product updates, new features and improvements to DataRadius.",
};

const sectionStyle: Record<string, { icon: typeof Plus; chip: string }> = {
  Added: { icon: Plus, chip: "bg-blue-800/20 text-blue-300" },
  Changed: { icon: RefreshCw, chip: "bg-amber-500/10 text-amber-300" },
  Fixed: { icon: Wrench, chip: "bg-emerald-500/10 text-emerald-300" },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">Changelog</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            What we <span className="text-blue-800">shipped.</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Product updates, new features and improvements to DataRadius.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] max-w-4xl py-16">
        <div className="flex flex-col gap-10">
          {changelog.map((entry, i) => (
            <Reveal key={entry.version} delay={Math.min(i, 3) * 80}>
              <article className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-lg bg-blue-800 px-2.5 py-1 font-mono text-xs font-semibold text-white">
                    v{entry.version}
                  </span>
                  <time dateTime={entry.date} className="font-mono text-xs text-slate-500">
                    {formatDate(entry.date)}
                  </time>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-200 md:text-2xl">
                  {entry.title}
                </h2>
                <p className="mt-2 font-serif text-slate-400">{entry.description}</p>

                <div className="mt-6 flex flex-col gap-5">
                  {entry.sections.map((s) => {
                    const style = sectionStyle[s.label];
                    const Icon = style.icon;
                    return (
                      <div key={s.label}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${style.chip}`}
                        >
                          <Icon className="size-3" />
                          {s.label}
                        </span>
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {s.items.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                              <span className="mt-2 size-1 flex-none rounded-full bg-slate-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-12 text-center">
            <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-4xl">
              Try the latest features <span className="text-blue-800">yourself.</span>
            </h2>
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Start 14-day free trial
              <ArrowRight className="transition-all duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
