import type { Metadata } from "next";
import Image from "next/image";
import { Check, Download, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Brand | DataRadius",
  description: "DataRadius name, mark, colors and how to use them.",
};

const colors = [
  { name: "Radius blue", hex: "#1E40AF", className: "bg-[#1E40AF]" },
  { name: "Night", hex: "#05070D", className: "bg-[#05070D]" },
  { name: "Slate", hex: "#64748B", className: "bg-[#64748B]" },
  { name: "White", hex: "#FFFFFF", className: "bg-white" },
];

const dos = [
  "Use the mark on dark or black backgrounds where it was designed to sit",
  "Keep clear space around the mark at least equal to its height",
  "Link the mark to dataradius.net when referencing the product",
];
const donts = [
  "Recolor, stretch, outline or add effects to the mark",
  "Use the name or mark in a way that suggests endorsement",
  "Place the white mark on light or busy backgrounds",
];

export default function BrandPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Brand</p>
          <h1 className="mt-3 font-akhirtahun text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            The DataRadius name and mark.
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-slate-400">
            One name, one mark. Write it <span className="text-white">DataRadius</span>:
            capital D, capital R, one word.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-slate-800">
            <div className="grid place-items-center bg-[#05070D] px-6 py-16">
              <div className="flex items-end gap-3">
                <Image src="/mark-white.svg" alt="DataRadius mark" width={56} height={56} />
                <span className="font-fantasy text-5xl font-extrabold text-white">DataRadius</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-800 bg-slate-950 px-6 py-4">
              <p className="font-serif text-sm text-slate-400">Mark, white on night</p>
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

        <Reveal className="mt-10">
          <h2 className="font-semibold text-gray-200">Colors</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {colors.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-xl border border-slate-800">
                <div className={`h-20 ${c.className}`} />
                <div className="bg-slate-950 px-3 py-2">
                  <p className="text-xs font-medium text-slate-300">{c.name}</p>
                  <p className="font-mono text-[11px] text-slate-500">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h2 className="font-semibold text-gray-200">Do</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {dos.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 font-serif text-sm text-slate-400">
                    <Check aria-hidden className="mt-0.5 size-4 flex-none text-emerald-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h2 className="font-semibold text-gray-200">Don&apos;t</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 font-serif text-sm text-slate-400">
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
            Need a different format, or using the mark in press or a partnership?
            Write to <a href="mailto:brand@dataradius.net" className="text-white underline underline-offset-4 transition-colors hover:text-blue-400">brand@dataradius.net</a>.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
