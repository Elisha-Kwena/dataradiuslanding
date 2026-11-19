import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Eye } from "lucide-react";
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
  return {
    title: `Switch from ${t.name} | DataRadius`,
    description: t.tagline,
  };
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
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" /> Switch to DataRadius
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-blue-400">
          Switching from {t.name}
        </p>
        <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          Move from {t.name} to DataRadius.
        </h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
          {t.tagline} Subscribers stay online throughout: both systems run side
          by side until the numbers match.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="font-semibold text-gray-200">What moves</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.moves.map((m) => (
                <li key={m} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                  <Check aria-hidden className="mt-0.5 size-4 flex-none text-blue-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="font-semibold text-gray-200">What to check</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {t.watch.map((w) => (
                <li key={w} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                  <Eye aria-hidden className="mt-0.5 size-4 flex-none text-amber-500" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <h2 className="font-semibold text-gray-200">How the move runs</h2>
        <ol className="mt-6 flex flex-col gap-4">
          {t.steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <span className="grid size-8 flex-none place-items-center rounded-full border border-blue-800 font-mono text-xs text-blue-300">
                {i + 1}
              </span>
              <p className="pt-1 font-serif text-sm leading-relaxed text-slate-400">{s}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-14">
        <div className="rounded-3xl border border-slate-700 bg-slate-950 px-6 py-12 text-center">
          <h2 className="font-akhirtahun text-2xl font-extrabold sm:text-3xl">
            Ready to leave {t.name}?
          </h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-slate-400">
            Start the trial, connect one router, and see your subscribers in
            DataRadius before you commit to anything.
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
              href="/switch"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              How switching works
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
