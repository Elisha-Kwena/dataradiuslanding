// Real copy from dataradius.net legal pages (apps/site legal sections).

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  body: string;
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "2026-10-10",
    body: `## Acceptance

By creating a workspace or using DataRadius, you agree to these terms. If you do not agree, do not use the service.

## The service

DataRadius provides ISP billing, subscriber management, router provisioning and related tools as a hosted service. Your workspace runs on infrastructure managed by DataRadius.

## Your workspace

You are responsible for the activity in your workspace, the accuracy of the data you enter, and the security of your login credentials.

## Payment

Billing is usage-based. Rates are published on the pricing page and may change with 30 days notice. Invoices are issued monthly for the previous month.

## Data

Your data belongs to you. You may export it at any time in CSV or JSON format. We do not sell, share or use your data for purposes other than providing the service.

## Termination

Either party may terminate at any time. On termination, you have 30 days to export your data before it is deleted.

## Liability

DataRadius is provided as-is. Our total liability is limited to the fees you paid in the 12 months before the claim.

## Changes

We may update these terms. Material changes are communicated by email at least 30 days before they take effect.`,
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-10-10",
    body: `## What we collect

We collect the information you provide when creating a workspace: name, email address and organisation name. We also collect usage data (page views, feature usage) to improve the service.

## How we use it

Your data is used to provide and improve the service, send you transactional emails (invoices, alerts), and respond to support requests.

## Subscriber data

Subscriber data entered by workspace operators (names, phone numbers, payment records) is stored on behalf of the operator. DataRadius acts as a data processor; the operator is the data controller.

## Data storage

Data is stored in the EU on encrypted servers. Backups are encrypted and stored separately.

## Third parties

We share data only with sub-processors listed on the [sub-processors page](/legal/sub-processors). We do not sell personal data.

## Your rights

You may request access to, correction of, or deletion of your personal data by emailing hello@dataradius.net.

## Changes

Material changes are communicated by email at least 30 days before they take effect.`,
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement",
    updated: "2026-10-10",
    body: `## Scope

This Data Processing Agreement applies when a workspace operator (the controller) uses DataRadius (the processor) to process personal data of subscribers.

## Processing

DataRadius processes subscriber data only as instructed by the workspace operator and only to provide the service described in the [terms of service](/legal/terms).

## Sub-processors

Current sub-processors are listed on the [sub-processors page](/legal/sub-processors). DataRadius notifies the operator at least 30 days before adding a new sub-processor.

## Security

Technical and organisational measures are described on the [security page](/trust): encryption at rest and in transit, workspace isolation, audit logging, role-based access, daily encrypted backups.

## Data location

Subscriber data is stored in the EU. Transfers outside the EU are covered by Standard Contractual Clauses where required.

## Deletion

On termination, workspace data is deleted within 30 days unless retention is required by law.`,
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    updated: "2026-10-10",
    body: `## Permitted use

DataRadius is for legitimate internet service providers to manage billing, subscribers and network equipment.

## Prohibited use

You may not use DataRadius to:

- Violate any applicable law or regulation.
- Infringe on the rights of others.
- Distribute malware or conduct network attacks.
- Send unsolicited messages to subscribers.
- Resell access to the platform without permission.
- Attempt to access other workspaces or the platform infrastructure.

## Enforcement

DataRadius may suspend or terminate a workspace that violates this policy, with notice where practical.`,
  },
  {
    slug: "sub-processors",
    title: "Sub-processors",
    updated: "2026-10-27",
    body: `DataRadius uses the following third-party services to process data on behalf of workspace operators.

| Service | Purpose | Location |
|---|---|---|
| Hetzner | Server hosting and database | EU (Finland) |
| Cloudflare | CDN, DNS, DDoS protection | Global |
| Resend | Transactional email delivery | US |
| Upstash | Cache, queues, pub/sub | EU |
| Cloudflare R2 | Object storage (uploads, exports) | EU |

## Changes to this list

Changes to the sub-processor list are communicated at least 30 days in advance to workspace operators who have signed a data processing agreement.

Processing terms are described in the [Data Processing Agreement](/legal/dpa).`,
  },
];
