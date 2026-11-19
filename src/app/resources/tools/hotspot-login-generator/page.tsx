import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HotspotLoginGenerator from "@/components/pages/tools/HotspotLoginGenerator";

export const metadata: Metadata = {
  title: "Hotspot login page generator | Free ISP tools",
  description:
    "Pick a layout, set your colours and logo, then copy the HTML for a MikroTik captive portal login page.",
};

export default function HotspotGeneratorPage() {
  return (
    <main className="min-h-screen w-full bg-black px-4 pb-20 pt-32 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/resources/tools"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="size-3.5" /> All tools
        </Link>
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-400">Free tool</p>
          <h1 className="mt-3 font-akhirtahun text-2xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Hotspot login page <span className="text-blue-800">generator.</span>
          </h1>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Pick a layout, set your colours and name: copy ready-to-upload
            HTML for a MikroTik captive portal login page.
          </p>
        </div>
        <HotspotLoginGenerator />
      </div>
    </main>
  );
}
