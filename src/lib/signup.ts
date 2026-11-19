import { PRICING } from "@/lib/pricingConfig";

/* ---------------------------------------------------------------------------
 * Change the brand here. Everything on the sign-up page reads from this.
 * Tenant workspaces live at <slug>.<domain>.
 * ------------------------------------------------------------------------- */
export const BRAND = {
  name: "DataRadius",
  domain: "dataradius.co.ke",
  trialDays: PRICING.trialDays,
} as const;

/* ------------------------------- types -------------------------------- */

export type SizeBand = "0-100" | "101-500" | "501-2000" | "2001-10000" | "10000+";

export type SignupData = {
  // step 1: credentials
  email: string;
  password: string;
  // step 2: workspace
  business: string;
  slug: string;
  /** true once the user types in the slug field, so we stop auto-filling it */
  slugEdited: boolean;
  /** ISO 3166-1 alpha-2 */
  country: string;
  /** national significant number, without the country dial code */
  phone: string;
  size: SizeBand | "";
};

export const emptySignup: SignupData = {
  email: "",
  password: "",
  business: "",
  slug: "",
  slugEdited: false,
  country: "KE",
  phone: "",
  size: "",
};

export type Errors = Partial<Record<keyof SignupData, string>>;
export type SlugStatus = "idle" | "checking" | "available" | "taken" | "invalid";

/* ------------------------------ countries ------------------------------ */

export type Country = { code: string; name: string; phoneCode: string };

/** Markets DataRadius operates in, ordered by subscriber volume. */
export const COUNTRIES: Country[] = [
  { code: "KE", name: "Kenya", phoneCode: "+254" },
  { code: "NG", name: "Nigeria", phoneCode: "+234" },
  { code: "ZA", name: "South Africa", phoneCode: "+27" },
  { code: "TZ", name: "Tanzania", phoneCode: "+255" },
  { code: "UG", name: "Uganda", phoneCode: "+256" },
  { code: "GH", name: "Ghana", phoneCode: "+233" },
  { code: "ET", name: "Ethiopia", phoneCode: "+251" },
  { code: "RW", name: "Rwanda", phoneCode: "+250" },
  { code: "CD", name: "DR Congo", phoneCode: "+243" },
  { code: "CM", name: "Cameroon", phoneCode: "+237" },
  { code: "CI", name: "Côte d'Ivoire", phoneCode: "+225" },
  { code: "SN", name: "Senegal", phoneCode: "+221" },
  { code: "MW", name: "Malawi", phoneCode: "+265" },
  { code: "ZM", name: "Zambia", phoneCode: "+260" },
  { code: "ZW", name: "Zimbabwe", phoneCode: "+263" },
  { code: "MZ", name: "Mozambique", phoneCode: "+258" },
  { code: "BW", name: "Botswana", phoneCode: "+267" },
  { code: "NA", name: "Namibia", phoneCode: "+264" },
  { code: "MG", name: "Madagascar", phoneCode: "+261" },
  { code: "EG", name: "Egypt", phoneCode: "+20" },
  { code: "MA", name: "Morocco", phoneCode: "+212" },
  { code: "TN", name: "Tunisia", phoneCode: "+216" },
  { code: "DZ", name: "Algeria", phoneCode: "+213" },
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "FR", name: "France", phoneCode: "+33" },
  { code: "NL", name: "Netherlands", phoneCode: "+31" },
  { code: "BE", name: "Belgium", phoneCode: "+32" },
  { code: "AE", name: "United Arab Emirates", phoneCode: "+971" },
  { code: "IN", name: "India", phoneCode: "+91" },
  { code: "ID", name: "Indonesia", phoneCode: "+62" },
  { code: "PH", name: "Philippines", phoneCode: "+63" },
  { code: "BR", name: "Brazil", phoneCode: "+55" },
  { code: "MX", name: "Mexico", phoneCode: "+52" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
];

export function getCountry(code: string): Country {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
}

export const SIZE_BANDS: { id: SizeBand; label: string }[] = [
  { id: "0-100", label: "0 to 100" },
  { id: "101-500", label: "101 to 500" },
  { id: "501-2000", label: "501 to 2,000" },
  { id: "2001-10000", label: "2,001 to 10,000" },
  { id: "10000+", label: "10,000+" },
];

