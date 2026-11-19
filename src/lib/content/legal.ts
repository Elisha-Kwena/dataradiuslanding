export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  body: string;
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of service",
    updated: "2026-01-15",
    body: `## 1. The service

DataRadius provides ISP management software: subscriber billing, payment collection, router and hotspot management, fibre mapping and field operations. The service is provided as a workspace at your own subdomain, billed monthly after a 14-day free trial.

## 2. Your account

You are responsible for everything that happens in your workspace: the data you import, the routers you connect and the people you invite. Keep your credentials confidential. You must be authorized to operate the subscriber data you import.

## 3. Billing

Paid plans renew monthly. Prices are shown on the pricing page per region and may change with 30 days notice. Non-payment suspends the workspace after a grace period; your data is retained for 90 days and then deleted.

## 4. Acceptable use

You agree to use the service within the law of the countries where you operate and per our [acceptable use policy](/legal/acceptable-use). You remain the provider of record for your subscribers: their service contracts, licenses and obligations are yours.

## 5. Availability and support

We target 99.9% monthly availability for the platform core. Current and historical status is published on the [status page](/status). Support is provided by email and in-workspace chat.

## 6. Liability

To the extent the law allows, DataRadius is not liable for indirect losses: lost revenue, lost subscribers or business interruption arising from use of the service. Our total liability is capped at the fees you paid in the preceding 12 months.

## 7. Termination

Either side can end the agreement at the end of a billing period. On termination we provide a full export of your subscriber and billing data in open formats.

## 8. Governing law

These terms are governed by the laws of Kenya. Disputes go to the courts of Nairobi unless mandatory law says otherwise.`,
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "2026-01-15",
    body: `## What we collect

We collect what the service needs to run: your account details (name, email, phone), workspace configuration, the subscriber records you import, router telemetry, and payment metadata. We do not collect subscriber browsing content.

## How we use it

To operate the service: billing your subscribers, connecting routers, delivering notifications and generating your reports. We also use aggregated, de-identified data to improve the product. We do not sell personal data.

## Your subscribers' data

You are the data controller for your subscribers; DataRadius processes their data on your instructions under our [data processing addendum](/legal/dpa). We handle it per the Kenya Data Protection Act, 2019 and, where it applies, GDPR.

## Sharing

We share data only with the sub-processors listed on our [sub-processors page](/legal/sub-processors): hosting, payment and messaging providers bound by contract to protect it.

## Retention

Account data is kept while your workspace is active. After termination, workspace data is retained for 90 days for export and then deleted. Backups cycle out within 30 days after that.

## Your rights

You can access, correct, export or delete your account data at any time from workspace settings or by writing to privacy@dataradius.net. Requests are answered within 30 days.

## Security

Data is encrypted in transit and at rest, credentials are hashed, and tenant data is isolated per workspace. See [security and trust](/trust) for the full list.`,
  },
  {
    slug: "dpa",
    title: "Data processing addendum",
    updated: "2026-01-15",
    body: `## Purpose

This addendum governs how DataRadius processes personal data on your behalf when you use the service. It forms part of the [terms of service](/legal/terms).

## Roles

You are the **controller**: you decide what subscriber data goes into the workspace and why. DataRadius is the **processor**: we process that data only on your documented instructions, which the service's features represent.

## What we may do with the data

Store it, transmit it to deliver the features you use, back it up, and produce the reports and notifications you configure. Nothing else. We do not access subscriber records except to operate the service or where you ask us to for support.

## Sub-processors

You authorize the sub-processors listed at [sub-processors](/legal/sub-processors). We notify workspace owners before adding a new one, and you may object within 14 days.

## Security measures

Encryption in transit and at rest, per-tenant isolation, hashed credentials, access logging and least-privilege internal access. The measures are described at [security and trust](/trust).

## Deletion and export

You can export all personal data held in the workspace at any time. On termination we delete personal data within 90 days, except where the law requires retention.

## Assistance and audits

We assist with data-subject requests routed through you, and with regulator enquiries concerning processing under this addendum. Audit requests are handled by written questionnaire; on-site audits by agreement.`,
  },
  {
    slug: "acceptable-use",
    title: "Acceptable use policy",
    updated: "2026-01-15",
    body: `## The short version

Use DataRadius to run a lawful internet service. Do not use it to harm subscribers, networks or other people.

## Not allowed

- **Illegal services**: operating internet services without the licenses your jurisdiction requires, or reselling access in breach of your upstream terms.
- **Abuse tooling**: spam, phishing, malware distribution, botnet control or hosting illegal content through infrastructure you manage with the service.
- **Privacy violations**: collecting subscriber data beyond what the service needs, intercepting or selling subscriber traffic or browsing data.
- **Attacks**: probing, scanning or attacking the platform, other workspaces, or third-party networks.
- **Circumvention**: attempting to bypass tenant isolation, rate limits, access controls or billing.
- **Impersonation**: presenting the service or generated pages as belonging to another organization.

## Enforcement

We investigate reports and may suspend a workspace that violates this policy, with notice where the situation allows. Serious violations (fraud, attacks, illegal content) may be suspended immediately and reported to the relevant authorities.

## Reporting abuse

Report abuse originating from a DataRadius-managed service to abuse@dataradius.net. Include the workspace, timestamps and evidence.`,
  },
  {
    slug: "sub-processors",
    title: "Sub-processors",
    updated: "2026-01-15",
    body: `## What this list is

The third parties that may process workspace data while delivering the service, per the [data processing addendum](/legal/dpa). Workspace owners are notified by email at least 14 days before a new sub-processor is added.

## Infrastructure

| Sub-processor | Purpose | Location |
|---|---|---|
| Cloud hosting provider | Compute, database and storage for workspaces | EU / regional |
| Content delivery network | Static assets and edge caching | Global |

## Payments

| Sub-processor | Purpose | Location |
|---|---|---|
| Safaricom (M-Pesa Daraja) | Mobile money collections initiated by your subscribers | Kenya |
| Card payment processor | Card payments where enabled | Varies by region |

Payment processors receive only what a transaction needs. Card details never touch DataRadius servers.

## Communications

| Sub-processor | Purpose | Location |
|---|---|---|
| Email delivery provider | Transactional email: invoices, alerts, sign-in links | EU / US |
| SMS gateway | Payment confirmations and alerts you enable | Regional |

## Analytics

Product analytics run on self-hosted infrastructure inside the platform: no third-party analytics sub-processor receives subscriber data.

## Objections

Object to a proposed new sub-processor by writing to privacy@dataradius.net within 14 days of the notice. If we cannot resolve the objection, you may terminate the workspace before the sub-processor takes effect.`,
  },
];
