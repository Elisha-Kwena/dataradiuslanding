"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

type Layout = "centered" | "split" | "minimal";

interface Inputs {
  layout: Layout;
  networkName: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonRadius: number;
  logoText: string;
  welcomeMessage: string;
  buttonLabel: string;
  footerText: string;
  showTermsLink: boolean;
}

const DEFAULTS: Inputs = {
  layout: "centered",
  networkName: "My ISP",
  primaryColor: "#1F5FD1",
  backgroundColor: "#0a0f1e",
  textColor: "#f1f5f9",
  buttonRadius: 8,
  logoText: "My ISP",
  welcomeMessage: "Sign in to get online",
  buttonLabel: "Connect",
  footerText: "Powered by My ISP",
  showTermsLink: true,
};

const inputCls =
  "h-11 w-full rounded-xl border border-slate-700 bg-black px-3.5 font-mono text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Injected into the generated page so the portal scrolls nicely on the
 *  router too, and so the preview iframe doesn't show OS scrollbars. */
const scrollbarCss = `<style>
  html{scrollbar-width:thin;scrollbar-color:rgba(128,128,128,.55) transparent}
  ::-webkit-scrollbar{width:8px;height:8px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(128,128,128,.55);border-radius:8px}
  ::-webkit-scrollbar-thumb:hover{background:rgba(128,128,128,.8)}
</style>`;

/** Simulate what RouterOS renders on first page load: no error, empty
 *  username, links as placeholders. The real variables stay in the output. */
function toPreview(html: string): string {
  return html
    .replace(/\$\(if error\)[\s\S]*?\$\(endif\)/g, "")
    .replace(/\$\(link-[a-z-]+\)/g, "#")
    .replace(/\$\((username|password)\)/g, "")
    .replace(/\$\([^)]*\)/g, "");
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</label>
      {children}
    </div>
  );
}

function generateHtml(i: Inputs): string {
  const logo = `<div style="font-size:24px;font-weight:700;color:${i.layout === "split" ? "#fff" : esc(i.primaryColor)};margin-bottom:8px">${esc(i.logoText)}</div>`;
  const terms = i.showTermsLink
    ? `<p style="margin-top:12px;font-size:12px;opacity:.6">By connecting you agree to the <a href="$(link-orig)" style="color:inherit">terms of use</a>.</p>`
    : "";
  const form = `
      <form method="post" action="$(link-login-only)" style="text-align:left">
        <input type="hidden" name="dst" value="$(link-orig)">
        <input type="hidden" name="popup" value="true">
        <label style="display:block;font-size:13px;margin-bottom:4px">Username or voucher</label>
        <input name="username" value="$(username)" required style="width:100%;padding:11px;border:1px solid #8883;border-radius:8px;font-size:15px;box-sizing:border-box;margin-bottom:14px">
        <label style="display:block;font-size:13px;margin-bottom:4px">Password</label>
        <input name="password" type="password" required style="width:100%;padding:11px;border:1px solid #8883;border-radius:8px;font-size:15px;box-sizing:border-box;margin-bottom:18px">
        <button type="submit" style="width:100%;padding:12px;background:${esc(i.primaryColor)};color:#fff;border:none;border-radius:${i.buttonRadius}px;font-size:15px;font-weight:600;cursor:pointer">${esc(i.buttonLabel)}</button>
        $(if error)<p style="color:#e5484d;font-size:13px;margin-top:10px">$(error)</p>$(endif)
      </form>`;

  if (i.layout === "split") {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(i.networkName)}: Wi-Fi</title>${scrollbarCss}</head>
<body style="margin:0;font-family:-apple-system,system-ui,sans-serif;min-height:100vh;display:flex">
  <div style="flex:1;background:${esc(i.primaryColor)};display:flex;align-items:center;justify-content:center;color:#fff;padding:40px">
    <div style="text-align:center">
      ${logo}
      <p style="font-size:15px;opacity:.85">${esc(i.welcomeMessage)}</p>
    </div>
  </div>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;background:${esc(i.backgroundColor)};color:${esc(i.textColor)};padding:40px">
    <div style="width:100%;max-width:340px">
      ${form}
      ${terms}
      <p style="margin-top:24px;font-size:12px;opacity:.5;text-align:center">${esc(i.footerText)}</p>
    </div>
  </div>
</body></html>`;
  }

  const card =
    i.layout === "minimal"
      ? `<div style="width:100%;max-width:360px;text-align:center">`
      : `<div style="width:100%;max-width:380px;background:rgba(255,255,255,.04);border:1px solid rgba(128,128,128,.25);border-radius:16px;padding:32px;text-align:center">`;
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(i.networkName)}: Wi-Fi</title>${scrollbarCss}</head>
<body style="margin:0;font-family:-apple-system,system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:${esc(i.backgroundColor)};color:${esc(i.textColor)};padding:24px">
  ${card}
    ${logo}
    <p style="font-size:14px;opacity:.7;margin-bottom:24px">${esc(i.welcomeMessage)}</p>
    ${form}
    ${terms}
    <p style="margin-top:24px;font-size:12px;opacity:.5">${esc(i.footerText)}</p>
  </div>
</body></html>`;
}

