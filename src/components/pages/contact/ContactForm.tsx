"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import Select from "@/components/ui/Select";
import { Field, inputClass, primaryBtn, Spinner } from "@/components/pages/signup/Fields";

const SUBSCRIBER_RANGES = ["1-100", "101-500", "501-2000", "2001-10000", "10000+"] as const;

const TOPICS = [
  { value: "sales", label: "Sales: starting or growing" },
  { value: "migration", label: "Migration: switching from another system" },
  { value: "support", label: "Support: existing workspace" },
  { value: "partners", label: "Partners & resellers" },
  { value: "press", label: "Press & media" },
  { value: "other", label: "Something else" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [subscriberRange, setSubscriberRange] = useState("");
  const [topic, setTopic] = useState("sales");
  const [sentTo, setSentTo] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const fieldErrors: Record<string, string> = {};
    if (!name) fieldErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Enter a valid email address.";
    if (message.length < 10) fieldErrors.message = "Write a message.";
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: String(form.get("company") ?? "").trim(),
          country: String(form.get("country") ?? "").trim(),
          subscriberRange: subscriberRange || undefined,
          topic,
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setSentTo(email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-emerald-700/50 bg-emerald-950/30 p-6"
      >
        <CheckCircle2 aria-hidden className="mt-0.5 size-5 flex-none text-emerald-400" />
        <p className="font-serif text-sm leading-relaxed text-emerald-200">
          Sent. We&apos;ll reply to <span className="font-medium text-white">{sentTo}</span> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-note" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="contact-email" label="Work email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-note" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-company" label="Company or ISP (optional)">
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            placeholder="Your company or ISP name"
            className={inputClass}
          />
        </Field>
        <Field id="contact-country" label="Country (optional)">
          <input
            id="contact-country"
            name="country"
            autoComplete="country-name"
            placeholder="Where your business operates"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-subscribers" label="Number of subscribers (optional)">
          <Select
            id="contact-subscribers"
            value={subscriberRange}
            onChange={setSubscriberRange}
            options={SUBSCRIBER_RANGES.map((range) => ({ value: range, label: range }))}
            placeholder="Select a range"
            variant="form"
          />
        </Field>
        <Field id="contact-topic" label="What is this about?">
          <Select
            id="contact-topic"
            value={topic}
            onChange={setTopic}
            options={TOPICS.map((t) => ({ value: t.value, label: t.label }))}
            variant="form"
          />
        </Field>
      </div>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-note" : undefined}
          className={`${inputClass} h-auto resize-y py-3`}
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-400">
          Something went wrong. Try again or email hello@dataradius.net.
        </p>
      ) : null}

      <button type="submit" disabled={status === "submitting"} className={`${primaryBtn} self-start`}>
        {status === "submitting" ? (
          <>
            <Spinner />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
