/**
 * Single source of truth for pricing: the region price book.
 *
 * Mirrors dataradius.net's price book: each region has hand-set rates in
 * its own currency. There is NO FX conversion: prices are set per region,
 * not converted from KES.
 *
 * Change the numbers here and every card, calculator and FAQ follows.
 */
export type Region =
  | "KE"
  | "NG_GH"
  | "ZA"
  | "AFRICA"
  | "EU"
  | "UK"
  | "US_CA"
  | "WORLD";

export interface RegionPricing {
  code: Region;
  /** Selector dropdown label, e.g. "Kenya: KES" */
  label: string;
  /** Compact trigger label, e.g. "KES (KSh)" */
  selectorLabel: string;
  currencyCode: string;
  /** BCP 47 locale for number formatting */
  locale: string;
  /** Per active broadband subscriber per month (display unit) */
  subscriberRate: number;
  /** Monthly minimum charge (display unit) */
  monthlyMinimum: number;
  /** One-time activation fee after trial (display unit) */
  activationFee: number;
  /** Typical monthly Wi-Fi sales for a mid-size hotspot op: presets + slider scale */
  typicalWifiSales: number;
  /** Default average broadband plan price for the calculator */
  defaultArpu: number;
  /** Calculator Wi-Fi slider maximum */
  wifiMax: number;
}

export const REGIONS: RegionPricing[] = [
  {
    code: "KE",
    label: "Kenya: KES",
    selectorLabel: "KES (KSh)",
    currencyCode: "KES",
    locale: "en-KE",
    subscriberRate: 18,
    monthlyMinimum: 500,
    activationFee: 500,
    typicalWifiSales: 150_000,
    defaultArpu: 1_500,
    wifiMax: 600_000,
  },
  {
    code: "NG_GH",
    label: "Nigeria & Ghana: NGN",
    selectorLabel: "NGN (₦)",
    currencyCode: "NGN",
    locale: "en-NG",
    subscriberRate: 150,
    monthlyMinimum: 4_000,
    activationFee: 4_000,
    typicalWifiSales: 800_000,
    defaultArpu: 10_000,
    wifiMax: 3_200_000,
  },
  {
    code: "ZA",
    label: "South Africa: ZAR",
    selectorLabel: "ZAR (R)",
    currencyCode: "ZAR",
    locale: "en-ZA",
    subscriberRate: 3.5,
    monthlyMinimum: 95,
    activationFee: 95,
    typicalWifiSales: 20_000,
    defaultArpu: 300,
    wifiMax: 80_000,
  },
  {
    code: "AFRICA",
    label: "Africa (other): USD",
    selectorLabel: "USD ($)",
    currencyCode: "USD",
    locale: "en-US",
    subscriberRate: 0.15,
    monthlyMinimum: 5,
    activationFee: 5,
    typicalWifiSales: 1_500,
    defaultArpu: 15,
    wifiMax: 6_000,
  },
  {
    code: "EU",
    label: "Europe: EUR",
    selectorLabel: "EUR (€)",
    currencyCode: "EUR",
    locale: "de-DE",
    subscriberRate: 0.14,
    monthlyMinimum: 5,
    activationFee: 5,
    typicalWifiSales: 1_500,
    defaultArpu: 30,
    wifiMax: 6_000,
  },
  {
    code: "UK",
    label: "United Kingdom: GBP",
    selectorLabel: "GBP (£)",
    currencyCode: "GBP",
    locale: "en-GB",
    subscriberRate: 0.12,
    monthlyMinimum: 4,
    activationFee: 4,
    typicalWifiSales: 1_200,
    defaultArpu: 25,
    wifiMax: 5_000,
  },
  {
    code: "US_CA",
    label: "US & Canada: USD",
    selectorLabel: "USD ($)",
    currencyCode: "USD",
    locale: "en-US",
    subscriberRate: 0.15,
    monthlyMinimum: 5,
    activationFee: 5,
    typicalWifiSales: 1_500,
    defaultArpu: 50,
    wifiMax: 6_000,
  },
  {
    code: "WORLD",
    label: "Rest of world: USD",
    selectorLabel: "USD ($)",
    currencyCode: "USD",
    locale: "en-US",
    subscriberRate: 0.15,
    monthlyMinimum: 5,
    activationFee: 5,
    typicalWifiSales: 1_500,
    defaultArpu: 20,
    wifiMax: 6_000,
  },
];

export const DEFAULT_REGION: Region = "KE";

/** Same for every region: % of completed captive-portal (Wi-Fi) payments */
export const WIFI_FEE_PCT = 1.8;

export const PRICING = {
  trialDays: 14,
  /** calculator slider limit for broadband customers */
  customersMax: 5000,
} as const;

export function getRegion(code: Region): RegionPricing {
  return REGIONS.find((r) => r.code === code) ?? REGIONS[0];
}

export type Bill = {
  customerFee: number;
  wifiFee: number;
  usage: number;
  minimumApplied: boolean;
  total: number;
};

/** Compute a monthly bill in the region's own currency (display units). */
export function computeBill(
  customers: number,
  wifiSales: number,
  region: RegionPricing,
): Bill {
  const customerFee = customers * region.subscriberRate;
  const wifiFee = (wifiSales * WIFI_FEE_PCT) / 100;
  const usage = customerFee + wifiFee;
  const minimumApplied = usage < region.monthlyMinimum;
  return {
    customerFee,
    wifiFee,
    usage,
    minimumApplied,
    total: Math.max(usage, region.monthlyMinimum),
  };
}