export default function HotspotLoginGenerator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => generateHtml(inputs), [inputs]);
  const preview = useMemo(() => toPreview(html), [html]);

  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInputs((s) => ({ ...s, [k]: v }));

  const copy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid max-h-[560px] content-start gap-5 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <Field label="Layout">
          <select className={inputCls} value={inputs.layout} onChange={(e) => set("layout", e.target.value as Layout)}>
            <option value="centered">Centered card</option>
            <option value="split">Split: brand left, form right</option>
            <option value="minimal">Minimal</option>
          </select>
        </Field>
        <Field label="Network name">
          <input className={inputCls} value={inputs.networkName} onChange={(e) => set("networkName", e.target.value)} />
        </Field>
        <Field label="Logo text">
          <input className={inputCls} value={inputs.logoText} onChange={(e) => set("logoText", e.target.value)} />
        </Field>
        <Field label="Welcome message">
          <input className={inputCls} value={inputs.welcomeMessage} onChange={(e) => set("welcomeMessage", e.target.value)} />
        </Field>
        <Field label="Button label">
          <input className={inputCls} value={inputs.buttonLabel} onChange={(e) => set("buttonLabel", e.target.value)} />
        </Field>
        <Field label="Footer text">
          <input className={inputCls} value={inputs.footerText} onChange={(e) => set("footerText", e.target.value)} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          {(
            [
              ["primaryColor", "Accent"],
              ["backgroundColor", "Background"],
              ["textColor", "Text"],
            ] as const
          ).map(([k, label]) => (
            <Field key={k} label={label}>
              <input
                type="color"
                className="h-11 w-full cursor-pointer rounded-xl border border-slate-700 bg-black p-1"
                value={inputs[k]}
                onChange={(e) => set(k, e.target.value)}
              />
            </Field>
          ))}
        </div>
        <Field label={`Button radius: ${inputs.buttonRadius}px`}>
          <input type="range" min={0} max={24} value={inputs.buttonRadius} onChange={(e) => set("buttonRadius", Number(e.target.value))} className="accent-blue-600" />
        </Field>
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" checked={inputs.showTermsLink} onChange={(e) => set("showTermsLink", e.target.checked)} className="size-4 accent-blue-600" />
          Show terms-of-use link
        </label>
      </div>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              Live preview <span className="normal-case tracking-normal">(first load, no error)</span>
            </p>
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black transition-colors hover:bg-blue-800 hover:text-white"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy HTML"}
            </button>
          </div>
          <iframe
            title="Hotspot login page preview"
            srcDoc={preview}
            sandbox=""
            className="h-[340px] w-full bg-white"
          />
        </div>
        <div className="min-w-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          <p className="border-b border-slate-800 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">
            login.html: upload to your MikroTik hotspot files
          </p>
          <pre className="max-h-64 overflow-auto p-5 font-mono text-[11px] leading-relaxed text-slate-400">
            {html}
          </pre>
        </div>
      </div>
    </div>
  );
}
