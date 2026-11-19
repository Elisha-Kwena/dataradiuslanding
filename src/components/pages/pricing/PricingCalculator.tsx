"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Cable, Receipt, Router, Wifi, type LucideIcon } from "lucide-react";
import {
  PRICING,
  WIFI_FEE_PCT,
  computeBill,
  type Region,
  type RegionPricing,
} from "../../../lib/pricingConfig";
import { CurrencyToggle, Money, useRegion } from "@/contexts/PricingContext";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Smoothly counts toward `target` so numbers glide instead of jumping. */
function useTween(target: number, ms = 450) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      from.current = target;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = a + (target - a) * eased;
      from.current = current;
      setValue(current);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduced]);

  return reduced ? target : value;
}

type Preset = {
  id: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
  customers: number;
  wifi: (r: RegionPricing) => number;
  arpu: (r: RegionPricing) => number;
};

const presets: Preset[] = [
  { id: "hotspot", name: "Hotspot operator", blurb: "Cafés, campuses & estates", icon: Wifi, customers: 0, wifi: (r) => r.typicalWifiSales, arpu: (r) => r.defaultArpu },
  { id: "wisp", name: "Wireless ISP", blurb: "Fixed wireless & PPPoE", icon: Router, customers: 600, wifi: (r) => Math.round(r.typicalWifiSales / 4), arpu: (r) => r.defaultArpu },
  { id: "fiber", name: "Fiber ISP", blurb: "FTTH with OLTs & field teams", icon: Cable, customers: 3000, wifi: () => 0, arpu: (r) => Math.round(r.defaultArpu * 1.5) },
];

