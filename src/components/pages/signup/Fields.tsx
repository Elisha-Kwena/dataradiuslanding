"use client";

import { useState, type ReactNode } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { passwordChecks, passwordScore } from "@/lib/signup";

/* shared class strings so every control looks the same */
export const inputClass =
  "h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white placeholder:text-slate-600 transition focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800/30 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/20";

export const primaryBtn =
  "group flex h-12 items-center justify-center gap-3 rounded-full bg-white px-8 font-medium text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-black";

export const ghostBtn =
  "flex h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 text-slate-300 transition-colors duration-300 hover:border-slate-500 hover:text-white";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    />
  );
}

/** Label + control + error or hint, wired together for screen readers. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-note`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-note`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function PasswordInput({
  id,
  value,
  onChange,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        autoComplete="new-password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={`${id}-note`}
        placeholder="At least 8 characters"
        className={`${inputClass} pr-12`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition-colors hover:text-white"
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}

const meterColor = ["bg-slate-800", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-green-500"];
const meterLabel = ["", "Weak", "Fair", "Good", "Strong"];

export function PasswordMeter({ value }: { value: string }) {
  const score = passwordScore(value);
  const c = passwordChecks(value);
  const rules: [boolean, string][] = [
    [c.length, "8+ characters"],
    [c.mix, "Upper & lower case"],
    [c.number, "A number"],
    [c.symbol, "A symbol (optional)"],
  ];

  return (
    <div className="flex flex-col gap-3" aria-live="polite">
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-4 gap-1.5" role="img" aria-label={`Password strength: ${meterLabel[score] || "empty"}`}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`h-1.5 rounded-full transition-colors duration-300 ${score >= n ? meterColor[score] : "bg-slate-800"}`} />
          ))}
        </div>
        <span className="w-12 text-right font-mono text-xs text-slate-400">{meterLabel[score]}</span>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {rules.map(([ok, text]) => (
          <li key={text} className={`flex items-center gap-2 text-xs transition-colors ${ok ? "text-blue-300" : "text-slate-500"}`}>
            <span className={`grid size-4 place-items-center rounded-full border transition ${ok ? "border-blue-600 bg-blue-700 text-white" : "border-slate-700 text-transparent"}`}>
              <Check className="size-2.5" />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
