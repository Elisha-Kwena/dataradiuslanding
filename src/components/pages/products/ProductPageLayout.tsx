import Link from "next/link";
import { ArrowRight, Check, Play, Plus } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";
import type { ProductPageData } from "@/lib/productPages";

const mono = "font-mono text-[10px] tracking-wider";

export default function ProductPageLayout({ data }: { data: ProductPageData }) {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* =============================== HERO =============================== */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-32">
        <NetworkBackground />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex w-fit items-center gap-2 rounded-full bg-blue-800/30 p-2 pr-4">
            <p className="px-2 font-mono text-xs uppercase tracking-widest text-white">{data.eyebrow}</p>
          </div>

          <h1 className="font-akhirtahun text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
            {data.heroTitle}{" "}
            <span className="text-blue-800">{data.heroAccent}</span>
          </h1>

          <p className="max-w-2xl font-serif text-xl text-slate-400 md:text-2xl">
            {data.heroSub}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              Start 14-day free trial
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
            </Link>
            <Link
              href="/#live-demo"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              Explore the live product
            </Link>
          </div>
        </div>
      </section>

      {/* ============================== FEATURES ============================== */}
      <section className="mx-auto w-[90%] py-20">
        <div className="flex flex-col gap-20">
          {data.features.map((f, i) => (
            <Reveal key={f.title}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className={`${mono} text-blue-500`}>{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 font-akhirtahun text-2xl font-extrabold tracking-tight md:text-4xl">
                    {f.title}
                  </h2>
                  <p className="mt-4 max-w-lg font-serif leading-relaxed text-slate-400">
                    {f.body}
                  </p>
                  {f.note && (
                    <p className={`${mono} mt-5 text-slate-500`}>{f.note}</p>
                  )}
                </div>

                <div className={`rounded-2xl border border-slate-800 bg-slate-950 p-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {f.steps && (
                    <ol className="flex flex-col gap-4">
                      {f.steps.map((s, j) => (
                        <li key={s.label} className="flex gap-4">
                          <span className="grid size-7 flex-none place-items-center rounded-full border border-blue-800 font-mono text-[10px] text-blue-300">
                            {j + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-200">{s.label}</p>
                            <p className="mt-1 font-serif text-sm leading-relaxed text-slate-400">{s.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                  {f.items && (
                    <ul className="flex flex-col gap-4">
                      {f.items.map((it) => (
                        <li key={it.label} className="flex gap-3">
                          <Check className="mt-0.5 size-4 flex-none text-blue-400" />
                          <div>
                            <p className="text-sm font-semibold text-gray-200">{it.label}</p>
                            <p className="mt-1 font-serif text-sm leading-relaxed text-slate-400">{it.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {f.bullets && (
                    <ul className="flex flex-col gap-3">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex gap-3 font-serif text-sm leading-relaxed text-slate-400">
                          <Check className="mt-0.5 size-4 flex-none text-blue-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================= FAQ ================================= */}
      <section className="mx-auto w-[90%] max-w-3xl py-20">
        <Reveal className="mb-10 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-blue-400">FAQ</p>
          <h2 className="font-akhirtahun text-2xl sm:text-4xl md:text-5xl font-extrabold">{data.faqTitle}</h2>
        </Reveal>

        <Reveal>
          <div className="border-t border-slate-800">
            {data.faqs.map((f) => (
              <details key={f.q} className="group border-b border-slate-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-gray-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 flex-none text-slate-500 transition-transform duration-300 group-open:rotate-45 group-open:text-blue-500" />
                </summary>
                <p className="pb-5 pr-10 font-serif text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================= CTA ================================= */}
      <section className="mx-auto w-[90%] pb-24 pt-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-700 px-6 py-20 text-center">
            <NetworkBackground />
            <h2 className="mx-auto max-w-3xl font-akhirtahun text-2xl sm:text-5xl md:text-6xl font-extrabold">
              {data.closeTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-slate-400">
              {data.closeReassurance}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
              >
                Start free
                <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
              </Link>
              <Link
                href="/#live-demo"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-slate-700 p-4 px-6 text-white backdrop-blur-xl transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
              >
                <Play className="size-5" />
                Explore the live product
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
