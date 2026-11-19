"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  CATEGORY_LABELS,
  COMPATIBILITY_ENTRIES,
  STATUS_LABELS,
  type CompatibilityStatus,
} from "@/lib/content/compatibility";

const statusStyle: Record<CompatibilityStatus, string> = {
  live: "border-emerald-700/60 bg-emerald-950/40 text-emerald-300",
  live_with_limits: "border-amber-700/60 bg-amber-950/40 text-amber-300",
  beta: "border-blue-700/60 bg-blue-950/40 text-blue-300",
  planned: "border-slate-700 bg-slate-900 text-slate-400",
  not_planned: "border-slate-800 bg-slate-950 text-slate-600",
};

export default function CompatibilityChecker() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return COMPATIBILITY_ENTRIES;
    return COMPATIBILITY_ENTRIES.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.notes.toLowerCase().includes(q) ||
        CATEGORY_LABELS[e.category].toLowerCase().includes(q),
    );
  }, [q]);

  const trademarks = results.filter((e) => e.trademarkNotice);

  return (
    <div>
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by device, vendor or provider…"
          aria-label="Search compatibility"
          className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 text-white placeholder:text-slate-600 transition focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/30"
        />
      </div>

      {results.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 font-serif text-sm text-slate-400">
          No matches found. Use the form below to request support for your device or provider.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {results.map((e) => (
            <li
              key={e.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold text-gray-200">{e.name}</p>
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusStyle[e.status]}`}>
                    {e.status === "live" ? "Verified" : STATUS_LABELS[e.status]}
                  </span>
                </div>
                <p className="mt-1.5 font-serif text-sm leading-relaxed text-slate-400">{e.notes}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                  {CATEGORY_LABELS[e.category]} · verified {e.lastVerified}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {trademarks.length > 0 && (
        <p className="mt-6 font-mono text-[10px] leading-relaxed text-slate-600">
          Trademark notices: {trademarks.map((e) => e.trademarkNotice).join(" ")}
        </p>
      )}
    </div>
  );
}
