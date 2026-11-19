import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Markdown from "@/components/ui/Markdown";
import { glossary } from "@/lib/content/glossary";

export const metadata: Metadata = {
  title: "ISP glossary | Learn",
  description: "Short definitions of ISP terms with links to full guides.",
};

export default function GlossaryPage() {
  const slugFor = new Map(glossary.map((g) => [g.term.toLowerCase(), g.slug]));
  const letters = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

  return (
    <main className="min-h-screen w-full bg-black px-4 pb-20 pt-32 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/resources/learn"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="size-3.5" /> Learn
        </Link>

        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-blue-400">Glossary</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            ISP terms, <span className="text-blue-800">explained.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-lg text-slate-400">
            {glossary.length} short definitions with links to full guides.
          </p>
        </Reveal>

        <nav aria-label="Glossary index" className="mt-8 flex flex-wrap gap-2">
          {glossary.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="rounded-full border border-slate-800 px-3 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:border-blue-800 hover:text-white"
            >
              {g.term}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-6">
          {letters.map((letter) => (
            <div key={letter}>
              <p className="mb-3 font-ibmblockserif text-2xl font-extrabold text-blue-800">{letter}</p>
              <div className="flex flex-col gap-3">
                {glossary
                  .filter((g) => g.term[0].toUpperCase() === letter)
                  .map((g) => (
                    <details
                      key={g.slug}
                      id={g.slug}
                      className="group scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] open:border-slate-600"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="font-semibold text-gray-200 transition-colors group-hover:text-white">
                              {g.term}
                            </h2>
                            <p className="mt-1 font-serif text-sm leading-relaxed text-slate-400">
                              {g.definition}
                            </p>
                          </div>
                          <ArrowRight className="mt-1 size-4 flex-none text-slate-500 transition-transform duration-300 group-open:rotate-90" />
                        </div>
                      </summary>
                      <div className="border-t border-slate-800 px-5 pb-5 pt-2">
                        <Markdown text={g.body} />
                        {g.relatedTerms.length > 0 && (
                          <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                            Related:
                            {g.relatedTerms.map((t) => {
                              const s = slugFor.get(t.toLowerCase());
                              return s ? (
                                <a
                                  key={t}
                                  href={`#${s}`}
                                  className="rounded-full border border-slate-700 px-2.5 py-1 text-blue-400 transition-colors hover:border-blue-800 hover:text-white"
                                >
                                  {t}
                                </a>
                              ) : (
                                <span key={t} className="text-slate-500">{t}</span>
                              );
                            })}
                          </p>
                        )}
                      </div>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
