import Link from "next/link";
import Logo from "../common/Logo";
import CurrencySelector from "./CurrencySelector";
import { navlinks, resources } from "@/lib/navData";

const company = [
  { label: "Switch", link: "/switch" },
  { label: "Pricing", link: "/pricing" },
  { label: "Signin", link: "/signin" },
  { label: "Start free", link: "/signup" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto w-[90%] py-14">
        <div className="grid grid-cols-3 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs font-serif text-sm leading-relaxed text-slate-500">
              Billing, M-Pesa payments, routers and subscribers in one
              dashboard.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Product
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navlinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Resources
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {resources.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Company
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-600">© 2026 DataRadius</p>
            <CurrencySelector />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
            dataradius.net
          </p>
        </div>
      </div>
    </footer>
  );
}
