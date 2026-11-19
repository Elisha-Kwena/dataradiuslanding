import type { Metadata } from "next";
import Image from "next/image";
import { Check, Download, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Press kit — DataRadius",
  description:
    "DataRadius logo, wordmark, colour palette and typography for press and partners. Download SVG and PNG assets.",
};

const colours = [
  { name: "Paper", hex: "#EEEFEA", description: "Page background, map base" },
  { name: "Ink", hex: "#0B1220", description: "Primary text, headings" },
  { name: "Signal", hex: "#0E7C66", description: "Brand accent, primary button, online status" },
  { name: "Signal (dark)", hex: "#3CE0A6", description: "Brand accent on dark backgrounds" },
  { name: "Night", hex: "#0B1016", description: "Dark sections, dark cards" },
  { name: "Due", hex: "#C9850F", description: "Payment due, warnings" },
  { name: "Alert", hex: "#D2483A", description: "Outages, errors" },
];

const typefaces = [
  { face: "Schibsted Grotesk", role: "Headings, display numerals", spec: "Weight 500–600 · Tracking −0.034 em" },
  { face: "Inter", role: "Body text, interface", spec: "17 px body · 20 px lead" },
  { face: "JetBrains Mono", role: "Time stamps, amounts, IDs", spec: "10.5–14 px · Tracking +0.04 em" },
];

const rules = [
  "Clear space: at least the arc radius × 0.25 (five grid units) on every side of the mark.",
  "Minimum size: 16 px for the mark alone, 88 px for any lockup.",
  'Always write "DataRadius" as one word with a capital D and R.',
  "Use only the provided colour variants. Never recolour the mark or wordmark.",
];

const donts = [
  "Place the logo on gradients, photographs or busy backgrounds.",
  "Add shadows, outlines, bevels or effects to the mark.",
  "Stretch, rotate or crop the mark or lockups.",
  "Use the old Radius D mark or Funnel Display wordmark.",
  'Separate "DataRadius" into two words or change its capitalisation.',
];

export default function BrandPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Press kit</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Press kit.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            DataRadius is billing, subscriber management and network monitoring
            software for internet service providers. Use these assets when
            writing about or featuring DataRadius.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-semibold text-gray-200">Logo downloads</h2>
          <p className="mt-2 font-serif text-sm text-slate-400">
            The Sector mark, wordmark and lockups in SVG (vector) and PNG
            (raster). Use the version that fits your layout.
          </p>
          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-800">
            <div className="grid place-items-center bg-[#0B1016] px-6 py-16">
              <div className="flex items-end gap-3">
                <Image src="/mark-white.svg" alt="DataRadius mark" width={56} height={56} />
                <span className="font-fantasy text-5xl font-extrabold text-white">DataRadius</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-800 bg-slate-950 px-6 py-4">
              <p className="font-serif text-sm text-slate-400">Mark on Night</p>
              <a
                href="/mark-white.svg"
                download="dataradius-mark.svg"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-blue-800 hover:text-white"
              >
                <Download className="size-4" /> SVG
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <h2 className="font-semibold text-gray-200">PNG exports</h2>
          <p className="mt-2 font-serif text-sm text-slate-400">
            Pre-rendered at 2× on Paper, Night and Signal backgrounds.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "on Paper", bg: "#EEEFEA", dark: false },
              { label: "on Night", bg: "#0B1016", dark: true },
              { label: "on Signal", bg: "#0E7C66", dark: true },
            ].map((v) => (
              <div key={v.label} className="overflow-hidden rounded-xl border border-slate-800">
                <div className="grid h-24 place-items-center" style={{ backgroundColor: v.bg }}>
                  <Image
                    src={v.dark ? "/mark-white.svg" : "/mark.svg"}
                    alt={`DataRadius mark ${v.label}`}
                    width={36}
                    height={36}
                  />
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-3 py-2.5">
                  <p className="font-serif text-xs text-slate-400">{v.label}</p>
                  <a
                    href={v.dark ? "/mark-white.svg" : "/mark.svg"}
                    download={`dataradius-mark-${v.label.replace(/\s+/g, "-").toLowerCase()}.svg`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400 transition-colors hover:text-white"
                  >
                    <Download className="size-3.5" /> PNG
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-semibold text-gray-200">Colour palette</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {colours.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-xl border border-slate-800">
                <div className="h-16 border-b border-slate-800" style={{ backgroundColor: c.hex }} />
                <div className="bg-slate-950 px-3 py-2">
                  <p className="text-xs font-medium text-slate-300">{c.name}</p>
                  <p className="font-mono text-[11px] text-slate-500">{c.hex}</p>
                  <p className="mt-1 font-serif text-[11px] leading-snug text-slate-600">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="font-semibold text-gray-200">Typography</h2>
          <p className="mt-2 font-serif text-sm text-slate-400">
            Three typefaces, each with a distinct role. All are open-source.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {typefaces.map((t) => (
              <div key={t.face} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="font-semibold text-gray-200">{t.face}</p>
                <p className="mt-1 font-serif text-sm text-slate-400">{t.role}</p>
                <p className="mt-2 font-mono text-[11px] text-slate-500">{t.spec}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h2 className="font-semibold text-gray-200">Usage rules</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {rules.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                    <Check aria-hidden className="mt-0.5 size-4 flex-none text-emerald-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h2 className="font-semibold text-gray-200">Don&apos;ts</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 font-serif text-sm leading-relaxed text-slate-400">
                    <X aria-hidden className="mt-0.5 size-4 flex-none text-red-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <p className="font-serif text-sm text-slate-500">
            Writing about DataRadius?{" "}
            <a href="mailto:hello@dataradius.net" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">
              hello@dataradius.net
            </a>
          </p>
        </Reveal>
      </div>
    </main>
  );
}
