"use client";

import { useMemo, useState } from "react";

// Loss tables ported from dataradius.net (packages/shared optical loss-parameters)
const GPON_SPECS = {
  b_plus: { label: "B+ (28 dB)", oltTxMinDbm: 1.5, onuSensitivityDbm: -28 },
  c_plus: { label: "C+ (32 dB)", oltTxMinDbm: 3.0, onuSensitivityDbm: -32 },
  c_plus_plus: { label: "C++ (35 dB)", oltTxMinDbm: 3.0, onuSensitivityDbm: -32 },
} as const;
const XGSPON_SPECS = {
  n1: { label: "N1 (29 dB)", oltTxMinDbm: 2.0, onuSensitivityDbm: -28 },
  n2: { label: "N2 (31 dB)", oltTxMinDbm: 4.0, onuSensitivityDbm: -28 },
  n2a: { label: "N2a (31 dB)", oltTxMinDbm: 4.0, onuSensitivityDbm: -28 },
  e1: { label: "E1 (33 dB)", oltTxMinDbm: 3.0, onuSensitivityDbm: -28 },
  e2: { label: "E2 (35 dB)", oltTxMinDbm: 5.0, onuSensitivityDbm: -28 },
} as const;

const WAVELENGTH_DB_PER_KM: Record<number, number> = {
  1310: 0.35, 1490: 0.3, 1550: 0.25, 1577: 0.25,
};
const SPLITTER_LOSS: Record<number, number> = {
  2: 3.8, 4: 7.2, 8: 10.5, 16: 13.8, 32: 17.2, 64: 21.0, 128: 24.5,
};
const CONNECTOR_LOSS: Record<string, number> = {
  sc_apc: 0.3, lc_apc: 0.2, sc_upc: 0.5, lc_upc: 0.5, fc_apc: 0.3, fc_upc: 0.5, field: 0.5,
};
const SPLICE_LOSS = { fusion: 0.1, mechanical: 0.5 } as const;

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

const r2 = (v: number) => Math.round(v * 100) / 100;

