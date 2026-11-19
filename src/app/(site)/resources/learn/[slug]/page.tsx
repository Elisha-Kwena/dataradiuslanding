import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Markdown from "@/components/ui/Markdown";
import { guides } from "@/lib/content/guides";

const TOPIC_LABELS: Record<string, string> = {
  business: "Business",
  billing: "Billing",
  networks: "Networks",
  fiber: "Fiber",
  wifi: "Wi-Fi",
};

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: `${g.title} | Learn`, description: g.description };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-20 pt-32 text-white">
      <Suspense fallback={<div className="mx-auto w-full max-w-3xl" />}>
        <GuideContent params={params} />
      </Suspense>
    </main>
  );
}

async function GuideContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();

  const idx = guides.indexOf(g);
  const next = guides[idx + 1] ?? null;

  return (
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href="/resources/learn"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="size-3.5" /> All guides
        </Link>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            {g.pillar && (
              <span className="rounded-full bg-blue-800/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                {TOPIC_LABELS[g.pillar] ?? g.pillar}
              </span>
            )}
            {g.updatedAt && (
              <span className="font-mono text-xs text-slate-600">
                Updated {formatDate(g.updatedAt)}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {g.title}
          </h1>
          <p className="mt-4 font-serif text-lg text-slate-400 md:text-xl">{g.description}</p>
        </Reveal>

        {g.quickAnswer && (
          <Reveal delay={100}>
            <div className="mt-8 rounded-2xl border border-blue-800 bg-blue-800/10 p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-blue-400">
                <Zap className="size-3.5" /> 30-second answer
              </p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-slate-200">
                {g.quickAnswer}
              </p>
            </div>
          </Reveal>
        )}

        {g.takeaways.length > 0 && (
          <Reveal delay={150}>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                Key takeaways
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {g.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <Check className="mt-0.5 size-4 flex-none text-blue-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="mt-10">
            <Markdown text={g.body} />
          </div>
        </Reveal>

        {g.faq.length > 0 && (
          <Reveal>
            <div className="mt-14">
              <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">
                Questions <span className="text-blue-800">people ask.</span>
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {g.faq.map((f) => (
                  <details
                    key={f.question}
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] open:border-slate-600"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-gray-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                      {f.question}
                      <ArrowRight className="size-4 flex-none text-slate-500 transition-transform duration-300 group-open:rotate-90" />
                    </summary>
                    <p className="border-t border-slate-800 px-5 py-4 font-serif text-sm leading-relaxed text-slate-400">
                      {f.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {g.sources.length > 0 && (
          <Reveal>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Sources</p>
              <ul className="mt-3 flex flex-col gap-2">
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <Link
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300"
                    >
                      {s.label}
                      <ExternalLink className="size-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {next && (
          <Reveal>
            <Link
              href={`/resources/learn/${next.slug}`}
              className="group mt-14 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-800"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  Next guide
                </p>
                <p className="mt-1 font-semibold text-gray-200 group-hover:text-white">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="size-5 flex-none text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400" />
            </Link>
          </Reveal>
        )}
      </article>
  );
}
