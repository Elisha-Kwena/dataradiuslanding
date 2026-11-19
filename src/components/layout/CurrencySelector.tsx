"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useRegion } from "@/contexts/PricingContext";
import { REGIONS } from "@/lib/pricingConfig";

export default function CurrencySelector() {
  const { region, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-white/25 hover:text-white"
      >
        <Globe className="size-3.5" />
        <span className="font-mono">{region.selectorLabel}</span>
        <ChevronDown className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Region and currency"
          className="absolute bottom-full right-0 mb-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-black/95 p-1 backdrop-blur-xl"
        >
          {REGIONS.map((r) => (
            <li key={r.code}>
              <button
                type="button"
                role="option"
                aria-selected={region.code === r.code}
                onClick={() => {
                  setRegion(r.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                  region.code === r.code
                    ? "bg-blue-800/20 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {r.label}
                {region.code === r.code && <Check className="size-3.5 text-blue-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
