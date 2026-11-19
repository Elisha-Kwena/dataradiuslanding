import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { n: "1", title: "Import", body: "Customers, plans and balances" },
  { n: "2", title: "Run side by side", body: "Start with one site" },
  { n: "3", title: "Move routers", body: "One at a time, rollback any time" },
  { n: "4", title: "Go live", body: "When the numbers match" },
];

export default function SwitchSection() {
  return (
    <section className="w-full bg-black py-24">
      <div className="mx-auto w-[90%] max-w-4xl text-center">
        <Reveal>
          <h2 className="font-akhirtahun text-2xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Switch without
            <br />
            switching anything off.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-slate-400">
            Bring your customers, plans and balances. Run both systems side by
            side, move routers one at a time, and go live when the numbers
            match.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 text-left md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n}>
                <span className="flex size-8 items-center justify-center rounded-full border border-white/20 font-mono text-xs text-slate-300">
                  {step.n}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 font-serif text-xs leading-relaxed text-slate-500">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/switch"
              className="rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-blue-800 hover:text-blue-400"
            >
              Plan my move
            </Link>
            <Link
              href="/switch"
              className="group flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              How switching works
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
