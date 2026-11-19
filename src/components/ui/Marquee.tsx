import type { CSSProperties } from "react";
import {
  Braces,
  Cable,
  MessageSquare,
  Router,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * "Works with..." integrations rail: two chip rows that scroll in opposite
 * directions. Pure CSS animation, so it stays a server component.
 *
 * Needs this in globals.css (Tailwind v4):
 *   @theme { --animate-marquee: marquee 45s linear infinite; }
 *   @keyframes marquee { to { transform: translateX(-50%); } }
 */

type Item = { label: string; icon: LucideIcon };

// Only list things your system really supports today.
const rowA: Item[] = [
  { label: "M-Pesa", icon: Wallet },
  { label: "Paystack", icon: Wallet },
  { label: "Flutterwave", icon: Wallet },
  { label: "Stripe", icon: Wallet },
  { label: "Cash & bank transfer", icon: Wallet },
  { label: "MikroTik RouterOS", icon: Router },
  { label: "TR-069 / CWMP", icon: Smartphone },
  { label: "REST API & webhooks", icon: Braces },
];

const rowB: Item[] = [
  { label: "SmartOLT", icon: Cable },
  { label: "Hioso OLT", icon: Cable },
  { label: "Huawei OLT", icon: Cable },
  { label: "ZTE OLT", icon: Cable },
  { label: "VSOL OLT", icon: Cable },
  { label: "BDCOM OLT", icon: Cable },
  { label: "C-Data OLT", icon: Cable },
  { label: "Bulk SMS", icon: MessageSquare },
  { label: "WhatsApp Business", icon: MessageSquare },
  { label: "Email (SMTP)", icon: MessageSquare },
];

function Row({
  items,
  duration,
  reverse = false,
}: {
  items: Item[];
  duration: number;
  reverse?: boolean;
}) {
  // Each copy ends with the same gap that separates the chips (pr-3), so
  // translating by exactly -50% lands on an identical frame: no jump at loop.
  const copy = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex flex-none items-center gap-3 pr-3"
    >
      {items.map(({ label, icon: Icon }) => (
        <li
          key={label}
          className="flex flex-none items-center gap-3 whitespace-nowrap rounded-full border border-slate-800 bg-slate-900/70 py-2 pl-2 pr-5 transition-colors duration-300 hover:border-blue-700 hover:bg-blue-800/20"
        >
          <span className="grid size-8 place-items-center rounded-full bg-blue-800/30 text-blue-400">
            <Icon className="size-4" />
          </span>
          <span className="text-sm font-medium text-slate-300">{label}</span>
        </li>
      ))}
    </ul>
  );

  const style: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div className="overflow-hidden motion-reduce:overflow-x-auto">
      <div
        style={style}
        className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]"
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

/**
 * Blurred edge without any gradient or mask: narrow strips that each apply a
 * backdrop blur. They overlap, so the blur compounds toward the outer edge.
 */
const edgeLayers = [
  "w-24 backdrop-blur-[1px]",
  "w-20 backdrop-blur-[2px]",
  "w-16 backdrop-blur-[3px]",
  "w-12 backdrop-blur-[5px]",
  "w-8 backdrop-blur-[8px]",
];

function BlurEdge({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 z-10 ${side === "left" ? "left-0" : "right-0"}`}
    >
      {edgeLayers.map((layer) => (
        <div
          key={layer}
          className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} ${layer}`}
        />
      ))}
    </div>
  );
}

export default function Marquee({
  title = "Works with the hardware and rails you already use",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const total = rowA.length + rowB.length;

  return (
    <section
      aria-label={title}
      className={`mx-auto w-[90%] py-12 ${className}`}
    >
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">
          <span>Payments</span>
          <i className="size-1 rounded-full bg-slate-700" />
          <span>Routers</span>
          <i className="size-1 rounded-full bg-slate-700" />
          <span>OLTs</span>
          <i className="size-1 rounded-full bg-slate-700" />
          <span>Messaging</span>
          <i className="size-1 rounded-full bg-slate-700" />
          <span>APIs</span>
          <span className="ml-2 rounded-full border border-blue-800 bg-blue-800/20 px-2 py-0.5 text-blue-300">
            {total} integrations
          </span>
        </div>
      </div>

      <div className="group relative flex flex-col gap-3 overflow-hidden border-y border-slate-800 bg-black py-5">
        <Row items={rowA} duration={50} />
        <Row items={rowB} duration={60} reverse />
        <BlurEdge side="left" />
        <BlurEdge side="right" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-black to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-black to-transparent sm:w-28"
        />
      </div>
    </section>
  );
}