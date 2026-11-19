"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Check, Minus, Plus } from "lucide-react";

const items = [
  {
    title: "Hotspot sales",
    desc: "A branded portal in front of your WiFi. Customers pick a bundle, pay by M-Pesa from their own phone and are online the second it lands.",
  },
  {
    title: "PPPoE subscriptions",
    desc: "Monthly invoices for home and business clients, grace periods, auto-limit when overdue and instant restore after payment.",
  },
  {
    title: "Resellers & agents",
    desc: "Give partners their own sub-accounts and vouchers. See who sells what and settle commissions without spreadsheets.",
  },
];

const invoiceSteps = [
  "Payment received",
  "Matched to invoice",
  "RADIUS profile restored",
  "Client back online",
];

const leaderboards = {
  week: [
    { name: "Maseno", clients: 142, amount: "38k", pct: 100 },
    { name: "Malaba", clients: 96, amount: "27k", pct: 71 },
    { name: "Keroka", clients: 71, amount: "19k", pct: 50 },
    { name: "Garissa", clients: 44, amount: "9k", pct: 24 },
  ],
  month: [
    { name: "Maseno", clients: 142, amount: "152k", pct: 100 },
    { name: "Malaba", clients: 96, amount: "104k", pct: 68 },
    { name: "Keroka", clients: 71, amount: "81k", pct: 53 },
    { name: "Garissa", clients: 44, amount: "36k", pct: 24 },
  ],
};

function HotspotPanel() {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <Image
        src="/images/mobile.png"
        alt="DataRadius hotspot portal on a phone"
        width={360}
        height={778}
        className="h-auto w-full max-w-[230px] drop-shadow-[0_20px_50px_rgba(16,185,129,0.12)]"
      />
    </div>
  );
}

function InvoicePanel({ step }: { step: number }) {
  const badge =
    step === 0
      ? { text: "Overdue", cls: "bg-rose-500/15 text-rose-300" }
      : step >= invoiceSteps.length
        ? { text: "Paid", cls: "bg-emerald-500/15 text-emerald-300" }
        : { text: "Processing", cls: "bg-blue-500/15 text-blue-300" };

  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-black/40 p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-slate-400">INV-2026-1184</p>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors duration-500 ${badge.cls}`}
        >
          {badge.text}
        </span>
      </div>
      <p className="mt-4 font-ibmblockserif text-4xl text-white">KES 2,500</p>
      <p className="mt-1.5 text-xs text-slate-500">
        Home Fibre · 20 Mbps · due 15 Nov
      </p>
      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Pay with M-Pesa
      </button>
      <div className="my-5 h-px bg-white/5" />
      <ul className="flex flex-col gap-3">
        {invoiceSteps.map((label, i) => {
          const state = i < step ? "done" : i === step ? "active" : "pending";
          return (
            <li key={label} className="flex items-center gap-3">
              {state === "done" ? (
                <span className="flex size-[16px] items-center justify-center rounded-full bg-emerald-500/90">
                  <Check className="size-2.5 text-emerald-950" strokeWidth={3.5} />
                </span>
              ) : state === "active" ? (
                <span className="size-[16px] rounded-full border-2 border-slate-600 border-t-blue-400 motion-safe:animate-spin" />
              ) : (
                <span className="size-[16px] rounded-full border border-slate-700/80" />
              )}
              <span
                className={`text-xs transition-colors duration-500 ${
                  state === "done"
                    ? "text-slate-200"
                    : state === "active"
                      ? "text-white"
                      : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ResellerPanel() {
  const [period, setPeriod] = useState<"week" | "month">("week");

  return (
    <div className="w-full max-w-md">
      <div className="flex w-fit rounded-full border border-white/10 bg-white/5 p-1">
        {(["week", "month"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300 ${
              period === p ? "bg-white text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            {p === "week" ? "This week" : "This month"}
          </button>
        ))}
      </div>
      <ul className="mt-6 flex flex-col gap-4">
        {leaderboards[period].map((r) => (
          <li key={r.name} className="flex items-center gap-4">
            <div className="w-28 flex-none">
              <p className="truncate text-xs text-slate-200">{r.name}</p>
              <p className="text-[10px] text-slate-500">{r.clients} clients</p>
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <p className="w-10 flex-none text-right font-mono text-xs text-slate-300">
              {r.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WaysToEarn() {
  const [active, setActive] = useState(0);
  const [invStep, setInvStep] = useState(0);
  const paused = useReducedMotion();

  useEffect(() => {
    if (paused || active !== 1) return;
    const t = setTimeout(
      () => setInvStep((s) => (s >= invoiceSteps.length ? 0 : s + 1)),
      invStep >= invoiceSteps.length ? 2400 : 1100,
    );
    return () => clearTimeout(t);
  }, [active, invStep, paused]);

  return (
    <section className="w-full bg-black py-24">
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }`}</style>
      <div className="mx-auto grid w-[90%] items-stretch gap-12 lg:grid-cols-2">
        {/* left: heading + accordion */}
        <div className="max-w-xl">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Product
          </p>
          <h2 className="mt-5 font-akhirtahun text-2xl sm:text-5xl font-extrabold leading-[1.05] text-white md:text-6xl">
            One platform.
            <br />
            Three ways
            <br />
            to earn.
          </h2>

          <div className="mt-10 flex flex-col gap-3">
            {items.map((item, i) => {
              const open = active === i;
              return (
                <div
                  key={item.title}
                  className={`rounded-xl border transition-colors duration-300 ${
                    open
                      ? "border-white/15 bg-white/[0.03]"
                      : "border-white/10 bg-transparent hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-autobus text-base text-white">
                      {item.title}
                    </span>
                    {open ? (
                      <Minus className="size-4 flex-none text-emerald-400" />
                    ) : (
                      <Plus className="size-4 flex-none text-slate-500" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 font-serif text-sm leading-relaxed text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* right: contextual panel */}
        <div className="flex min-h-[420px] md:min-h-[560px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div
            key={active}
            className="flex w-full items-center justify-center [animation:fadeUp_.45s_ease_both]"
          >
            {active === 0 ? (
              <HotspotPanel />
            ) : active === 1 ? (
              <InvoicePanel step={invStep} />
            ) : (
              <ResellerPanel />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
