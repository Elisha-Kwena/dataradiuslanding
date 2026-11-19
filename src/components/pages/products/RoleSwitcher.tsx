"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Role = {
  id: string;
  label: string;
  title: string;
  description: string;
  modules: { name: string; href?: string }[];
};

const roles: Role[] = [
  {
    id: "owner",
    label: "Owner",
    title: "The whole business, one screen.",
    description:
      "Revenue, subscriber growth, network health, field activity and monthly close: all from the dashboard. Drill into any module without switching tools.",
    modules: [
      { name: "Dashboard" },
      { name: "Reports" },
      { name: "Billing", href: "/products/billing" },
      { name: "Network", href: "/products/network" },
    ],
  },
  {
    id: "network",
    label: "Network",
    title: "Every router and access point, remotely.",
    description:
      "Live health for every device, remote commands, automatic reprovisioning on brownout, and customer CPE management: without SSH.",
    modules: [
      { name: "Network", href: "/products/network" },
      { name: "Fiber", href: "/products/fiber" },
      { name: "Subscribers", href: "/products/subscribers" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    title: "Every payment matched, every late payer handled.",
    description:
      "Invoices, collections, mobile money, cards, bank transfers and cash: reconciled automatically. Disconnect on non-payment, reconnect on payment, credits on outage.",
    modules: [
      { name: "Billing", href: "/products/billing" },
      { name: "Reports" },
      { name: "Subscribers", href: "/products/subscribers" },
    ],
  },
  {
    id: "support",
    label: "Support",
    title: "Resolve without escalating.",
    description:
      "See the subscriber's connection status, payment history, router health and open tickets in one view. Act on anything without asking another team.",
    modules: [
      { name: "Subscribers", href: "/products/subscribers" },
      { name: "Network", href: "/products/network" },
      { name: "Field", href: "/products/field" },
    ],
  },
  {
    id: "technician",
    label: "Technician",
    title: "Jobs, routes and stock: on the phone.",
    description:
      "See today's jobs on a map, navigate to the site, log materials used, take photos and close the job. Works offline.",
    modules: [
      { name: "Field", href: "/products/field" },
      { name: "Network", href: "/products/network" },
    ],
  },
  {
    id: "stores",
    label: "Stores",
    title: "Sell vouchers and collect payments.",
    description:
      "Generate and sell hotspot vouchers, accept walk-in payments, and track stock: from a phone or a shop terminal.",
    modules: [
      { name: "Hotspot", href: "/products/hotspot" },
      { name: "Billing", href: "/products/billing" },
    ],
  },
];

export default function RoleSwitcher() {
  const [active, setActive] = useState(roles[0].id);
  const role = roles.find((r) => r.id === active) ?? roles[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Pick a role"
        className="flex flex-wrap gap-2.5"
      >
        {roles.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={active === r.id}
            onClick={() => setActive(r.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
              active === r.id
                ? "border-blue-700 bg-blue-800/20 text-white"
                : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500 hover:text-white"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div
        key={role.id}
        className="mt-8 flex flex-col justify-between gap-8 rounded-3xl border border-slate-800 bg-slate-950 p-6 md:flex-row md:items-end md:p-10"
      >
        <div className="max-w-xl">
          <h3 className="font-akhirtahun text-2xl font-extrabold text-white md:text-3xl">
            {role.title}
          </h3>
          <p className="mt-3 font-serif leading-relaxed text-slate-400">
            {role.description}
          </p>
        </div>
        <div className="flex flex-none flex-wrap gap-2 md:justify-end">
          {role.modules.map((m) =>
            m.href ? (
              <Link
                key={m.name}
                href={m.href}
                className="group/mod flex items-center gap-1.5 rounded-full border border-slate-700 bg-black px-4 py-2 font-mono text-xs text-slate-300 transition-colors hover:border-blue-700 hover:text-blue-400"
              >
                {m.name}
                <ArrowRight className="size-3 transition-transform duration-300 group-hover/mod:translate-x-0.5" />
              </Link>
            ) : (
              <span
                key={m.name}
                className="rounded-full border border-slate-800 bg-black px-4 py-2 font-mono text-xs text-slate-500"
              >
                {m.name}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
