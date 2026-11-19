import Link from "next/link";
import Logo from "../common/Logo";
import CurrencySelector from "./CurrencySelector";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Platform", href: "/products" },
      { label: "Billing & payments", href: "/products/billing" },
      { label: "Network", href: "/products/network" },
      { label: "Fiber", href: "/products/fibre" },
      { label: "Wi-Fi hotspot", href: "/products/hotspot" },
      { label: "Field", href: "/products/field" },
      { label: "Subscribers", href: "/products/subscribers" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Switch",
    links: [
      { label: "Switch to DataRadius", href: "/switch" },
      { label: "From Splynx", href: "/switch/from-splynx" },
      { label: "From UISP", href: "/switch/from-uisp" },
      { label: "From Sonar", href: "/switch/from-sonar" },
      { label: "From Powercode", href: "/switch/from-powercode" },
      { label: "From Mikhmon", href: "/switch/from-mikhmon" },
      { label: "From spreadsheets", href: "/switch/from-spreadsheets" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Learn", href: "/resources/learn" },
      { label: "Free tools", href: "/resources/tools" },
      { label: "Changelog", href: "/changelog" },
      { label: "Docs", href: "/docs" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Contact", href: "/contact" },
      { label: "Security & trust", href: "/trust" },
      { label: "Brand", href: "/brand" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
      { label: "Sub-processors", href: "/legal/sub-processors" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto w-[90%] py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.3fr_repeat(5,1fr)] lg:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs font-serif text-sm leading-relaxed text-slate-500">
              Software that runs internet providers.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                {col.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
