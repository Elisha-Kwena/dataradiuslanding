import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Markdown from "@/components/ui/Markdown";
import { docs } from "@/lib/content/docs";

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = docs.find((x) => x.slug === slug);
  if (!d) return {};
  return { title: `${d.title} | Docs`, description: d.description };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-20 pt-32 text-white">
      <Suspense fallback={<div className="mx-auto w-full max-w-3xl" />}>
        <DocContent params={params} />
      </Suspense>
    </main>
  );
}

async function DocContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = docs.find((x) => x.slug === slug);
  if (!d) notFound();

  const idx = docs.indexOf(d);
  const next = docs[idx + 1] ?? null;

  return (
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href="/docs"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="size-3.5" /> Docs
        </Link>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-800/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-300">
              {d.section}
            </span>
            {d.updatedAt && (
              <span className="font-mono text-xs text-slate-600">
                Updated {formatDate(d.updatedAt)}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {d.title}
          </h1>
          <p className="mt-4 font-serif text-lg text-slate-400 md:text-xl">{d.description}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10">
            <Markdown text={d.body} />
          </div>
        </Reveal>

        {next && (
          <Reveal>
            <Link
              href={`/docs/${next.slug}`}
              className="group mt-14 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-800"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  Next: {next.section}
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
