/* Compatibility registry ported verbatim from dataradius.net
   (apps/site/src/lib/compatibility-registry.ts). */

export type CompatibilityStatus =
  | "live"
  | "live_with_limits"
  | "beta"
  | "planned"
  | "not_planned";

export type CompatibilityCategory =
  | "routers"
  | "payment_providers"
  | "olts_fiber"
  | "messaging"
  | "customer_devices"
  | "systems";

export interface CompatibilityEntry {
  id: string;
  name: string;
  category: CompatibilityCategory;
  status: CompatibilityStatus;
  lastVerified: string;
  notes: string;
  trademarkNotice?: string;
}

export const STATUS_LABELS: Record<CompatibilityStatus, string> = {
  live: "Live",
  live_with_limits: "Live with limits",
  beta: "Beta",
  planned: "Planned",
  not_planned: "Not planned",
};

export const CATEGORY_LABELS: Record<CompatibilityCategory, string> = {
  routers: "Routers & access points",
  payment_providers: "Payment providers",
  olts_fiber: "OLTs & fiber",
  messaging: "Messaging",
  customer_devices: "Customer devices",
  systems: "Systems & APIs",
};

const CATEGORY_ORDER: CompatibilityCategory[] = [
  "routers",
  "payment_providers",
  "olts_fiber",
  "messaging",
  "customer_devices",
  "systems",
];

export const COMPATIBILITY_ENTRIES: CompatibilityEntry[] = [
  { id: "mikrotik", name: "MikroTik (RouterOS 6.49+, 7.x)", category: "routers", status: "live", lastVerified: "2026-11-01", notes: "Full PPPoE, hotspot, firewall, queues, backups, firmware, remote commands. No public IP needed.", trademarkNotice: "MikroTik is a trademark of SIA Mikrotīkls." },
  { id: "ubiquiti", name: "Ubiquiti (EdgeRouter, AirMax)", category: "routers", status: "planned", lastVerified: "2026-11-01", notes: "SNMP monitoring planned. Full provisioning on the roadmap." },
  { id: "ruijie", name: "Ruijie / Reyee", category: "routers", status: "planned", lastVerified: "2026-11-01", notes: "SNMP monitoring planned." },
  { id: "cambium", name: "Cambium Networks", category: "routers", status: "planned", lastVerified: "2026-11-01", notes: "SNMP monitoring planned." },

  { id: "mpesa", name: "M-Pesa (Safaricom)", category: "payment_providers", status: "live", lastVerified: "2026-11-01", notes: "STK push, C2B, QR payments. Auto-reconnect on payment." },
  { id: "stripe", name: "Stripe", category: "payment_providers", status: "live", lastVerified: "2026-11-01", notes: "Card payments in 135+ currencies via hosted checkout." },
  { id: "paystack", name: "Paystack", category: "payment_providers", status: "live", lastVerified: "2026-11-01", notes: "Cards and mobile money in Nigeria, Ghana, South Africa, Kenya." },
  { id: "flutterwave", name: "Flutterwave", category: "payment_providers", status: "live", lastVerified: "2026-11-01", notes: "Cards and mobile money across 30+ African countries." },
  { id: "manual-payments", name: "Manual / cash / bank transfer", category: "payment_providers", status: "live", lastVerified: "2026-11-01", notes: "Record any offline payment. Auto-reconnect on confirmation." },
  { id: "mercado-pago", name: "Mercado Pago / Pix", category: "payment_providers", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap for Brazil and Latin America." },
  { id: "xendit", name: "Xendit", category: "payment_providers", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap for Southeast Asia." },
  { id: "razorpay", name: "Razorpay", category: "payment_providers", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap for India." },

  { id: "hioso", name: "Hioso OLTs", category: "olts_fiber", status: "live", lastVerified: "2026-11-01", notes: "SNMP + HTTP. ONU provisioning, optical power monitoring, VLAN management." },
  { id: "smartolt", name: "SmartOLT (cloud-managed OLTs)", category: "olts_fiber", status: "live", lastVerified: "2026-11-01", notes: "API integration. ONU provisioning and monitoring via SmartOLT cloud." },
  { id: "huawei-olt", name: "Huawei OLTs", category: "olts_fiber", status: "live_with_limits", lastVerified: "2026-11-01", notes: "SNMP monitoring supported. Native CLI provisioning on the roadmap." },
  { id: "zte-olt", name: "ZTE OLTs", category: "olts_fiber", status: "live_with_limits", lastVerified: "2026-11-01", notes: "SNMP monitoring supported. Native CLI provisioning on the roadmap." },
  { id: "bdcom-olt", name: "BDCOM OLTs", category: "olts_fiber", status: "live_with_limits", lastVerified: "2026-11-01", notes: "SNMP monitoring supported. Native provisioning on the roadmap." },
  { id: "vsol-olt", name: "VSOL OLTs", category: "olts_fiber", status: "live_with_limits", lastVerified: "2026-11-01", notes: "SNMP monitoring supported. Native provisioning on the roadmap." },
  { id: "cdata-olt", name: "C-Data OLTs", category: "olts_fiber", status: "live_with_limits", lastVerified: "2026-11-01", notes: "SNMP monitoring supported. Native provisioning on the roadmap." },
  { id: "fiberhome-olt", name: "FiberHome OLTs", category: "olts_fiber", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap." },
  { id: "nokia-olt", name: "Nokia OLTs", category: "olts_fiber", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap." },
  { id: "calix-olt", name: "Calix OLTs", category: "olts_fiber", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap." },

  { id: "sms", name: "SMS (multiple providers)", category: "messaging", status: "live", lastVerified: "2026-11-01", notes: "Payment receipts, service alerts, broadcasts. Configurable per workspace." },
  { id: "email", name: "Email (SMTP)", category: "messaging", status: "live", lastVerified: "2026-11-01", notes: "Invoices, receipts, service notifications. Custom templates." },
  { id: "whatsapp", name: "WhatsApp Business API", category: "messaging", status: "live", lastVerified: "2026-11-01", notes: "Payment receipts and service alerts via WhatsApp." },
  { id: "telegram", name: "Telegram Bot", category: "messaging", status: "planned", lastVerified: "2026-11-01", notes: "On the roadmap." },

  { id: "tr069", name: "TR-069 / CWMP devices", category: "customer_devices", status: "live_with_limits", lastVerified: "2026-11-01", notes: "Remote provisioning, firmware, diagnostics for TR-069 CPEs. Vendor-specific profiles expanding.", trademarkNotice: "TR-069 is a standard published by the Broadband Forum." },

  { id: "api-webhooks", name: "REST API & webhooks", category: "systems", status: "live", lastVerified: "2026-11-01", notes: "Full CRUD API with webhook notifications for device events." },
];

export interface CompatibilityGroup {
  category: CompatibilityCategory;
  label: string;
  entries: CompatibilityEntry[];
}

export function getCompatibilityByCategory(): CompatibilityGroup[] {
  const map = new Map<CompatibilityCategory, CompatibilityEntry[]>();
  for (const entry of COMPATIBILITY_ENTRIES) {
    map.set(entry.category, [...(map.get(entry.category) ?? []), entry]);
  }
  return CATEGORY_ORDER.filter((c) => map.has(c)).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    entries: map.get(category)!,
  }));
}
