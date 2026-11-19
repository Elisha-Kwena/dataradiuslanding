"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Link
        href="/signup"
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 transition-colors hover:bg-blue-800 hover:text-white sm:hidden"
      >
        Start 14-day free trial
      </Link>
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="grid size-11 cursor-pointer place-items-center rounded-full border border-slate-700 bg-slate-950/80 text-slate-300 shadow-lg shadow-black/40 backdrop-blur-xl transition-colors hover:border-blue-800 hover:text-blue-400"
      >
        <ArrowUp className="size-5" />
      </button>
    </div>
  );
}
