import type { CSSProperties } from "react";

/**
 * Infinite scrolling strip ("Works with the hardware and rails you already use").
 * Pure CSS animation, so it works as a server component.
 *
 * Needs the `animate-marquee` utility from globals.css (see the @theme block).
 */

// Only list things your system really supports today.
const integrations: string[] = [
  // payments
  "M-Pesa",
  "Paystack",
  "Flutterwave",
  "Stripe",
  "Cash & bank transfer",
  // routers
  "MikroTik RouterOS",
  // OLTs & fiber
  "SmartOLT",
  "Hioso OLT",
  "Huawei OLT",
  "ZTE OLT",
  "VSOL OLT",
  "BDCOM OLT",
  "C-Data OLT",
  // customer devices
  "TR-069 / CWMP",
  // messaging
  "Bulk SMS",
  "WhatsApp Business",
  "Email (SMTP)",
  // developers
  "REST API & webhooks",
];

type MarqueeProps = {
  title?: string;
  items?: string[];
  /** seconds for one full loop (higher = slower) */
  duration?: number;
  /** scroll left-to-right instead of right-to-left */
  reverse?: boolean;
  className?: string;
};

export default function Marquee({
  title = "Works with the hardware and rails you already use",
  items = integrations,
  duration = 45,
  reverse = false,
  className = "",
}: MarqueeProps) {
  // One copy of the list. It is rendered twice so the loop is seamless:
  // the track moves left by exactly one copy (-50%) and then restarts.
  const copy = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex w-max flex-none items-center">
      {items.map((item) => (
        <li
          key={item}
          className="group/item flex flex-none items-center gap-3.5 whitespace-nowrap px-7"
        >
          <span className="font-earlybird text-lg uppercase tracking-widest text-slate-400 transition-colors duration-300 group-hover/item:text-white">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

  const style: CSSProperties = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <section aria-label={title} className={`w-full bg-black py-10 ${className}`}>
      <p className="text-center text-sm text-slate-400 mb-16">{title}</p>

      <div className="group relative overflow-hidden motion-reduce:overflow-x-auto mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          style={style}
          className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]"
        >
          {copy(false)}
          {copy(true)}
        </div>
      </div>
    </section>
  );
}