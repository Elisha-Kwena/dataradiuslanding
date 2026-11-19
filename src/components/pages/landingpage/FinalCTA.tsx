import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(30,64,175,0.22),transparent_70%)]"
      />
      <div className="relative mx-auto flex w-[90%] max-w-3xl flex-col items-center text-center">
        <Reveal>
          <h2 className="font-akhirtahun text-2xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Run the whole ISP
            <br />
            from one screen.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-slate-400">
            14-day free trial. No card needed. Your first M-Pesa payment can be
            live today.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-full bg-white p-4 px-8 text-black transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            >
              <span>Start 14-day free trial</span>
              <ArrowRight className="transition-all duration-500 ease-in-out group-hover:translate-x-2" />
            </Link>
            <Link
              href="/switch"
              className="rounded-full border-2 border-transparent p-4 px-8 text-white transition-all duration-500 ease-in-out hover:border-blue-800 hover:text-blue-800"
            >
              See how switching works
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