export default function FiberPowerBudget() {
  const [pon, setPon] = useState<"gpon" | "xgspon">("gpon");
  const [odnClass, setOdnClass] = useState("b_plus");
  const [lengthKm, setLengthKm] = useState(10);
  const [wavelength, setWavelength] = useState(1490);
  const [splitter, setSplitter] = useState(32);
  const [connectors, setConnectors] = useState(4);
  const [connectorType, setConnectorType] = useState("sc_apc");
  const [splices, setSplices] = useState(6);
  const [spliceType, setSpliceType] = useState<keyof typeof SPLICE_LOSS>("fusion");
  const [safety, setSafety] = useState(3);

  const specs = pon === "gpon" ? GPON_SPECS : XGSPON_SPECS;
  const spec = (specs as Record<string, { oltTxMinDbm: number; onuSensitivityDbm: number }>)[odnClass]
    ?? GPON_SPECS.b_plus;

  const r = useMemo(() => {
    const fiberLoss = r2(lengthKm * (WAVELENGTH_DB_PER_KM[wavelength] ?? 0.35));
    const splitterLoss = r2(SPLITTER_LOSS[splitter] ?? 0);
    const connectorLoss = r2(connectors * (CONNECTOR_LOSS[connectorType] ?? 0.3));
    const spliceLoss = r2(splices * SPLICE_LOSS[spliceType]);
    const totalLoss = r2(fiberLoss + splitterLoss + connectorLoss + spliceLoss);
    const budget = r2(spec.oltTxMinDbm - spec.onuSensitivityDbm);
    const margin = r2(budget - totalLoss);
    const marginSafe = r2(margin - safety);
    const verdict =
      marginSafe >= 0
        ? { label: "PASS", text: "Link works with your safety margin included.", cls: "text-emerald-400", chip: "bg-emerald-500/10 text-emerald-300" }
        : margin >= 0
          ? { label: "MARGINAL", text: "Within budget but below your safety margin: expect issues on aging splices.", cls: "text-amber-400", chip: "bg-amber-500/10 text-amber-300" }
          : { label: "FAIL", text: "Path loss exceeds the optical budget: reduce split ratio, shorten the run, or use a higher ODN class.", cls: "text-rose-400", chip: "bg-rose-500/10 text-rose-300" };
    const parts = [
      { label: "Fiber", v: fiberLoss },
      { label: "Splitter", v: splitterLoss },
      { label: "Connectors", v: connectorLoss },
      { label: "Splices", v: spliceLoss },
    ];
    return { fiberLoss, splitterLoss, connectorLoss, spliceLoss, totalLoss, budget, margin, marginSafe, verdict, parts };
  }, [lengthKm, wavelength, splitter, connectors, connectorType, splices, spliceType, safety, spec]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid content-start gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="grid grid-cols-2 gap-4">
          <Field label="PON standard">
            <select className={inputCls} value={pon} onChange={(e) => { const v = e.target.value as "gpon" | "xgspon"; setPon(v); setOdnClass(v === "gpon" ? "b_plus" : "n1"); }}>
              <option value="gpon">GPON</option>
              <option value="xgspon">XGS-PON</option>
            </select>
          </Field>
          <Field label="ODN class">
            <select className={inputCls} value={odnClass} onChange={(e) => setOdnClass(e.target.value)}>
              {Object.entries(specs).map(([k, s]) => (
                <option key={k} value={k}>{s.label}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Fiber length (km)">
            <input className={inputCls} type="number" min={0} step={0.5} value={lengthKm} onChange={(e) => setLengthKm(Math.max(0, Number(e.target.value) || 0))} />
          </Field>
          <Field label="Wavelength (nm)">
            <select className={inputCls} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))}>
              {Object.keys(WAVELENGTH_DB_PER_KM).map((w) => (
                <option key={w} value={w}>{w} nm: {WAVELENGTH_DB_PER_KM[Number(w)]} dB/km</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Splitter ratio">
          <select className={inputCls} value={splitter} onChange={(e) => setSplitter(Number(e.target.value))}>
            {Object.keys(SPLITTER_LOSS).map((s) => (
              <option key={s} value={s}>1:{s}: {SPLITTER_LOSS[Number(s)]} dB</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Connector pairs">
            <input className={inputCls} type="number" min={0} value={connectors} onChange={(e) => setConnectors(Math.max(0, Number(e.target.value) || 0))} />
          </Field>
          <Field label="Connector type">
            <select className={inputCls} value={connectorType} onChange={(e) => setConnectorType(e.target.value)}>
              <option value="sc_apc">SC/APC (0.3 dB)</option>
              <option value="lc_apc">LC/APC (0.2 dB)</option>
              <option value="sc_upc">SC/UPC (0.5 dB)</option>
              <option value="lc_upc">LC/UPC (0.5 dB)</option>
              <option value="fc_apc">FC/APC (0.3 dB)</option>
              <option value="fc_upc">FC/UPC (0.5 dB)</option>
              <option value="field">Field-terminated (0.5 dB)</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Splices">
            <input className={inputCls} type="number" min={0} value={splices} onChange={(e) => setSplices(Math.max(0, Number(e.target.value) || 0))} />
          </Field>
          <Field label="Splice type">
            <select className={inputCls} value={spliceType} onChange={(e) => setSpliceType(e.target.value as keyof typeof SPLICE_LOSS)}>
              <option value="fusion">Fusion (0.1 dB)</option>
              <option value="mechanical">Mechanical (0.5 dB)</option>
            </select>
          </Field>
        </div>
        <Field label="Safety margin (dB)">
          <input className={inputCls} type="number" min={0} max={10} step={0.5} value={safety} onChange={(e) => setSafety(Math.max(0, Number(e.target.value) || 0))} />
        </Field>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-blue-800 bg-black p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Power margin</p>
            <span className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${r.verdict.chip}`}>
              {r.verdict.label}
            </span>
          </div>
          <p className={`mt-2 font-ibmblockserif text-4xl font-extrabold md:text-5xl ${r.verdict.cls}`}>
            {r.marginSafe > 0 ? "+" : ""}{r.marginSafe} dB
          </p>
          <p className="mt-3 font-serif text-sm text-slate-400">{r.verdict.text}</p>

          {/* loss breakdown bar */}
          <div className="mt-6">
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-800" role="img" aria-label={`Total path loss ${r.totalLoss} dB of ${r.budget} dB budget`}>
              {r.parts.map((p, i) => (
                <div
                  key={p.label}
                  className={["bg-blue-700", "bg-blue-600", "bg-blue-500", "bg-blue-400"][i]}
                  style={{ width: `${Math.min(100, (p.v / r.budget) * 100)}%` }}
                  title={`${p.label}: ${p.v} dB`}
                />
              ))}
              {r.margin > 0 && (
                <div className="bg-emerald-600" style={{ width: `${(r.margin / r.budget) * 100}%` }} title={`Margin: ${r.margin} dB`} />
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {[...r.parts, { label: "Margin", v: r.margin }].map((p, i) => (
                <span key={p.label} className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                  <span className={`size-2 rounded-sm ${["bg-blue-700", "bg-blue-600", "bg-blue-500", "bg-blue-400", "bg-emerald-600"][i]}`} />
                  {p.label} {p.v} dB
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Path loss</p>
            <p className="mt-2 font-mono text-2xl text-white">{r.totalLoss} dB</p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Budget</p>
            <p className="mt-2 font-mono text-2xl text-white">{r.budget} dB</p>
            <p className="mt-1 text-[11px] text-slate-600">{spec.oltTxMinDbm} − ({spec.onuSensitivityDbm}) dBm</p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Margin</p>
            <p className="mt-2 font-mono text-2xl text-white">{r.margin} dB</p>
            <p className="mt-1 text-[11px] text-slate-600">before safety</p>
          </div>
        </div>
      </div>
    </div>
  );
}
