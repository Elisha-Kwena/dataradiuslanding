/**
 * Changelog ported from dataradius.net.
 */

export const changelog: {
  version: string;
  date: string;
  title: string;
  description: string;
  sections: { label: "Added" | "Changed" | "Fixed"; items: string[] }[];
}[] = [
  {
    version: "0.7.0",
    date: "2026-11-05",
    title: "v0.7.0: Marketing site v5 and product pages",
    description: "Marketing site v5 redesign with live product components, new product pages, and answer-first learn hub.",
    sections: [
      {
        label: "Added",
        items: [
          "Marketing site v5 \"Live Lines\": complete redesign of dataradius.net with live product components on demo data, new identity tokens, and answer-first content structure",
          "Product pages: dedicated pages for hotspot and Wi-Fi, PPPoE and static IP, routers and devices, and fibre and field management, each with live product slots",
          "Switching guides: for ISPs migrating from Splynx, UISP, MikroTik User Manager, Mikhmon, and other systems",
          "Compatibility checker: interactive page showing which router brands and models work with DataRadius",
          "Trust, company, and contact pages: rebuilt with v5 identity and real operational data",
        ],
      },
      {
        label: "Changed",
        items: [
          "Auth page re-skin: login, register, and password reset pages updated to v5 tokens and voice across the tenant dashboard",
        ],
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-10-27",
    title: "v0.6.0: Portal theming and support contacts",
    description: "Dynamic portal theming, multi-channel support contacts, and sidebar navigation revamp.",
    sections: [
      {
        label: "Added",
        items: [
          "Portal theme compliance: all portal components dynamically adapt to tenant theme settings, with WCAG contrast utilities, luminance-based theme contradiction auto-correction, and 6 pre-validated colour presets",
          "Support contacts: multi-channel support contact system with 11 channel types, per-router overrides, working hours, and cascade resolution, in 6 display modes including an expandable FAB",
          "Sidebar navigation revamp: accordion navigation with smart section expansion, hide coming-soon items toggle, auto-generated command palette, contextual quick actions, section badge aggregation, frequency-aware item ordering, and hidden sidebar mode",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Portal components no longer show white text on white backgrounds when tenant theme contradicts the page background luminance",
        ],
      },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-10-25",
    title: "v0.5.0: Notification revamp and bridge scan accuracy",
    description: "Redesigned notification hub, bridge scan false-positive elimination, and bill management v2.",
    sections: [
      {
        label: "Added",
        items: [
          "Notification hub redesign: notification settings reduced from 6 tabs to 3 (Setup, Messages, Activity); each message type shows toggle, channels, content preview, and inline editor in one card, with tier-based defaults",
          "Bridge scan accuracy: eliminated false-positive subscriber devices in bridge scan results via DHCP lease cross-reference, OUI database expansion, confidence scoring for manual scans, a persistence gate of 3 consecutive poll cycles, and hot-path false-positive purge",
          "Bill management v2: replaced the vendor entity with inline payment destinations on bill definitions, progressive disclosure UX for M-Pesa Paybill and Till configuration, and category management with system seeds",
        ],
      },
      {
        label: "Changed",
        items: [
          "Subscriber notifications: evolved from a single on/off toggle to structured per-category and per-event channel controls (SMS, WhatsApp, email) with three-tier resolution",
        ],
      },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-10-19",
    title: "v0.4.0: Outage compensation and suspension preservation",
    description: "Operator-initiated outage compensation with automatic recovery, and suspension time preservation for prepaid subscribers.",
    sections: [
      {
        label: "Added",
        items: [
          "Outage compensation engine: per-purchase, per-second compensation for hotspot and PPPoE subscribers affected by router outages, with three compensation methods (extend plan expiry, issue a voucher, or credit the subscriber wallet), a preview-before-apply wizard, and a 7-day undo window",
          "Automatic compensation on recovery: tenant-controlled auto-compensation fires when a monitored router recovers from an outage, with per-router job processing, Redis cooldown, and configurable policy",
          "Suspension time preservation: activating a suspended prepaid subscriber resumes their remaining time instead of adding a full plan duration",
          "Subscriber payment actions: payment info, send-instructions, request-payment, and create-payment-link actions directly on the subscriber detail page",
        ],
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-03-06",
    title: "v0.3.0: Registration and workspaces",
    description: "Multi-step registration, email verification, subdomain workspaces, and role-based access control.",
    sections: [
      {
        label: "Added",
        items: [
          "Multi-step registration: guided signup wizard: email and password, company name and subdomain, country selection",
          "Email verification: branded verification and welcome email templates with automatic delivery",
          "Subdomain workspaces: each ISP gets its own address with custom branding and a subdomain availability checker",
          "Role-based access control: granular permissions with audit logging for every workspace action",
          "Password reset: self-service reset flow with secure token-based email links",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Token refresh works correctly after access token expiry",
          "Login response includes all required user profile fields",
          "Permission system initialises correctly on startup",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-03-05",
    title: "v0.2.0: Multi-language and marketing site",
    description: "English and Swahili localisation, marketing website with pricing, and structured data for search engines.",
    sections: [
      {
        label: "Added",
        items: [
          "Multi-language support: full English and Swahili localisation across dashboard, portal, and marketing site",
          "Marketing website: homepage, pricing page, feature overview, and contact form at dataradius.net",
          "Legal pages: terms of service, privacy policy, acceptable use policy, and data processing agreement",
          "SEO foundation: Open Graph tags, JSON-LD structured data, sitemap, and robots directives",
          "Custom 404 page: branded error page with navigation back to the main site",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-03-04",
    title: "v0.1.0: Dashboard and billing",
    description: "Tenant dashboard with subscriber management, plan configuration, invoicing, and M-Pesa payment collection.",
    sections: [
      {
        label: "Added",
        items: [
          "Tenant dashboard: subscriber list, plan management, billing overview, and revenue reporting",
          "M-Pesa integration: STK push and C2B payment collection with automatic subscriber crediting",
          "Plan configuration: time-based, data-based, speed-based, and unlimited plans with FUP thresholds",
          "Health monitoring: uptime checks, system health indicators, and Prometheus metrics",
          "Automated deployment: CI/CD pipeline with health-check gated rollouts",
        ],
      },
    ],
  },
  {
    version: "0.0.1",
    date: "2026-03-04",
    title: "v0.0.1: Platform launch",
    description: "Core platform with subscriber management, PPPoE and hotspot authentication, and tenant workspaces.",
    sections: [
      {
        label: "Added",
        items: [
          "Subscriber management: create, edit, and track PPPoE and hotspot subscribers with plan assignment and connection credentials",
          "PPPoE and hotspot authentication: RADIUS-based subscriber authentication with speed enforcement and session accounting",
          "Tenant workspaces: each ISP gets its own workspace at a custom subdomain with automatic TLS certificates",
          "Security hardening: rate limiting, CORS, helmet headers, and input validation on all API endpoints",
        ],
      },
    ],
  },
];