function Slider({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: ReactNode;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-slate-400">
          {label}
        </label>
        <output htmlFor={id} className="flex-none whitespace-nowrap font-mono text-lg text-white">
          {display}
        </output>
      </div>
      {/* flat custom slider: dark rail + blue fill underneath a transparent native input */}
      <div className="relative flex h-5 items-center">
        <div className="absolute inset-x-0 h-2 rounded-full bg-slate-800" />
        <div
          className="absolute left-0 h-2 rounded-full bg-blue-700"
          style={{ width: `calc(${pct}% + ${10 - pct * 0.2}px)` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-blue-700 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:transition-shadow [&:focus-visible::-webkit-slider-thumb]:ring-4 [&:focus-visible::-webkit-slider-thumb]:ring-blue-500/40 [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-blue-700 [&::-moz-range-thumb]:bg-white"
        />
      </div>
    </div>
  );
}

export default function PricingCalculator() {
  const { region } = useRegion();
  const [customers, setCustomers] = useState(600);
  // Region-tagged overrides: switching regions falls back to that region's
  // defaults instead of carrying stale KES-scale values into USD/EUR.
  const [wifiSel, setWifiSel] = useState<{ r: Region; v: number } | null>(null);
  const [arpuSel, setArpuSel] = useState<{ r: Region; v: number } | null>(null);
  const wifi = wifiSel?.r === region.code ? wifiSel.v : Math.round(region.typicalWifiSales / 4);
  const arpu = arpuSel?.r === region.code ? arpuSel.v : region.defaultArpu;

  const bill = computeBill(customers, wifi, region);
  const revenue = customers * arpu + wifi;
  const net = revenue - bill.total;
  const pct = revenue > 0 ? (bill.total / revenue) * 100 : 0;

  // conservative case: revenue drops 20% but your platform cost stays the same
  const cRevenue = revenue * 0.8;
  const cNet = cRevenue - bill.total;
  const cPct = cRevenue > 0 ? (bill.total / cRevenue) * 100 : 0;

  const perCustomer = customers > 0 ? bill.total / customers : null;

  const totalT = useTween(bill.total);
  const revenueT = useTween(revenue);
  const netT = useTween(net);
  const cNetT = useTween(cNet);

  const atMax = customers >= PRICING.customersMax;

  return (
    <div className="flex flex-col gap-6">
      {/* ---------------- typical bills ---------------- */}
      <div className="grid gap-4 sm:grid-cols-3">
        {presets.map((p) => {
          const pWifi = p.wifi(region);
          const pArpu = p.arpu(region);
          const active = p.customers === customers && pWifi === wifi && pArpu === arpu;
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setCustomers(p.customers);
                setWifiSel({ r: region.code, v: pWifi });
                setArpuSel({ r: region.code, v: pArpu });
              }}
              className={`group flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                active
                  ? "border-blue-700 bg-blue-800/20"
                  : "border-slate-800 bg-slate-950 hover:border-slate-600"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`grid size-9 place-items-center rounded-lg transition-colors ${
                    active ? "bg-blue-800 text-white" : "bg-slate-800 text-slate-400 group-hover:text-blue-400"
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  {active ? "Selected" : "Try this"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-200">{p.name}</p>
                <p className="text-sm text-slate-500">{p.blurb}</p>
              </div>
              <p className="font-mono text-2xl text-white">
                <Money amount={computeBill(p.customers, pWifi, region).total} />
                <span className="text-sm text-slate-500"> /mo</span>
              </p>
            </button>
          );
        })}
      </div>

      {/* ---------------- inputs + invoice ---------------- */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-200">Your network</h3>
            <CurrencyToggle />
          </div>

          <Slider
            id="customers"
            label="Active broadband customers"
            value={customers}
            display={`${customers.toLocaleString("en-US")}${atMax ? "+" : ""}`}
            min={0}
            max={PRICING.customersMax}
            step={10}
            onChange={setCustomers}
          />
          <Slider
            id="wifi"
            label="Monthly Wi-Fi sales"
            value={wifi}
            display={<Money amount={wifi} />}
            min={0}
            max={region.wifiMax}
            step={Math.max(10, Math.round(region.wifiMax / 100))}
            onChange={(v) => setWifiSel({ r: region.code, v })}
          />
          <Slider
            id="arpu"
            label="Average broadband plan price"
            value={arpu}
            display={<Money amount={arpu} />}
            min={Math.max(1, Math.round(region.defaultArpu / 3))}
            max={Math.round(region.defaultArpu * 7)}
            step={Math.max(1, Math.round(region.defaultArpu / 15))}
            onChange={(v) => setArpuSel({ r: region.code, v })}
          />

          {atMax && (
            <p className="rounded-xl border border-blue-800 bg-blue-800/20 px-4 py-3 text-sm text-blue-200">
              Running more than {PRICING.customersMax.toLocaleString("en-US")} customers? Volume pricing is
              available.{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-4">
                Talk to sales
              </Link>
            </p>
          )}

          <p className="text-xs text-slate-500">
            Estimate only. Your invoice uses your real active customers and completed Wi-Fi payments.
          </p>
        </div>

        {/* invoice preview */}
        <div className="flex flex-col rounded-3xl border border-blue-800 bg-black p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-blue-800 text-white">
                <Receipt className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-gray-200">Sample monthly invoice</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Updates live</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-blue-400">
              <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-blue-500" />
              LIVE
            </span>
          </div>

          <dl className="flex flex-col gap-4 font-mono text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <dt className="text-slate-300">Active customers</dt>
                <dd className="text-xs text-slate-500">
                  {customers.toLocaleString("en-US")} × <Money amount={region.subscriberRate} />
                </dd>
              </div>
              <span className="text-slate-200">
                <Money amount={bill.customerFee} />
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <dt className="text-slate-300">Wi-Fi sales fee</dt>
                <dd className="text-xs text-slate-500">
                  <Money amount={wifi} /> × {WIFI_FEE_PCT}%
                </dd>
              </div>
              <span className="text-slate-200">
                <Money amount={bill.wifiFee} />
              </span>
            </div>
            {bill.minimumApplied && (
              <div className="flex items-start justify-between gap-4 rounded-lg bg-blue-800/20 px-3 py-2">
                <div>
                  <dt className="text-blue-200">Minimum applied</dt>
                  <dd className="text-xs text-blue-300/70">Usage came in lower</dd>
                </div>
                <span className="text-blue-200">
                  <Money amount={region.monthlyMinimum} />
                </span>
              </div>
            )}
          </dl>

          <div className="my-6 border-t border-dashed border-slate-700" />

          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-slate-400">Total per month</span>
            <span className="font-ibmblockserif text-4xl font-extrabold text-white md:text-5xl">
              <Money amount={totalT} />
            </span>
          </div>
          <p className="mt-2 text-right font-mono text-xs text-slate-500">
            {perCustomer !== null ? (
              <>
                that is <Money amount={perCustomer} /> per customer
              </>
            ) : (
              "pay only when guests pay"
            )}
          </p>

          <Link
            href="/signup"
            className="group mt-8 flex items-center justify-center gap-3 rounded-full bg-white p-4 font-medium text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
          >
            Start {PRICING.trialDays}-day free trial
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>

      {/* ---------------- see the math ---------------- */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-200">See the math</h3>
          <p className="text-sm text-slate-500">What the platform costs next to what you bring in</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-500">Monthly revenue</p>
            <p className="mt-2 font-mono text-2xl text-white">
              <Money amount={revenueT} />
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-500">Platform cost</p>
            <p className="mt-2 font-mono text-2xl text-white">
              <Money amount={totalT} />
            </p>
            <p className="mt-1 font-mono text-xs text-blue-400">{pct.toFixed(1)}% of revenue</p>
          </div>
          <div className="rounded-2xl border border-blue-800 bg-blue-800/10 p-5">
            <p className="text-xs uppercase tracking-wider text-blue-300/80">You keep</p>
            <p className="mt-2 font-mono text-2xl text-white">
              <Money amount={netT} />
            </p>
          </div>
        </div>

        {/* cost share bar */}
        <div
          className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-800"
          role="img"
          aria-label={`Platform cost is ${pct.toFixed(1)} percent of revenue`}
        >
          <div
            className="h-full rounded-full bg-blue-700 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, Math.max(pct, revenue > 0 ? 1.5 : 0))}%` }}
          />
        </div>

        <p className="mt-5 text-sm text-slate-400">
          Even in a slow month with 20% less revenue, you would keep{" "}
          <span className="font-mono text-white">
            <Money amount={cNetT} />
          </span>
          , and the platform would still be only{" "}
          <span className="font-mono text-white">{cPct.toFixed(1)}%</span> of what you bring in.
        </p>
      </div>
    </div>
  );
}