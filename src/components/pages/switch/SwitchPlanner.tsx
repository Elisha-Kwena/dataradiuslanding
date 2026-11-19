"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type Answers = {
  system: string | null;
  subscribers: string | null;
  equipment: string[];
  payments: string[];
};

const systems = [
  "Splynx",
  "UISP",
  "Sonar",
  "Powercode",
  "MikroTik User Manager",
  "Mikhmon",
  "Spreadsheets or manual",
  "Something else",
];

const subscriberBuckets = [
  "Under 200",
  "200 to 1,000",
  "1,000 to 5,000",
  "Over 5,000",
];

const equipmentOptions = [
  "MikroTik routers",
  "OLTs and ONUs",
  "Customer routers (CPEs)",
];

const paymentOptions = [
  "Mobile money",
  "Card payments",
  "Bank transfer",
  "Cash or manual",
];

const timelines: Record<string, string> = {
  "Under 200": "a few days to two weeks",
  "200 to 1,000": "two to three weeks",
  "1,000 to 5,000": "three to five weeks",
  "Over 5,000": "six weeks and up",
};

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
        active
          ? "border-blue-700 bg-blue-800/20 text-white"
          : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function OptionStep({
  title,
  options,
  selected,
  onPick,
  multi = false,
}: {
  title: string;
  options: string[];
  selected: string | string[] | null;
  onPick: (v: string) => void;
  multi?: boolean;
}) {
  const isActive = (v: string) =>
    Array.isArray(selected) ? selected.includes(v) : selected === v;

  return (
    <div>
      <p className="text-sm text-slate-400">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((o) => (
          <Pill key={o} active={isActive(o)} onClick={() => onPick(o)}>
            {o}
          </Pill>
        ))}
      </div>
      {multi && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-slate-600">
          Select all that apply
        </p>
      )}
    </div>
  );
}

export default function SwitchPlanner() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [booked, setBooked] = useState(false);
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Answers>({
    system: null,
    subscribers: null,
    equipment: [],
    payments: [],
  });

  const toggle = (key: "equipment" | "payments", v: string) =>
    setAnswers((a) => ({
      ...a,
      [key]: a[key].includes(v)
        ? a[key].filter((x) => x !== v)
        : [...a[key], v],
    }));

  const canNext =
    step === 0
      ? answers.system !== null
      : step === 1
        ? answers.subscribers !== null
        : true;

  const timeline = answers.subscribers
    ? timelines[answers.subscribers]
    : null;

  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setBooked(true);
    }, 800);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-blue-800 bg-slate-950 p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-200">Your migration plan</h3>
          <button
            type="button"
            onClick={() => setDone(false)}
            className="font-mono text-[11px] uppercase tracking-wider text-slate-500 transition-colors hover:text-white"
          >
            Edit answers
          </button>
        </div>

        <dl className="mt-6 grid gap-4 font-mono text-sm sm:grid-cols-2">
          {[
            ["Current system", answers.system],
            ["Subscribers", answers.subscribers],
            ["Equipment", answers.equipment.join(", ") || ": "],
            ["Payments", answers.payments.join(", ") || ": "],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-xl border border-slate-800 p-4">
              <dt className="text-[11px] uppercase tracking-wider text-slate-500">{k}</dt>
              <dd className="mt-1.5 text-slate-200">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-xl border border-blue-800 bg-blue-800/10 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-blue-300/80">
            Estimated timeline
          </p>
          <p className="mt-1 text-slate-200">
            Approximately {timeline}, starting from your first import.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Your migration engineer refines this after reviewing your export.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/signup"
            className="group flex items-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
          >
            Start free while we prepare your plan
            <ArrowRight className="transition-all duration-500 group-hover:translate-x-2" />
          </Link>
          <a
            href="#book"
            className="rounded-full border-2 border-transparent p-4 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
          >
            Book a migration engineer
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          14 days free. Your migration engineer will reach out within one business day.
        </p>

        {/* booking form */}
        <div id="book" className="mt-10 scroll-mt-24 border-t border-slate-800 pt-8">
          {booked ? (
            <div className="flex items-start gap-4 rounded-2xl border border-blue-800 bg-blue-800/10 p-6">
              <span className="grid size-10 flex-none place-items-center rounded-full bg-blue-800 text-white">
                <Check className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-gray-200">Booking received</p>
                <p className="mt-1 text-sm text-slate-400">
                  We will reach out to {email} within one business day with your
                  migration plan.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submitBooking}>
              <h4 className="text-lg font-semibold text-gray-200">
                Book your migration engineer
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                We will review your plan and reach out to schedule the first call.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-700 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  className="rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-700 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-5 flex items-center gap-3 rounded-full bg-white p-3.5 px-7 text-sm font-medium text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white disabled:opacity-60"
              >
                {sending ? "Sending…" : "Book engineer"}
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const steps = [
    <OptionStep
      key="system"
      title="What system do you use today?"
      options={systems}
      selected={answers.system}
      onPick={(v) => setAnswers((a) => ({ ...a, system: v }))}
    />,
    <OptionStep
      key="subs"
      title="How many active subscribers?"
      options={subscriberBuckets}
      selected={answers.subscribers}
      onPick={(v) => setAnswers((a) => ({ ...a, subscribers: v }))}
    />,
    <OptionStep
      key="equip"
      title="What equipment do you manage?"
      options={equipmentOptions}
      selected={answers.equipment}
      onPick={(v) => toggle("equipment", v)}
      multi
    />,
    <OptionStep
      key="pay"
      title="How do customers pay?"
      options={paymentOptions}
      selected={answers.payments}
      onPick={(v) => toggle("payments", v)}
      multi
    />,
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
          Question {step + 1} of {steps.length}
        </p>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-blue-700" : "bg-slate-800"
              }`}
            />
          ))}
        </div>
      </div>

      {steps[step]}

      <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => canNext && setStep((s) => s + 1)}
            disabled={!canNext}
            className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-500 ease-in-out enabled:hover:bg-blue-800 enabled:hover:text-white disabled:opacity-40"
          >
            Next
            <ArrowRight className="size-4 transition-all duration-500 group-enabled:group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDone(true)}
            className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
          >
            See my plan
            <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
}