/* ----------------------------- validation ----------------------------- */

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

/** Turns "0712 345 678" into +254712345678 using the selected country's dial code. */
export function normalizePhone(country: string, raw: string) {
  const cc = getCountry(country).phoneCode.replace(/\D/g, "");
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith(cc) && digits.length > 9) digits = digits.slice(cc.length);
  digits = digits.replace(/^0+/, "");
  const valid = digits.length >= 7 && digits.length <= 11;
  return { e164: `+${cc}${digits}`, valid };
}

export function passwordChecks(pw: string) {
  return {
    length: pw.length >= 8,
    mix: /[a-z]/.test(pw) && /[A-Z]/.test(pw),
    number: /\d/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
  };
}

/** 0 (empty) to 4 (strong) */
export function passwordScore(pw: string) {
  if (!pw) return 0;
  const c = passwordChecks(pw);
  const score = [c.length, c.mix, c.number, c.symbol].filter(Boolean).length;
  return c.length ? score : Math.min(score, 1);
}

const RESERVED = ["www", "app", "api", "admin", "mail", "billing", "support", "status", "docs", "login", "signup", "dashboard"];

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63)
    .replace(/-+$/g, "");
}

export function validateSlug(slug: string): string | null {
  if (slug.length < 3) return "Use at least 3 characters";
  if (slug.length > 63) return "Use 63 characters or fewer";
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(slug)) return "Use letters, numbers and hyphens, not starting or ending with a hyphen";
  if (RESERVED.includes(slug)) return "That name is reserved";
  return null;
}

export function validateAccount(d: SignupData): Errors {
  const e: Errors = {};
  if (!isEmail(d.email)) e.email = "Please enter a valid email address";
  const c = passwordChecks(d.password);
  if (!c.length) e.password = "Password must be at least 8 characters";
  else if (!(c.mix && c.number)) e.password = "Password does not meet the policy requirements";
  return e;
}

export function validateBusiness(d: SignupData): Errors {
  const e: Errors = {};
  if (d.business.trim().length < 2) e.business = "ISP name must be at least 2 characters";
  const slugError = validateSlug(d.slug);
  if (slugError) e.slug = slugError;
  if (!d.country) e.country = "Select your country";
  if (!normalizePhone(d.country, d.phone).valid) e.phone = "Enter a valid phone number";
  if (!d.size) e.size = "Choose a size";
  return e;
}

/* -------------------------------- API --------------------------------- *
 * With NEXT_PUBLIC_API_URL set, these call the backend. Without it, they
 * run in DEMO mode so the page works on its own.
 *
 * Endpoints assumed:
 *   GET  {API}/auth/workspace-available/?slug=...   -> { available: boolean }
 *   POST {API}/auth/register/                       -> 201, sends the email
 *   POST {API}/auth/resend-code/    { email }       -> 200
 * Errors: respond with { detail: "message" } and a 4xx status.
 * ------------------------------------------------------------------------ */

const API = process.env.NEXT_PUBLIC_API_URL;
export const isDemo = !API;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const DEMO_TAKEN = ["demo", "test", "dataradius"];

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.detail ?? "Something went wrong. Please try again.");
  return body;
}

export async function checkSlug(slug: string): Promise<boolean> {
  if (isDemo) {
    await wait(500);
    return !DEMO_TAKEN.includes(slug);
  }
  const body = await request(`/auth/workspace-available/?slug=${encodeURIComponent(slug)}`);
  return Boolean(body.available);
}

export async function register(d: SignupData): Promise<void> {
  if (isDemo) {
    await wait(900);
    return;
  }
  await request("/auth/register/", {
    method: "POST",
    body: JSON.stringify({
      email: d.email.trim().toLowerCase(),
      password: d.password,
      company_name: d.business.trim(),
      slug: d.slug,
      country: d.country,
      phone: normalizePhone(d.country, d.phone).e164,
      size_band: d.size || undefined,
    }),
  });
}

export async function resendCode(email: string): Promise<void> {
  if (isDemo) {
    await wait(400);
    return;
  }
  await request("/auth/resend-code/", { method: "POST", body: JSON.stringify({ email }) });
}
