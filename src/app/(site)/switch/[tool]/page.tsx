import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Pause } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { switchTools } from "@/lib/content/switchTools";

export function generateStaticParams() {
  return switchTools.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const t = switchTools.find((x) => x.slug === tool);
  if (!t) return {};
  return { title: `${t.heroTitle} | DataRadius`, description: t.heroSub };
}

export default function SwitchToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <Suspense fallback={<div className="mx-auto w-full max-w-3xl" />}>
        <ToolContent params={params} />
      </Suspense>
    </main>
  );
}

async function ToolContent({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const t = switchTools.find((x) => x.slug === tool);
  if (!t) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Reveal>
        <Link
          href="/switch"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="size-3.5" /> Switch to DataRadius
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-blue-400">
          {t.lastVerified}
        </p>
        <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
          {t.heroSub}
        </p>
        <p className="mt-6 border-l-2 border-slate-800 pl-4 font-serif text-sm leading-relaxed text-slate-500">
          {t.entity}
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="font-semibold text-gray-200">{t.movesTitle}</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">{t.movesIntro}</p>
        <dl className="mt-6 flex flex-col gap-3">
          {t.moves.map((m) => (
            <div key={m.field} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <dt className="flex items-center gap-2.5 font-semibold text-gray-200">
                <Check aria-hidden className="size-4 flex-none text-blue-500" />
                {m.field}
              </dt>
              <dd className="mt-2 pl-6.5 font-serif text-sm leading-relaxed text-slate-400">{m.detail}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="font-semibold text-gray-200">{t.timelineTitle}</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">{t.timelineIntro}</p>
        <ol className="mt-6 flex flex-col gap-4">
          {t.steps.map((s, i) => (
            <li key={s.label} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <span className="grid size-8 flex-none place-items-center rounded-full border border-blue-800 font-mono text-xs text-blue-300">
                {i + 1}
              </span>
              <div className="pt-0.5">
                <h3 className="font-semibold text-gray-200">{s.label}</h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-slate-400">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="font-semibold text-gray-200">{t.checklistTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.checklist.map((c) => (
                <li key={c} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                  <Check aria-hidden className="mt-0.5 size-4 flex-none text-emerald-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex h-full flex-col rounded-2xl border border-amber-900/40 bg-slate-950 p-6">
            <h2 className="font-semibold text-gray-200">{t.stayTitle}</h2>
            <p className="mt-2 font-serif text-xs leading-relaxed text-slate-500">{t.stayIntro}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.stayReasons.map((r) => (
                <li key={r} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                  <Pause aria-hidden className="mt-0.5 size-3.5 flex-none text-amber-500" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h2 className="font-semibold text-gray-200">Questions</h2>
        <div className="mt-4 border-t border-slate-800">
          {t.faq.map((f) => (
            <details key={f.q} className="group border-b border-slate-800">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-[15px] font-medium text-gray-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="size-2 flex-none rounded-full bg-slate-700 transition group-open:bg-blue-500" />
              </summary>
              <p className="pb-5 pr-10 font-serif text-sm leading-relaxed text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      {t.sources.length > 0 && (
        <Reveal className="mt-12">
          <h2 className="font-semibold text-gray-200">Sources</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            {t.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-serif text-sm text-slate-500 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-blue-400"
                >
                  {s.label}
                  <ExternalLink className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Reveal className="mt-14">
        <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-12 text-center">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">
            {t.closeTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-slate-400">
            {t.closeReassurance}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Start free
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              Talk to us about your migration
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <p className="font-serif text-xs leading-relaxed text-slate-600">
          {t.trademark}
          <br />
          {t.correction}
        </p>
      </Reveal>
    </div>
  );
}
