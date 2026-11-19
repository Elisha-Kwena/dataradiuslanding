"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_REGION,
  getRegion,
  REGIONS,
  type Region,
  type RegionPricing,
} from "../lib/pricingConfig";

const STORAGE_KEY = "dr-region";
const CHANGE_EVENT = "dr-region-change";

type RegionCtx = {
  region: RegionPricing;
  setRegion: (r: Region) => void;
  /** Format an amount (in the region's own display units) as a currency string. */
  money: (n: number) => string;
};

const RegionContext = createContext<RegionCtx | null>(null);

function readStored(): Region {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && REGIONS.some((r) => r.code === stored)) {
      return stored as Region;
    }
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_REGION;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // SSR + first client render see DEFAULT_REGION; the stored preference
  // applies once hydrated
  const code = useSyncExternalStore(
    subscribe,
    readStored,
    () => DEFAULT_REGION,
  );
  const region = getRegion(code);

  const setRegion = useCallback((r: Region) => {
    try {
      localStorage.setItem(STORAGE_KEY, r);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const money = useCallback(
    (n: number) =>
      new Intl.NumberFormat(region.locale, {
        style: "currency",
        currency: region.currencyCode,
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
      }).format(n),
    [region],
  );

  return (
    <RegionContext.Provider value={{ region, setRegion, money }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used inside <CurrencyProvider>");
  return ctx;
}

type RegionField = "subscriberRate" | "monthlyMinimum" | "activationFee";

/**
 * Renders an amount in the selected region's currency.
 * Pass `amount` for a value already in the region's display units, or `of`
 * for a price-book field resolved per region.
 */
export function Money({ amount, of }: { amount?: number; of?: RegionField }) {
  const { money, region } = useRegion();
  return <>{money(amount ?? region[of ?? "subscriberRate"])}</>;
}

/** Quick KES/USD switch. The full region list lives in the footer selector. */
export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { region, setRegion } = useRegion();
  const options: { code: Region; label: string }[] = [
    { code: "KE", label: "KES" },
    { code: "US_CA", label: "USD" },
  ];
  return (
    <div
      role="group"
      aria-label="Currency"
      className={`inline-flex rounded-full border border-slate-700 bg-black/60 p-1 backdrop-blur-sm ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          aria-pressed={region.code === o.code}
          onClick={() => setRegion(o.code)}
          className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-300 ${
            region.code === o.code
              ? "bg-blue-800 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
