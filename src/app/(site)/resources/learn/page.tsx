import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import GuideGrid from "@/components/pages/learn/GuideGrid";
import { guides } from "@/lib/content/guides";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Plain-English guides for ISP owners and engineers — billing, networks, fiber, Wi-Fi and growth. Every section opens with a one-sentence answer.",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32">
        <NetworkBackground />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">Learn</p>
          </div>
          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            Answers first, then <span className="text-blue-800">the detail.</span>
          </h1>
          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            Plain-English guides for ISP owners and engineers — billing,
            networks, fiber, Wi-Fi and growth. Every section opens with a
            one-sentence answer.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[90%] py-16">
        <GuideGrid guides={guides} />

        <Reveal>
          <Link
            href="/resources/learn/glossary"
            className="group mt-12 flex flex-col items-start gap-4 rounded-2xl border border-blue-800 bg-blue-800/10 p-6 transition-colors hover:border-blue-600 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-10 flex-none place-items-center rounded-lg bg-blue-800 text-white">
                <BookOpen className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-gray-200">ISP glossary</h2>
                <p className="mt-1 font-serif text-sm text-slate-400">
                  Short definitions of ISP terms with links to full guides.
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-400 transition-colors group-hover:text-white">
              Open glossary
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Put what you learned into <span className="text-blue-800">practice.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              14 days free. No credit card required.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
