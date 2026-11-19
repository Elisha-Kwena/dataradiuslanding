"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import Logo from "@/components/common/Logo";
import {
  BRAND,
  emptySignup,
  checkSlug,
  register,
  resendCode,
  slugify,
  validateAccount,
  validateBusiness,
  validateSlug,
  type Errors,
  type SignupData,
  type SlugStatus,
} from "@/lib/signup";
import { CheckEmailStep, CredentialsStep, WorkspaceStep } from "./Steps";

const STEPS = [
  { id: "account", label: "Account" },
  { id: "workspace", label: "Workspace" },
] as const;

const FACTS = [
  "Connect a router with one command.",
  "Customers pay online; they're connected in seconds.",
  `${BRAND.trialDays} days free, no card required.`,
];

function focusFirst(errs: Errors, order: string[]) {
  const id = order.find((k) => errs[k as keyof SignupData]);
  if (id) document.getElementById(id)?.focus();
}

/* ------------------------------ stepper ------------------------------ */

function Stepper({ step }: { step: number }) {
  return (
    <ol aria-label="Sign-up progress" className="flex items-center">
      {STEPS.map((s, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <li key={s.id} aria-current={current ? "step" : undefined} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`grid size-8 place-items-center rounded-full border font-mono text-xs transition-all duration-500 ${
                  done
                    ? "border-blue-700 bg-blue-700 text-white"
                    : current
                      ? "border-blue-600 text-white"
                      : "border-slate-800 text-slate-600"
                }`}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={`hidden text-sm sm:inline ${current ? "text-white" : done ? "text-slate-300" : "text-slate-600"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 h-px flex-1 bg-slate-800">
                <div className={`h-full bg-blue-700 transition-all duration-700 ${done ? "w-full" : "w-0"}`} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* --------------------------- marketing panel --------------------------- */

function MarketingPanel() {
  return (
    <div className="relative z-10 flex w-full max-w-md flex-col">
      <h2 className="font-akhirtahun text-3xl font-extrabold leading-tight tracking-tight">
        Your workspace is ready in a minute.
      </h2>

      <ul className="mt-10 flex flex-col gap-3">
        {FACTS.map((fact) => (
          <li key={fact} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
            <span aria-hidden className="text-slate-600">
              —
            </span>
            {fact}
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-white/10 pt-6">
        <Link
          href="/status"
          className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-white"
        >
          <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
          All systems operational
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------- flow -------------------------------- */

export default function SignupFlow() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<SignupData>(emptySignup);
  const [errors, setErrors] = useState<Errors>({});
  const [slugCheck, setSlugCheck] = useState<{ slug: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");

  const set = (patch: Partial<SignupData>) => {
    setData((d) => {
      const next = { ...d, ...patch };
      // keep the workspace address in sync with the name until the user edits it
      if ("business" in patch && !d.slugEdited && !("slugEdited" in patch)) next.slug = slugify(patch.business ?? "");
      return next;
    });
    setErrors((e) => {
      const n = { ...e };
      (Object.keys(patch) as (keyof SignupData)[]).forEach((k) => delete n[k]);
      if ("business" in patch) delete n.slug;
      return n;
    });
    setFormError("");
  };

  // slug status is derived: sync states compute during render, only the
  // debounced availability result lives in state
  const slugStatus: SlugStatus =
    step !== 1 || !data.slug
      ? "idle"
      : validateSlug(data.slug)
        ? "invalid"
        : slugCheck?.slug === data.slug
          ? slugCheck.ok
            ? "available"
            : "taken"
          : "checking";

  useEffect(() => {
    if (step !== 1 || !data.slug || validateSlug(data.slug)) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const ok = await checkSlug(data.slug);
        if (!cancelled) setSlugCheck({ slug: data.slug, ok });
      } catch {
        // leave status as-is; validation still guards submission
      }
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [data.slug, step]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step, submitted]);

  const nextFromAccount = () => {
    const errs = validateAccount(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirst(errs, ["email", "password"]);
      return;
    }
    setStep(1);
  };

  const submitWorkspace = async () => {
    const errs = validateBusiness(data);
    if (!errs.slug && slugStatus === "taken") errs.slug = "That workspace address is taken. Try another.";
    if (!errs.slug && slugStatus === "checking") errs.slug = "Still checking availability, one moment.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      focusFirst(errs, ["business", "slug", "country", "phone", "size"]);
      return;
    }
    setBusy(true);
    setFormError("");
    try {
      await register(data);
      setSubmitted(true);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "We could not create your workspace. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:h-screen lg:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="flex min-h-screen min-w-0 flex-col px-6 py-8 sm:px-10 lg:min-h-0 lg:h-full lg:overflow-y-auto">
        <header className="flex items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-slate-400">
            Have an account?{" "}
            <Link href="/login" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">
              Log in
            </Link>
          </p>
        </header>

        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 py-10">
          {!submitted && <Stepper step={step} />}

          <div key={submitted ? "done" : step} className="flex flex-col gap-8 transition duration-500 starting:translate-y-3 starting:opacity-0">
            <div>
              <h1 className="font-akhirtahun text-4xl font-extrabold leading-tight">
                {submitted ? "Check your email" : "Create your workspace"}
              </h1>
              <p className="mt-3 font-serif text-slate-400">
                {submitted
                  ? `One last step before ${data.slug || "your workspace"}.${BRAND.domain} goes live.`
                  : "Start managing your network in under a minute."}
              </p>
            </div>

            {submitted ? (
              <CheckEmailStep
                email={data.email}
                slug={data.slug}
                onResend={() => resendCode(data.email)}
                onBack={() => {
                  setSubmitted(false);
                  setStep(0);
                }}
              />
            ) : step === 0 ? (
              <CredentialsStep data={data} set={set} errors={errors} onNext={nextFromAccount} />
            ) : (
              <WorkspaceStep
                data={data}
                set={set}
                errors={errors}
                slugStatus={slugStatus}
                busy={busy}
                formError={formError}
                onBack={() => setStep(0)}
                onNext={submitWorkspace}
              />
            )}
          </div>
        </main>

        <footer className="text-xs text-slate-600">
          Protected by encryption in transit and at rest. Your data stays yours.
        </footer>
      </div>

      <aside className="relative isolate hidden items-center justify-center overflow-hidden border-l border-slate-800 bg-slate-950 p-12 lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,64,175,0.18),transparent_60%)]"
        />
        <MarketingPanel />
      </aside>
    </div>
  );
}
