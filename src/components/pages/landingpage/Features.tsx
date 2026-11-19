import { Check } from "lucide-react";
import CopyButton from "./CopyButton";
import MpesaFlow from "./MpesaFlow";
import SubscriberStatus from "./SubscriberStatus";
import SiteHealth from "./SiteHealth";

const radiusScript = `# MikroTik
/radius add service=hotspot
    address=radius.dataradius.co.ke
    secret=••••••••
/ip hotspot profile set default
    use-radius=yes`;

function Card({
  title,
  body,
  className = "",
  children,
}: {
  title: string;
  body: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <h3 className="font-autobus text-lg text-white">{title}</h3>
      <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">{body}</p>
      <div className="mt-auto pt-6">{children}</div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="flex w-full justify-center px-1 md:px-4 py-24 bg-black">
      <div className="w-[90%] mx-auto">
        {/* heading */}
        <div className="w-full">
          <h2 className="font-akhirtahun text-2xl md:text-6xl font-extrabold leading-tight text-white">
            Everything between the
            <br />
            router and the shilling.
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-slate-400">
            We studied global ISP suites, hotspot tools and Kenyan MikroTik
            billers. These are the pieces operators actually need, in one
            product.
          </p>
        </div>

        {/* bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* M-Pesa */}
          <Card
            title="M-Pesa that closes the loop"
            body="STK Push, Paybill and Till. Every payment is matched to a session or invoice, then the router is told to let the customer through."
            className="md:col-span-2 lg:col-span-4"
          >
            <MpesaFlow />
          </Card>

          {/* Cloud RADIUS */}
          <Card
            title="Cloud RADIUS"
            body="Nothing to host or patch. Paste one script."
            className="lg:col-span-2"
          >
            <div className="relative rounded-xl border border-white/10 bg-black/40 p-4">
              <div className="absolute right-3 top-3">
                <CopyButton text={radiusScript} />
              </div>
              <div className="font-mono text-xs leading-6">
                <p className="text-slate-600"># MikroTik</p>
                <p>
                  <span className="text-violet-300">/radius add</span>{" "}
                  <span className="text-slate-400">service=hotspot</span>
                </p>
                <p className="pl-4 text-slate-400">
                  address=<span className="text-slate-200">radius.dataradius.co.ke</span>
                </p>
                <p className="pl-4 text-slate-400">secret=••••••••</p>
                <p>
                  <span className="text-violet-300">/ip hotspot profile set</span>{" "}
                  <span className="text-slate-400">default</span>
                </p>
                <p className="pl-4 text-slate-400">
                  use-radius=<span className="text-slate-200">yes</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Auto disconnect */}
          <Card
            title="Auto disconnect & reconnect"
            body="Overdue clients see a pay page. Paying restores service."
            className="lg:col-span-2"
          >
            <SubscriberStatus />
          </Card>

          {/* Vouchers */}
          <Card
            title="Vouchers for cash agents"
            body="Print in bulk, track every code."
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                24 hours · KES 100
              </p>
              <p className="mt-2.5 font-ibmblockserif text-xl tracking-[0.15em] text-slate-100">
                WB-7K2P-9QXM
              </p>
              <button
                type="button"
                className="mt-3.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[10px] text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Generate batch
              </button>
            </div>
          </Card>

          {/* Alerts */}
          <Card
            title="Alerts that run themselves"
            body="Expiry reminders and receipts by SMS."
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-2">
              <p className="max-w-[85%] font-serif rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-slate-300">
                Your 24 Hours plan expires in 1 hour. Pay via M-Pesa to stay online.
              </p>
              <p className="flex max-w-[60%] items-center gap-1.5 self-end rounded-2xl rounded-tr-md bg-blue-600/20 px-3.5 py-2 text-xs text-blue-200">
                Paid KES 100
                <Check className="size-3" strokeWidth={3} />
              </p>
            </div>
          </Card>

          {/* Every site: custom split layout */}
          <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/2 p-6 transition-colors duration-300 hover:border-white/20 md:col-span-2 lg:col-span-6 lg:flex-row lg:items-center">
            <div className="lg:w-80 lg:flex-none">
              <h3 className="font-autobus text-lg text-white">Every site, one screen</h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-slate-400">
                Watch router health beside revenue. Know which location earns and
                which one is quietly down before a customer calls.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] text-emerald-300">
                  Multi-router
                </span>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 font-mono text-[10px] text-blue-300">
                  TR-069
                </span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 font-mono text-[10px] text-amber-300">
                  Reseller sub-accounts
                </span>
              </div>
            </div>
            <SiteHealth />
          </div>
        </div>
      </div>
    </section>
  );
}
