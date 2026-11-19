"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Guide = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly pillar: string | null;
};

const TOPIC_LABELS: Record<string, string> = {
  business: "Business",
  billing: "Billing",
  networks: "Networks",
  fiber: "Fiber",
  wifi: "Wi-Fi",
};

export default function GuideGrid({ guides }: { guides: readonly Guide[] }) {
  const [topic, setTopic] = useState<string>("all");
  const visible = topic === "all" ? guides : guides.filter((g) => g.pillar === topic);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {["all", ...Object.keys(TOPIC_LABELS)].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={topic === t}
            onClick={() => setTopic(t)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-300 ${
              topic === t
                ? "bg-blue-800 text-white"
                : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
            }`}
          >
            {t === "all" ? "All" : TOPIC_LABELS[t]}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-slate-600">
          {visible.length} {visible.length === 1 ? "guide" : "guides"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((g, i) => (
          <Reveal key={g.slug} delay={(i % 3) * 60}>
            <Link
              href={`/resources/learn/${g.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-800"
            >
              <span className="w-fit rounded-full bg-blue-800/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                {TOPIC_LABELS[g.pillar ?? ""] ?? "Guide"}
              </span>
              <h2 className="mt-4 font-semibold text-gray-200 group-hover:text-white">{g.title}</h2>
              <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-slate-400">
                {g.description}
              </p>
              <span className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-blue-400/80">
                <Zap className="size-3.5" />
                Opens with a 30-second answer
              </span>
              <span className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors group-hover:text-blue-400">
                Read guide
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
