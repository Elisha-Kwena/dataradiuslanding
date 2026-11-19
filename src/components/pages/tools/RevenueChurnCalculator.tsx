"use client";

import { useMemo, useState } from "react";
import { Money, useRegion } from "@/contexts/PricingContext";
import Select from "@/components/ui/Select";
import type { Region } from "@/lib/pricingConfig";

const inputCls =
  "h-11 w-full rounded-xl border border-slate-700 bg-black px-3.5 font-mono text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</label>
      {children}
    </div>
  );
}

export default function RevenueChurnCalculator() {
  const { region } = useRegion();
  const [subscribers, setSubscribers] = useState(200);
  const [arpuSel, setArpuSel] = useState<{ r: Region; v: number } | null>(null);
  const [newSubs, setNewSubs] = useState(20);
  const [churnPct, setChurnPct] = useState(3);
  const [months, setMonths] = useState(12);

  const arpu = arpuSel?.r === region.code ? arpuSel.v : region.defaultArpu;

  const r = useMemo(() => {
    let subs = subscribers;
    let totalChurned = 0;
    const rows: { month: number; subs: number; mrr: number; churned: number; added: number }[] = [];
    for (let m = 1; m <= months; m++) {
      const churned = Math.round(subs * (churnPct / 100));
      subs = Math.max(0, subs - churned + newSubs);
      totalChurned += churned;
      rows.push({ month: m, subs, mrr: subs * arpu, churned, added: newSubs });
    }
    const annualRevenue = rows.reduce((s, p) => s + p.mrr, 0);
    const last = rows[rows.length - 1];
    return {
      rows,
      endSubs: last?.subs ?? subscribers,
      endMrr: last?.mrr ?? 0,
      totalChurned,
      totalAdded: newSubs * months,
      netGrowth: (last?.subs ?? subscribers) - subscribers,
      annualRevenue,
    };
  }, [subscribers, arpu, newSubs, churnPct, months]);

  const maxMrr = Math.max(1, ...r.rows.map((p) => p.mrr));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid content-start gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <Field label="Current subscribers">
          <input className={inputCls} type="number" min={0} value={subscribers} onChange={(e) => setSubscribers(Math.max(0, Number(e.target.value) || 0))} />
        </Field>
        <Field label={`Average revenue per user (${region.currencyCode})`}>
          <input className={inputCls} type="number" min={0} value={arpu} onChange={(e) => setArpuSel({ r: region.code, v: Math.max(0, Number(e.target.value) || 0) })} />
        </Field>
        <Field label="New subscribers per month">
          <input className={inputCls} type="number" min={0} value={newSubs} onChange={(e) => setNewSubs(Math.max(0, Number(e.target.value) || 0))} />
        </Field>
        <Field label="Monthly churn: %">
          <input className={inputCls} type="number" min={0} max={100} step={0.5} value={churnPct} onChange={(e) => setChurnPct(Math.min(100, Math.max(0, Number(e.target.value) || 0)))} />
        </Field>
        <Field label="Projection period">
          <Select
            variant="tool"
            ariaLabel="Projection period"
            value={String(months)}
            onChange={(v) => setMonths(Number(v))}
            options={[6, 12, 24, 36].map((m) => ({ value: String(m), label: `${m} months` }))}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-blue-800 bg-black p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Monthly recurring revenue · month {months}
          </p>
          <p className="mt-2 font-ibmblockserif text-4xl font-extrabold text-white md:text-5xl">
            <Money amount={r.endMrr} />
          </p>
          <p className={`mt-2 font-mono text-sm ${r.netGrowth >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {r.netGrowth >= 0 ? "+" : ""}{r.netGrowth.toLocaleString("en-US")} subscribers net
          </p>

          {/* MRR sparkline */}
          <div className="mt-6 flex h-24 items-end gap-1" aria-hidden="true">
            {r.rows.map((p) => (
              <div
                key={p.month}
                className="flex-1 rounded-t bg-blue-700/80 transition-all duration-500"
                style={{ height: `${(p.mrr / maxMrr) * 100}%` }}
                title={`Month ${p.month}`}
              />
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">End subscribers</p>
              <p className="mt-1 font-mono text-xl text-white">{r.endSubs.toLocaleString("en-US")}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Total revenue</p>
              <p className="mt-1 font-mono text-xl text-white"><Money amount={r.annualRevenue} /></p>
            </div>
            <div className="rounded-2xl border border-slate-800 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Lost to churn</p>
              <p className="mt-1 font-mono text-xl text-rose-400">{r.totalChurned.toLocaleString("en-US")}</p>
            </div>
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full font-mono text-xs">
            <thead className="sticky top-0 bg-[#0d0d0d]">
              <tr className="border-b border-slate-800 text-left text-slate-500">
                <th className="px-5 py-3 font-medium uppercase tracking-wider">Month</th>
                <th className="px-5 py-3 text-right font-medium uppercase tracking-wider">Subs</th>
                <th className="px-5 py-3 text-right font-medium uppercase tracking-wider">Churned</th>
                <th className="px-5 py-3 text-right font-medium uppercase tracking-wider">MRR</th>
              </tr>
            </thead>
            <tbody>
              {r.rows.map((p) => (
                <tr key={p.month} className="border-b border-slate-800/50 text-slate-300 last:border-0">
                  <td className="px-5 py-2.5">{p.month}</td>
                  <td className="px-5 py-2.5 text-right">{p.subs.toLocaleString("en-US")}</td>
                  <td className="px-5 py-2.5 text-right text-rose-400/80">-{p.churned}</td>
                  <td className="px-5 py-2.5 text-right text-slate-100"><Money amount={p.mrr} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
