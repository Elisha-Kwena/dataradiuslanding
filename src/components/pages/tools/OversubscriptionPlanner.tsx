"use client";

import { useMemo, useState } from "react";

const RATIOS = [5, 10, 15, 20, 25, 30];
const UPLINKS = [100, 200, 500, 1000, 2000, 5000, 10000];

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

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 font-ibmblockserif text-2xl font-extrabold text-white md:text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

function formatMbps(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)} Gbps` : `${v} Mbps`;
}

export default function OversubscriptionPlanner() {
  const [subscribers, setSubscribers] = useState(500);
  const [planSpeed, setPlanSpeed] = useState(20);
  const [ratio, setRatio] = useState(20);
  const [peakPct, setPeakPct] = useState(60);
  const [uplink, setUplink] = useState(1000);

  const r = useMemo(() => {
    const totalCommitted = subscribers * planSpeed;
    const requiredUplink = Math.round(totalCommitted / ratio);
    const peakDemand = Math.round(requiredUplink * (peakPct / 100));
    const headroom = uplink - peakDemand;
    const headroomPct = uplink > 0 ? Math.round((headroom / uplink) * 100) : 0;
    const verdict =
      headroomPct >= 40
        ? { label: "Comfortable", text: "Plenty of headroom for growth.", cls: "text-emerald-400", chip: "bg-emerald-500/10 text-emerald-300" }
        : headroomPct >= 20
          ? { label: "Adequate", text: "Works today: plan an upgrade before you double.", cls: "text-amber-400", chip: "bg-amber-500/10 text-amber-300" }
          : headroomPct >= 0
            ? { label: "Tight", text: "Peak hours will feel slow. More uplink or fewer subscribers per feed.", cls: "text-orange-400", chip: "bg-orange-500/10 text-orange-300" }
            : { label: "Oversubscribed", text: "Peak demand exceeds capacity: expect complaints at rush hour.", cls: "text-rose-400", chip: "bg-rose-500/10 text-rose-300" };
    return { totalCommitted, requiredUplink, peakDemand, headroom, headroomPct, verdict };
  }, [subscribers, planSpeed, ratio, peakPct, uplink]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid content-start gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <Field label="Subscribers">
          <input className={inputCls} type="number" min={1} value={subscribers} onChange={(e) => setSubscribers(Math.max(1, Number(e.target.value) || 1))} />
        </Field>
        <Field label="Plan speed (Mbps)">
          <input className={inputCls} type="number" min={1} value={planSpeed} onChange={(e) => setPlanSpeed(Math.max(1, Number(e.target.value) || 1))} />
        </Field>
        <Field label="Oversubscription ratio">
          <select className={inputCls} value={ratio} onChange={(e) => setRatio(Number(e.target.value))}>
            {RATIOS.map((x) => (
              <option key={x} value={x}>{x}:1{x <= 10 ? " (conservative)" : x >= 25 ? " (aggressive)" : ""}</option>
            ))}
          </select>
        </Field>
        <Field label="Peak usage: % of subscribers online">
          <input className={inputCls} type="number" min={1} max={100} value={peakPct} onChange={(e) => setPeakPct(Math.min(100, Math.max(1, Number(e.target.value) || 1)))} />
        </Field>
        <Field label="Current uplink capacity">
          <select className={inputCls} value={uplink} onChange={(e) => setUplink(Number(e.target.value))}>
            {UPLINKS.map((x) => (
              <option key={x} value={x}>{formatMbps(x)}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-blue-800 bg-black p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Required uplink</p>
            <span className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${r.verdict.chip}`}>
              {r.verdict.label}
            </span>
          </div>
          <p className={`mt-2 font-ibmblockserif text-4xl font-extrabold md:text-5xl ${r.verdict.cls}`}>
            {formatMbps(r.requiredUplink)}
          </p>
          <p className="mt-3 font-serif text-sm text-slate-400">{r.verdict.text}</p>

          <div className="mt-6">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-slate-500">
              <span>Peak demand vs capacity</span>
              <span>{r.peakDemand.toLocaleString("en-US")} / {uplink.toLocaleString("en-US")} Mbps</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800" role="img" aria-label={`Peak demand uses ${Math.round((r.peakDemand / uplink) * 100)} percent of uplink`}>
              <div
                className={`h-full rounded-full transition-all duration-700 ${r.headroomPct >= 20 ? "bg-blue-700" : r.headroomPct >= 0 ? "bg-amber-500" : "bg-rose-500"}`}
                style={{ width: `${Math.min(100, Math.max(0, (r.peakDemand / uplink) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Total committed" value={formatMbps(r.totalCommitted)} sub="all plans at full speed" />
          <Stat label="Peak demand" value={formatMbps(r.peakDemand)} sub={`${peakPct}% concurrent`} />
          <Stat label="Headroom" value={formatMbps(Math.max(0, r.headroom))} sub={`${r.headroomPct}% free`} />
        </div>
      </div>
    </div>
  );
}
