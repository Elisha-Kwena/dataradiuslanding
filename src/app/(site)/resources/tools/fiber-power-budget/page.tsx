import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FiberPowerBudget from "@/components/pages/tools/FiberPowerBudget";

export const metadata: Metadata = {
  title: "Fiber power budget calculator | Free ISP tools",
  description:
    "Calculate total optical loss, margin and pass/fail verdict for GPON and XGS-PON deployments.",
};

export default function FiberPowerBudgetPage() {
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
            Fiber power budget <span className="text-blue-800">calculator.</span>
          </h1>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Total optical loss, margin and a pass/fail verdict for GPON and
            XGS-PON links: before you climb the pole.
          </p>
        </div>
        <FiberPowerBudget />
      </div>
    </main>
  );
}
