import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SubnetCalculator from "@/components/pages/tools/SubnetCalculator";

export const metadata: Metadata = {
  title: "Subnet and IP pool calculator | Free ISP tools",
  description:
    "Enter a CIDR block and get the network address, broadcast, usable host range and a suggested pool split.",
};

export default function SubnetCalculatorPage() {
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
            Subnet and IP pool <span className="text-blue-800">calculator.</span>
          </h1>
          <p className="mt-4 font-serif text-lg text-slate-400">
            Enter a CIDR block: get the network address, broadcast, usable
            host range and a suggested pool split.
          </p>
        </div>
        <SubnetCalculator />
      </div>
    </main>
  );
}
