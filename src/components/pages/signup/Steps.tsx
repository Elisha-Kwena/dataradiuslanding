"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, MailCheck, X } from "lucide-react";
import {
  BRAND,
  COUNTRIES,
  SIZE_BANDS,
  getCountry,
  isDemo,
  type Errors,
  type SignupData,
  type SlugStatus,
} from "@/lib/signup";
import {
  Field,
  PasswordInput,
  PasswordMeter,
  Spinner,
  ghostBtn,
  inputClass,
  primaryBtn,
} from "@/components/pages/signup/Fields";

type Patch = (p: Partial<SignupData>) => void;

/* --------------------------- step 1: credentials --------------------------- */

export function CredentialsStep({
  data,
  set,
  errors,
  onNext,
}: {
  data: SignupData;
  set: Patch;
  errors: Errors;
  onNext: () => void;
}) {
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-6"
    >
      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={(e) => set({ email: e.target.value })}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-note"
          className={inputClass}
        />
      </Field>

      <Field id="password" label="Password" error={errors.password}>
        <PasswordInput
          id="password"
          value={data.password}
          onChange={(v) => set({ password: v })}
          invalid={Boolean(errors.password)}
        />
        <PasswordMeter value={data.password} />
      </Field>

      <button type="submit" className={primaryBtn}>
        Continue <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

/* ---------------------------- step 2: workspace ---------------------------- */

function SlugHint({ status }: { status: SlugStatus }) {
  if (status === "checking")
    return (
      <span className="flex items-center gap-2 text-slate-400">
        <Spinner className="size-3" /> Checking availability
      </span>
    );
  if (status === "available")
    return (
      <span className="flex items-center gap-2 text-emerald-400">
        <Check className="size-3.5" /> Available
      </span>
    );
  if (status === "taken")
    return (
      <span className="flex items-center gap-2 text-red-400">
        <X className="size-3.5" /> Already taken, try another
      </span>
    );
  return null;
}

export function WorkspaceStep({
  data,
  set,
  errors,
  slugStatus,
  busy,
  formError,
  onBack,
  onNext,
}: {
  data: SignupData;
  set: Patch;
  errors: Errors;
  slugStatus: SlugStatus;
  busy: boolean;
  formError: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const phoneCode = getCountry(data.country).phoneCode;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-6"
    >
      <Field id="business" label="ISP name" error={errors.business}>
        <input
          id="business"
          autoComplete="organization"
          placeholder="Your ISP or company name"
          value={data.business}
          onChange={(e) => set({ business: e.target.value })}
          aria-invalid={Boolean(errors.business)}
          aria-describedby="business-note"
          className={inputClass}
        />
      </Field>

      <Field
        id="slug"
        label="Workspace address"
        error={errors.slug}
        hint={<SlugHint status={slugStatus} />}
      >
        <div
          className={`flex h-12 w-full items-center overflow-hidden rounded-xl border bg-slate-950 transition focus-within:ring-4 ${
            errors.slug
              ? "border-red-600 focus-within:ring-red-600/20"
              : "border-slate-700 focus-within:border-blue-700 focus-within:ring-blue-800/30"
          }`}
        >
          <input
            id="slug"
            autoComplete="off"
            spellCheck={false}
            placeholder="your-company"
            value={data.slug}
            onChange={(e) => set({ slug: e.target.value.toLowerCase(), slugEdited: true })}
            aria-invalid={Boolean(errors.slug)}
            aria-describedby="slug-note"
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-white placeholder:text-slate-600 focus:outline-none"
          />
          <span className="pr-4 font-mono text-sm text-slate-500">.{BRAND.domain}</span>
        </div>
      </Field>

      <Field id="country" label="Country" error={errors.country}>
        <select
          id="country"
          value={data.country}
          onChange={(e) => set({ country: e.target.value })}
          aria-invalid={Boolean(errors.country)}
          aria-describedby="country-note"
          className={`${inputClass} appearance-none`}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="phone"
        label="Phone number"
        error={errors.phone}
        hint="We use this to send you login codes and critical alerts about your network. It is never shared or used for marketing."
      >
        <div
          className={`flex h-12 w-full items-center overflow-hidden rounded-xl border bg-slate-950 transition focus-within:ring-4 ${
            errors.phone
              ? "border-red-600 focus-within:ring-red-600/20"
              : "border-slate-700 focus-within:border-blue-700 focus-within:ring-blue-800/30"
          }`}
        >
          <span className="border-r border-slate-800 px-4 font-mono text-sm text-slate-400">
            {phoneCode}
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="712 345 678"
            value={data.phone}
            onChange={(e) => set({ phone: e.target.value })}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-note"
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-white placeholder:text-slate-600 focus:outline-none"
          />
        </div>
      </Field>

      <Field id="size" label="Subscriber count" error={errors.size}>
        <select
          id="size"
          value={data.size}
          onChange={(e) => set({ size: e.target.value as SignupData["size"] })}
          aria-invalid={Boolean(errors.size)}
          aria-describedby="size-note"
          className={`${inputClass} appearance-none ${data.size ? "" : "text-slate-600"}`}
        >
          <option value="" disabled>
            How many subscribers do you serve?
          </option>
          {SIZE_BANDS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
      </Field>

      {formError && (
        <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {formError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} className={ghostBtn} aria-label="Back to account details">
          <ArrowLeft className="size-5" />
        </button>
        <button type="submit" disabled={busy} className={`${primaryBtn} flex-1`}>
          {busy ? (
            <>
              <Spinner /> Creating workspace
            </>
          ) : (
            "Create workspace"
          )}
        </button>
      </div>

      {isDemo && (
        <p className="text-center text-xs text-slate-600">
          Demo mode: no account is created and nothing leaves your browser.
        </p>
      )}
    </form>
  );
}

/* --------------------------- after submit: email --------------------------- */

export function CheckEmailStep({
  email,
  slug,
  onResend,
  onBack,
}: {
  email: string;
  slug: string;
  onResend: () => Promise<void>;
  onBack: () => void;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const resend = async () => {
    setState("sending");
    try {
      await onResend();
    } finally {
      setState("sent");
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <span className="grid size-14 place-items-center rounded-2xl border border-blue-800/60 bg-blue-800/15 text-blue-400">
        <MailCheck className="size-7" />
      </span>
      <div>
        <p className="font-serif leading-relaxed text-slate-400">
          We sent a sign-in link to <span className="text-white">{email}</span>. Open it to verify
          your email and launch{" "}
          <span className="font-mono text-blue-300">
            {slug}.{BRAND.domain}
          </span>
          .
        </p>
      </div>
      <button type="button" onClick={resend} disabled={state !== "idle"} className={ghostBtn}>
        {state === "sending" ? (
          <>
            <Spinner /> Sending
          </>
        ) : state === "sent" ? (
          <>
            <Check className="size-4 text-emerald-400" /> Sent, check your inbox
          </>
        ) : (
          "Resend email"
        )}
      </button>
      <p className="text-sm text-slate-500">
        Wrong email?{" "}
        <button type="button" onClick={onBack} className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">
          Go back
        </button>
        {" · "}
        <Link href="/" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">
          Back to site
        </Link>
      </p>
    </div>
  );
}
