"use client";

import { useMemo, useState } from "react";

function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return -1;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function numberToIp(n: number): string {
  return `${(n >>> 24) & 0xff}.${(n >>> 16) & 0xff}.${(n >>> 8) & 0xff}.${n & 0xff}`;
}

function getIpClass(firstOctet: number): string {
  if (firstOctet < 128) return "A";
  if (firstOctet < 192) return "B";
  if (firstOctet < 224) return "C";
  if (firstOctet < 240) return "D (multicast)";
  return "E (reserved)";
}

function isPrivateIp(ip: number): boolean {
  const first = (ip >>> 24) & 0xff;
  const second = (ip >>> 16) & 0xff;
  return first === 10 || (first === 172 && second >= 16 && second <= 31) || (first === 192 && second === 168);
}

const inputCls =
  "h-11 w-full rounded-xl border border-slate-700 bg-black px-3.5 font-mono text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";
const selectCls = inputCls;

function Row({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800/60 py-2.5 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`${mono ? "font-mono" : ""} text-sm text-slate-100`}>{value}</span>
    </div>
  );
}

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState("10.0.0.0");
  const [cidr, setCidr] = useState(24);

  const r = useMemo(() => {
    const ipNum = ipToNumber(ipAddress);
    if (ipNum === -1) return { valid: false as const };

    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const wildcard = ~mask >>> 0;
    const network = (ipNum & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

    return {
      valid: true as const,
      networkAddress: numberToIp(network),
      broadcastAddress: numberToIp(broadcast),
      firstUsable: numberToIp(cidr >= 31 ? network : (network + 1) >>> 0),
      lastUsable: numberToIp(cidr >= 31 ? broadcast : (broadcast - 1) >>> 0),
      subnetMask: numberToIp(mask),
      wildcardMask: numberToIp(wildcard),
      totalHosts,
      usableHosts,
      cidrNotation: `${numberToIp(network)}/${cidr}`,
      ipClass: getIpClass((network >>> 24) & 0xff),
      isPrivate: isPrivateIp(network),
    };
  }, [ipAddress, cidr]);

  const splits = useMemo(() => {
    if (cidr >= 30) return [];
    return [1, 2, 3].map((add) => {
      const c = cidr + add;
      return { cidr: c, subnets: Math.pow(2, add), hostsPerSubnet: Math.max(0, Math.pow(2, 32 - c) - 2) };
    });
  }, [cidr]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ip" className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            IP address
          </label>
          <input
            id="ip"
            className={inputCls}
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="10.0.0.0"
            inputMode="decimal"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cidr" className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Prefix (CIDR)
          </label>
          <select id="cidr" className={selectCls} value={cidr} onChange={(e) => setCidr(Number(e.target.value))}>
            {Array.from({ length: 33 }, (_, i) => (
              <option key={i} value={i}>
                /{i}: {Math.pow(2, 32 - i).toLocaleString("en-US")} addresses
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
          Enter any address in the block: the network address is computed for you.
          Common ISP pools: /22 for a village POP, /24 per OLT port, /30 per point-to-point link.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-blue-800 bg-black p-6 md:p-8">
          {r.valid ? (
            <>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Network</p>
              <p className="mt-2 font-ibmblockserif text-3xl font-extrabold text-white md:text-4xl">
                {r.cidrNotation}
              </p>
              <div className="mt-6">
                <Row label="Network address" value={r.networkAddress} />
                <Row label="Broadcast address" value={r.broadcastAddress} />
                <Row label="Usable range" value={`${r.firstUsable}: ${r.lastUsable}`} />
                <Row label="Usable hosts" value={r.usableHosts.toLocaleString("en-US")} />
                <Row label="Subnet mask" value={r.subnetMask} />
                <Row label="Wildcard mask" value={r.wildcardMask} />
                <Row label="Class" value={r.ipClass} mono={false} />
                <Row label="Scope" value={r.isPrivate ? "Private (RFC 1918)" : "Public"} mono={false} />
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center py-12 text-center">
              <p className="font-serif text-lg text-slate-400">
                Enter a valid IPv4 address (e.g. 10.0.0.0)
              </p>
            </div>
          )}
        </div>

        {splits.length > 0 && r.valid && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              Suggested pool splits
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {splits.map((s) => (
                <div key={s.cidr} className="rounded-xl border border-slate-800 p-4">
                  <p className="font-mono text-lg text-white">/{s.cidr}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {s.subnets} subnets · {s.hostsPerSubnet.toLocaleString("en-US")} hosts each
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
