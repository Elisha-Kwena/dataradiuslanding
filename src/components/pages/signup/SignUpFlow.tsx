"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import Logo from "@/components/common/Logo";
import markWhite from "../../../../public/mark-white.svg";
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
              <span className={`text-sm ${current ? "text-white" : done ? "text-slate-300" : "text-slate-600"}`}>
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

/* --------------------------- brand panel (left) --------------------------- */

function BrandPanel() {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 p-10 lg:flex">
      {/* deep navy wash + brand sector mark texture, no canvas */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(30,64,175,0.32),transparent_55%),linear-gradient(180deg,#0a0f1e, #05070d)]"
      />
      <Image
        aria-hidden
        src={markWhite}
        alt=""
        className="pointer-events-none absolute -bottom-24 -left-24 size-96 opacity-[0.05]"
      />

      <div className="relative">
        <Logo />
        <h2 className="mt-10 font-akhirtahun text-[28px] font-extrabold leading-snug tracking-tight">
          Your workspace is ready in a minute.
        </h2>
      </div>

      <ul className="relative flex flex-col gap-3.5">
        {FACTS.map((fact) => (
          <li key={fact} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
            <Check aria-hidden className="mt-0.5 size-4 flex-none text-blue-500" />
            {fact}
          </li>
        ))}
      </ul>

      <div className="relative border-t border-white/10 pt-6">
        <Link
          href="/status"
          className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 transition-colors hover:text-white"
        >
          <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
          All systems operational
        </Link>
      </div>
    </aside>
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

  // no visible scrollbars anywhere on the auth page
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add("scrollbar-hide");
    return () => el.classList.remove("scrollbar-hide");
  }, []);

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
    <div className="relative min-h-screen bg-black text-white lg:flex lg:h-screen lg:items-center lg:justify-center lg:overflow-hidden lg:p-10">
      {/* page ambience, pure CSS */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,64,175,0.14),transparent_55%)]"
      />

      {/* card: full-bleed column on mobile, centered split card on desktop */}
      <div className="relative grid min-h-screen w-full grid-cols-1 lg:h-[min(700px,94dvh)] lg:min-h-0 lg:max-w-5xl lg:grid-cols-[400px_minmax(0,1fr)] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-white/10 lg:bg-white/[0.02] lg:shadow-2xl lg:shadow-black/60">
        <BrandPanel />

        <div className="scrollbar-hide flex min-h-screen min-w-0 flex-col px-3 py-4 sm:px-4 lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <header className="flex items-center justify-between gap-4">
            <span className="lg:hidden">
              <Logo />
            </span>
          </header>

          <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-6 py-8 lg:py-5">
            {!submitted && <Stepper step={step} />}

            <div key={submitted ? "done" : step} className="flex flex-col gap-7 transition duration-500 starting:translate-y-3 starting:opacity-0">
              <div>
                <h1 className="font-akhirtahun text-3xl font-extrabold leading-tight">
                  {submitted ? "Check your email" : "Create your workspace"}
                </h1>
                <p className="mt-2 font-serif text-[15px] text-slate-400">
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

          <footer className="text-xs flex items-center gap-2 justify-center text-slate-600">
            Have a question? <Link href="contact" className="flex font-xtrabold text-white">Contact us</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
