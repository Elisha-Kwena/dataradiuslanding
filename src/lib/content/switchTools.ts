// Real copy from dataradius.net (apps/site switchGuides namespace).
export type SwitchMove = { field: string; detail: string };
export type SwitchStep = { label: string; description: string };

export type SwitchTool = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSub: string;
  entity: string;
  lastVerified: string;
  movesTitle: string;
  movesIntro: string;
  moves: SwitchMove[];
  timelineTitle: string;
  timelineIntro: string;
  steps: SwitchStep[];
  checklistTitle: string;
  checklist: string[];
  stayTitle: string;
  stayIntro: string;
  stayReasons: string[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  closeTitle: string;
  closeReassurance: string;
  trademark: string;
  correction: string;
};

export const switchTools: SwitchTool[] = [
  {
    "slug": "from-splynx",
    "name": "Splynx",
    "heroTitle": "Switch from Splynx",
    "heroSub": "What moves, how long it takes, and what to check — so you can decide whether the switch makes sense for your network.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. Splynx is a global ISP management platform by Splynx s.r.o., serving ISPs with per-subscriber subscription pricing, cloud and on-premise deployment, and multi-vendor device support.",
    "lastVerified": "Last verified: October 2026",
    "movesTitle": "What moves",
    "movesIntro": "DataRadius imports your core operating data from Splynx via CSV export. Here is what transfers and how.",
    "moves": [
      {
        "field": "Subscribers",
        "detail": "Active and suspended subscriber records, including contact details, service status and account notes. Export from Splynx as CSV; import through the DataRadius wizard."
      },
      {
        "field": "Service plans",
        "detail": "Broadband and data plans with speeds, data limits and pricing. Recreate plans in DataRadius, then map imported subscribers to them."
      },
      {
        "field": "Invoices and payments",
        "detail": "Invoice history and payment records transfer for reporting continuity. DataRadius uses its own billing engine going forward."
      },
      {
        "field": "IP assignments",
        "detail": "Static and dynamic IP pools are preserved. DataRadius manages address assignment on connected routers."
      },
      {
        "field": "Router connections",
        "detail": "MikroTik routers connect to DataRadius directly. Each router is moved individually — disconnect from Splynx, connect to DataRadius."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Most providers finish within two to three weeks. Small networks with fewer than five routers often finish in days.",
    "steps": [
      {
        "label": "Export from Splynx",
        "description": "Export subscribers, services, invoices and payment history as CSV files. Splynx provides bulk export tools."
      },
      {
        "label": "Import and map fields",
        "description": "Upload the CSV files into DataRadius. The import wizard maps Splynx columns to DataRadius fields."
      },
      {
        "label": "Connect routers",
        "description": "Move MikroTik routers one at a time. Each router connects to DataRadius without disconnecting active subscribers."
      },
      {
        "label": "Run side by side",
        "description": "Keep both systems running for one to two weeks. Verify that collections and subscriber counts match."
      },
      {
        "label": "Go live",
        "description": "Retire Splynx when the active-subscriber totals and payment collections reconcile between both systems."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "Active subscriber count matches between both systems",
      "Payment collections reconcile for the first full billing cycle",
      "All routers report healthy in the DataRadius dashboard",
      "Subscriber portal login works for end users",
      "SMS and email notifications reach subscribers",
      "Scheduled reports generate correctly"
    ],
    "stayTitle": "When to stay on Splynx",
    "stayIntro": "Splynx is the better fit in several situations. Consider staying if any of these apply to your network.",
    "stayReasons": [
      "You run routers from multiple vendors (Cisco, Juniper, Ubiquiti, Huawei) that need SNMP or vendor-specific provisioning. DataRadius works with MikroTik today, plus any TR-069 device.",
      "You need VoIP billing with CDR processing. DataRadius does not offer voice billing.",
      "You require on-premise deployment for regulatory or compliance reasons. DataRadius is cloud-hosted.",
      "You rely on Splynx's add-on marketplace, including accounting integrations and cybersecurity partnerships.",
      "You need product support in 20 or more languages. DataRadius supports English and Swahili today."
    ],
    "faq": [
      {
        "q": "How long does switching from Splynx take?",
        "a": "Two to three weeks for most providers. Small networks with fewer than five routers often finish in days."
      },
      {
        "q": "Can I run Splynx and DataRadius at the same time?",
        "a": "Yes. Move routers one at a time while both systems run. Each router can be rolled back independently."
      },
      {
        "q": "Will subscribers lose connection during migration?",
        "a": "No. Routers switch authentication to DataRadius without disconnecting active sessions."
      },
      {
        "q": "Does DataRadius support the same payment providers?",
        "a": "DataRadius supports Stripe, Paystack, Flutterwave and mobile money natively. If you use a provider not yet supported, contact us."
      },
      {
        "q": "What about Splynx add-ons like ACS and OLT management?",
        "a": "DataRadius includes TR-069 device management and OLT monitoring (Hioso natively; Huawei, ZTE and VSOL through SmartOLT) at no extra cost."
      }
    ],
    "sources": [
      {
        "label": "Splynx pricing page (accessed 26 October 2026)",
        "url": "https://splynx.com/pricing/"
      },
      {
        "label": "Splynx features and documentation (accessed 26 October 2026)",
        "url": "https://splynx.com/"
      }
    ],
    "closeTitle": "Ready to switch from Splynx?",
    "closeReassurance": "14 days free. Move routers one at a time.",
    "trademark": "Splynx is a registered trademark of Splynx s.r.o. This page is not affiliated with or endorsed by Splynx.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  },
  {
    "slug": "from-uisp",
    "name": "UISP",
    "heroTitle": "Switch from UISP",
    "heroSub": "What transfers, how long it takes, and an honest look at when UISP is the better choice for your network.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. UISP is Ubiquiti's ISP management platform, offering free device management and basic billing for networks built on Ubiquiti hardware.",
    "lastVerified": "Last verified: October 2026",
    "movesTitle": "What moves",
    "movesIntro": "DataRadius imports your core operating data from UISP via CSV export. Ubiquiti device management stays with UISP unless your network includes MikroTik routers.",
    "moves": [
      {
        "field": "Customer records",
        "detail": "Subscriber names, contacts, service addresses and account status. Export from UISP as CSV; import through the DataRadius wizard."
      },
      {
        "field": "Service plans",
        "detail": "Plan names, speeds and pricing transfer as DataRadius plan definitions. Map imported subscribers to the matching plans."
      },
      {
        "field": "Invoice history",
        "detail": "Past invoices and payment records import for reporting continuity. DataRadius handles billing going forward."
      },
      {
        "field": "Site locations",
        "detail": "Tower and site coordinates transfer to the DataRadius network map for coverage visibility."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Most providers complete the move in one to two weeks. Networks with only a handful of sites often finish in days.",
    "steps": [
      {
        "label": "Export from UISP",
        "description": "Export customer records, service plans, invoices and site data as CSV files from UISP."
      },
      {
        "label": "Import and map fields",
        "description": "Upload files into DataRadius. The import wizard maps UISP columns to DataRadius fields."
      },
      {
        "label": "Connect MikroTik routers",
        "description": "If your network includes MikroTik devices, connect them to DataRadius one at a time."
      },
      {
        "label": "Set up payment collection",
        "description": "Connect your payment providers in DataRadius. Subscribers start paying through the new system."
      },
      {
        "label": "Verify and go live",
        "description": "Run both systems side by side until subscriber counts and collections match, then retire UISP billing."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "Active subscriber count matches between both systems",
      "Payment collections reconcile for the first billing cycle",
      "MikroTik routers (if any) report healthy in DataRadius",
      "Subscriber notifications (SMS, email) reach end users",
      "Site locations appear correctly on the network map"
    ],
    "stayTitle": "When to stay on UISP",
    "stayIntro": "UISP is the better fit in several situations. Consider staying if any of these apply.",
    "stayReasons": [
      "Your entire network is Ubiquiti hardware and you want zero software cost for device management.",
      "You rely on UISP's topology visualization for airMax and airFiber links.",
      "You use UISP's integrated firmware management for Ubiquiti access points and radios.",
      "You do not need hotspot billing, mobile money payments or MikroTik router management."
    ],
    "faq": [
      {
        "q": "Does DataRadius manage Ubiquiti devices?",
        "a": "DataRadius manages MikroTik routers and TR-069 devices. Ubiquiti-specific device management (airMax, airFiber) stays with UISP or a separate tool."
      },
      {
        "q": "Can I use DataRadius for billing and keep UISP for devices?",
        "a": "Yes. Many operators use DataRadius for billing, payments and subscriber management while keeping UISP for Ubiquiti device monitoring."
      },
      {
        "q": "Is there downtime during the switch?",
        "a": "No. Customer records import without affecting the live network. Routers move one at a time."
      },
      {
        "q": "Does DataRadius support UPG payments?",
        "a": "DataRadius does not integrate with Ubiquiti's UPG payment processing. It supports Stripe, Paystack, Flutterwave and mobile money."
      },
      {
        "q": "What if my network is mixed Ubiquiti and MikroTik?",
        "a": "Connect MikroTik routers to DataRadius for provisioning. Keep Ubiquiti devices on UISP or manage TR-069 capable ones through DataRadius."
      }
    ],
    "sources": [
      {
        "label": "UISP help documentation (accessed 26 October 2026)",
        "url": "https://help.ui.com/hc/en-us/categories/6583256751511-UISP"
      }
    ],
    "closeTitle": "Ready to switch from UISP?",
    "closeReassurance": "14 days free. Keep UISP for devices if you need it.",
    "trademark": "UISP and Ubiquiti are trademarks of Ubiquiti Inc. This page is not affiliated with or endorsed by Ubiquiti.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  },
  {
    "slug": "from-sonar",
    "name": "Sonar",
    "heroTitle": "Switch from Sonar",
    "heroSub": "What transfers, how long it takes, and what to check — so you can decide whether the switch makes sense for your network.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. Sonar is a cloud-based OSS/BSS platform by Sonar Software Inc., serving broadband providers in the US and Canada with per-subscriber pricing starting at $500 per month.",
    "lastVerified": "Last verified: November 2026",
    "movesTitle": "What moves",
    "movesIntro": "DataRadius imports your core operating data from Sonar via CSV export. Here is what transfers and how.",
    "moves": [
      {
        "field": "Subscriber accounts",
        "detail": "Active and suspended subscriber records, including contact details, service status, addresses and account notes. Export from Sonar as CSV; import through the DataRadius wizard."
      },
      {
        "field": "Service plans",
        "detail": "Broadband plans with speeds, data limits and pricing. Recreate plans in DataRadius, then map imported subscribers to them."
      },
      {
        "field": "Invoices and payments",
        "detail": "Invoice history and payment records transfer for reporting continuity. DataRadius uses its own billing engine going forward."
      },
      {
        "field": "IP assignments",
        "detail": "Static and dynamic IP pools are preserved. DataRadius manages address assignment on connected routers."
      },
      {
        "field": "Router connections",
        "detail": "MikroTik routers connect to DataRadius directly. Each router is moved individually — disconnect from Sonar, connect to DataRadius."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Most providers finish within two to four weeks. The timeline depends on network size, the number of routers and how quickly payment provider callbacks are moved.",
    "steps": [
      {
        "label": "Export from Sonar",
        "description": "Export subscriber accounts, services, invoices and payment history as CSV files. Sonar provides bulk export tools and API access."
      },
      {
        "label": "Import and map fields",
        "description": "Upload the CSV files into DataRadius. The import wizard maps Sonar columns to DataRadius fields."
      },
      {
        "label": "Connect routers",
        "description": "Move MikroTik routers one at a time. Each router connects to DataRadius without disconnecting active subscribers."
      },
      {
        "label": "Run side by side",
        "description": "Keep both systems running for one to two weeks. Verify that collections and subscriber counts match."
      },
      {
        "label": "Go live",
        "description": "Retire Sonar when the active-subscriber totals and payment collections reconcile between both systems."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "Active subscriber count matches between both systems",
      "Payment collections reconcile for the first full billing cycle",
      "All routers report healthy in the DataRadius dashboard",
      "Subscriber portal login works for end users",
      "SMS and email notifications reach subscribers",
      "Scheduled reports generate correctly"
    ],
    "stayTitle": "When to stay on Sonar",
    "stayIntro": "Sonar is the better fit in several situations. Consider staying if any of these apply to your network.",
    "stayReasons": [
      "You are a US or Canadian broadband provider who needs Avalara tax compliance and sonarPay payment processing built in.",
      "You need multi-vendor device provisioning beyond MikroTik — Sonar supports Calix, Cambium, Adtran and other CPE vendors natively.",
      "You require VoIP billing with CDR processing. DataRadius does not offer voice billing.",
      "You need BEAD-ready reporting and FCC compliance tools. Sonar includes location tools and eligibility mapping for US broadband grant programmes.",
      "You are planning mergers or acquisitions. Sonar has handled 40 or more M&A transitions and has a tested consolidation workflow."
    ],
    "faq": [
      {
        "q": "How long does switching from Sonar take?",
        "a": "Two to four weeks for most providers. Networks with fewer than five routers often finish faster."
      },
      {
        "q": "Can I run Sonar and DataRadius at the same time?",
        "a": "Yes. Move routers one at a time while both systems run. Each router can be rolled back independently."
      },
      {
        "q": "Will subscribers lose connection during migration?",
        "a": "No. Routers switch authentication to DataRadius without disconnecting active sessions."
      },
      {
        "q": "How does pricing compare?",
        "a": "Sonar starts at $500 per month with an annual contract and charges $1.25 per subscriber. DataRadius uses usage-based pricing with no annual commitment. Compare both at your subscriber count."
      },
      {
        "q": "What about Sonar's scheduling and inventory features?",
        "a": "DataRadius includes field service management with job scheduling, dispatch and inventory tracking. Features like route optimization and GPS tracking differ between platforms."
      }
    ],
    "sources": [
      {
        "label": "Sonar pricing page (accessed 8 November 2026)",
        "url": "https://sonar.software/pricing"
      },
      {
        "label": "Sonar platform overview (accessed 8 November 2026)",
        "url": "https://sonar.software/platform"
      }
    ],
    "closeTitle": "Ready to switch from Sonar?",
    "closeReassurance": "14 days free. Move routers one at a time.",
    "trademark": "Sonar is a trademark of Sonar Software Inc. This page is not affiliated with or endorsed by Sonar Software.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  },
  {
    "slug": "from-powercode",
    "name": "Powercode",
    "heroTitle": "Switch from Powercode",
    "heroSub": "What transfers, how long it takes, and what to check — so you can decide whether the switch makes sense for your network.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. Powercode is an on-premise BSS/OSS platform by Powercode, serving regional ISPs since 2002 with per-subscriber pricing and self-hosted deployment.",
    "lastVerified": "Last verified: November 2026",
    "movesTitle": "What moves",
    "movesIntro": "DataRadius imports your core operating data from Powercode via CSV export. Here is what transfers and how.",
    "moves": [
      {
        "field": "Customer accounts",
        "detail": "Active and suspended customer records, including contact details, service addresses and account notes. Export from Powercode as CSV; import through the DataRadius wizard."
      },
      {
        "field": "Service plans",
        "detail": "Broadband plans with speeds, data limits and pricing. Recreate plans in DataRadius, then map imported subscribers to them."
      },
      {
        "field": "Invoices and payments",
        "detail": "Invoice history and payment records transfer for reporting continuity. DataRadius uses its own billing engine going forward."
      },
      {
        "field": "IP assignments",
        "detail": "Static and dynamic IP pools are preserved. DataRadius manages address assignment on connected routers."
      },
      {
        "field": "Router connections",
        "detail": "MikroTik routers connect to DataRadius directly. Each router is moved individually — disconnect from Powercode RADIUS, connect to DataRadius."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Most providers finish within two to four weeks. The timeline depends on how many routers and device types you operate.",
    "steps": [
      {
        "label": "Export from Powercode",
        "description": "Export customer records, services, invoices and payment history as CSV files from Powercode Command."
      },
      {
        "label": "Import and map fields",
        "description": "Upload the CSV files into DataRadius. The import wizard maps Powercode columns to DataRadius fields."
      },
      {
        "label": "Connect routers",
        "description": "Move MikroTik routers one at a time. Each router connects to DataRadius without disconnecting active subscribers."
      },
      {
        "label": "Run side by side",
        "description": "Keep both systems running for one to two weeks. Verify that collections and subscriber counts match."
      },
      {
        "label": "Go live",
        "description": "Retire Powercode when the active-subscriber totals and payment collections reconcile between both systems."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "Active subscriber count matches between both systems",
      "Payment collections reconcile for the first full billing cycle",
      "All routers report healthy in the DataRadius dashboard",
      "Subscriber portal login works for end users",
      "SMS and email notifications reach subscribers",
      "Scheduled reports generate correctly"
    ],
    "stayTitle": "When to stay on Powercode",
    "stayIntro": "Powercode is the better fit in several situations. Consider staying if any of these apply to your network.",
    "stayReasons": [
      "You need on-premise deployment and want full control of your server hardware. DataRadius is cloud-hosted.",
      "You operate multi-vendor equipment — Cambium, Ubiquiti, Mimosa, Tarana, Calix or Baicells — and need native provisioning for each. DataRadius works with MikroTik today, plus any TR-069 device.",
      "You require VoIP billing with CDR import from your voice switch. DataRadius does not offer voice billing.",
      "You need LTE or CBRS provisioning for Baicells or Tarana radios. DataRadius does not provision cellular equipment.",
      "You rely on Powercode's QuickBooks integration for your accounting workflow."
    ],
    "faq": [
      {
        "q": "How long does switching from Powercode take?",
        "a": "Two to four weeks for most providers. Networks with fewer than five routers often finish faster."
      },
      {
        "q": "Can I run Powercode and DataRadius at the same time?",
        "a": "Yes. Move routers one at a time while both systems run. Each router can be rolled back independently."
      },
      {
        "q": "Will subscribers lose connection during migration?",
        "a": "No. Routers switch authentication to DataRadius without disconnecting active sessions."
      },
      {
        "q": "Does DataRadius support the same device vendors?",
        "a": "DataRadius manages MikroTik routers and TR-069 devices. If your network includes Cambium, Ubiquiti or Calix equipment managed by Powercode, those devices would need a separate management tool."
      },
      {
        "q": "What about Powercode's inventory and dispatch features?",
        "a": "DataRadius includes field service management with job scheduling, dispatch, stock tracking and a technician mobile app. Serialised inventory with RMA workflows differs between platforms."
      }
    ],
    "sources": [
      {
        "label": "Powercode Command product page (accessed 8 November 2026)",
        "url": "https://powercode.com/command/"
      },
      {
        "label": "Powercode company overview (accessed 8 November 2026)",
        "url": "https://powercode.com/"
      }
    ],
    "closeTitle": "Ready to switch from Powercode?",
    "closeReassurance": "14 days free. Move routers one at a time.",
    "trademark": "Powercode is a trademark of Powercode. This page is not affiliated with or endorsed by Powercode.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  },
  {
    "slug": "from-mikrotik-user-manager",
    "name": "MikroTik User Manager",
    "heroTitle": "Switch from MikroTik User Manager",
    "heroSub": "Profiles, users and limitations — from User Manager to plan-based billing with payment collection and multi-router management.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. MikroTik User Manager is the built-in RADIUS server and hotspot management tool included with RouterOS, handling authentication and user profiles on a single router.",
    "lastVerified": "Last verified: October 2026",
    "movesTitle": "What moves",
    "movesIntro": "User Manager stores profiles and users on the router itself. DataRadius reads the existing configuration and creates matching records.",
    "moves": [
      {
        "field": "User profiles",
        "detail": "Speed and time-limit profiles become DataRadius plans. Export users from User Manager or let DataRadius read the router configuration."
      },
      {
        "field": "Hotspot users",
        "detail": "Active hotspot user accounts transfer with their assigned profiles. Sessions in progress are not interrupted."
      },
      {
        "field": "PPPoE users",
        "detail": "PPPoE credentials and assigned profiles transfer. Subscribers reconnect through DataRadius RADIUS authentication."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Most operators finish in a few days. User Manager networks are typically small enough that the entire migration runs in one session.",
    "steps": [
      {
        "label": "Connect your router",
        "description": "Add your MikroTik router to DataRadius. The connection is established without interrupting active users."
      },
      {
        "label": "Create plans",
        "description": "Recreate your User Manager profiles as DataRadius plans with matching speeds, data limits and pricing."
      },
      {
        "label": "Import users",
        "description": "Export users from User Manager as CSV or let DataRadius read the router's user list. Map users to plans."
      },
      {
        "label": "Switch authentication",
        "description": "Point the router's RADIUS to DataRadius. Existing sessions continue; new sessions authenticate through DataRadius."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "All users appear in the DataRadius subscriber list with the correct plan",
      "New hotspot and PPPoE sessions authenticate through DataRadius",
      "Speed limits match the original User Manager profiles",
      "Payment collection works (test with a small transaction)",
      "The subscriber portal is accessible to end users"
    ],
    "stayTitle": "When User Manager is enough",
    "stayIntro": "User Manager works well for simple setups. Consider staying if these describe your situation.",
    "stayReasons": [
      "You run fewer than 50 users on a single router and only need RADIUS authentication — no billing, invoicing or payment collection.",
      "You prefer keeping everything inside RouterOS with no external service dependency.",
      "You do not need reporting, payment integration or multi-router management."
    ],
    "faq": [
      {
        "q": "Does DataRadius replace User Manager on the router?",
        "a": "DataRadius handles authentication externally via RADIUS. User Manager can be disabled once DataRadius is managing your users."
      },
      {
        "q": "Do I need a public IP address?",
        "a": "No. DataRadius connects to your router over a secure outbound connection. It works behind NAT, 4G and satellite links."
      },
      {
        "q": "Can I manage multiple routers?",
        "a": "Yes. DataRadius manages all your MikroTik routers from one workspace, unlike User Manager which is per-router."
      },
      {
        "q": "What happens to users who are online during the switch?",
        "a": "Active sessions continue. New sessions authenticate through DataRadius once the RADIUS target is updated."
      },
      {
        "q": "Is there a cost difference?",
        "a": "User Manager is included with RouterOS at no extra cost. DataRadius charges per active subscriber. The value comes from payment collection, reporting and multi-router management."
      }
    ],
    "sources": [
      {
        "label": "MikroTik User Manager documentation (accessed 26 October 2026)",
        "url": "https://help.mikrotik.com/docs/spaces/ROS/pages/328129/User+Manager"
      }
    ],
    "closeTitle": "Ready to outgrow User Manager?",
    "closeReassurance": "14 days free. Your router stays online throughout.",
    "trademark": "MikroTik and RouterOS are trademarks of SIA Mikrotikls. This page is not affiliated with or endorsed by MikroTik.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  },
  {
    "slug": "from-mikhmon",
    "name": "Mikhmon",
    "heroTitle": "Switch from Mikhmon",
    "heroSub": "Vouchers, users and hotspot profiles — what changes when you move from a single-router tool to billing with payment collection.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. Mikhmon is a free, open-source PHP application that manages hotspot users on a single MikroTik router through the RouterOS API.",
    "lastVerified": "Last verified: October 2026",
    "movesTitle": "What moves",
    "movesIntro": "Mikhmon stores hotspot profiles and users on the MikroTik router. DataRadius reads the existing configuration when it connects.",
    "moves": [
      {
        "field": "Hotspot user profiles",
        "detail": "Speed, time and data profiles become DataRadius hotspot plans. The router's hotspot server configuration is updated, not replaced."
      },
      {
        "field": "Active users",
        "detail": "Users currently connected continue their sessions. New users authenticate through DataRadius after the switch."
      },
      {
        "field": "Voucher profiles",
        "detail": "Voucher types (time-limited, data-limited) become DataRadius plan equivalents. Already-printed vouchers continue to work on the router until they expire."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Most operators finish in a single day. Mikhmon setups are typically single-router, so the migration is straightforward.",
    "steps": [
      {
        "label": "Create a DataRadius workspace",
        "description": "Sign up for the free trial. Set up your workspace with your currency and payment provider."
      },
      {
        "label": "Connect your router",
        "description": "Add your MikroTik router to DataRadius. The connection updates the hotspot server — your existing configuration is preserved."
      },
      {
        "label": "Create plans",
        "description": "Recreate your Mikhmon voucher profiles as DataRadius hotspot plans with matching speeds, time limits and pricing."
      },
      {
        "label": "Activate the captive portal",
        "description": "DataRadius redirects hotspot users to its branded captive portal, where they select a plan and pay electronically."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "The captive portal loads correctly on a subscriber's device",
      "A test payment completes and the subscriber connects automatically",
      "Speed limits match the original Mikhmon profiles",
      "Already-printed vouchers still work for existing users",
      "Revenue and session counts appear in the DataRadius dashboard"
    ],
    "stayTitle": "When to stay on Mikhmon",
    "stayIntro": "Mikhmon is a capable tool for simple setups. Consider staying if these describe your situation.",
    "stayReasons": [
      "You run a single MikroTik hotspot with fewer than 100 users and only need voucher generation.",
      "Your subscribers pay with cash vouchers only, and you do not plan to add electronic payments.",
      "You prefer a free, self-hosted tool with no monthly cost and no external service dependency.",
      "You do not need multi-router management, billing, revenue reporting or a subscriber portal."
    ],
    "faq": [
      {
        "q": "Can I keep my existing MikroTik hotspot setup?",
        "a": "Yes. DataRadius updates your hotspot server configuration rather than replacing it. Existing walled-garden entries and user profiles are preserved."
      },
      {
        "q": "Do I need a public IP address?",
        "a": "No. DataRadius connects to your router over a secure outbound connection. It works behind NAT, 4G and satellite links."
      },
      {
        "q": "What happens to vouchers I already printed?",
        "a": "Vouchers already distributed continue to work on the router until they expire. DataRadius manages new subscribers through the captive portal."
      },
      {
        "q": "Can I still generate vouchers with DataRadius?",
        "a": "Yes. DataRadius supports voucher generation alongside its captive portal. You can use vouchers and electronic payments together."
      },
      {
        "q": "Is there a cost difference?",
        "a": "Mikhmon is free. DataRadius charges a percentage of collected hotspot revenue, with a small monthly minimum. The value comes from automated payment collection and multi-router management."
      }
    ],
    "sources": [
      {
        "label": "Mikhmon GitHub repository (accessed 26 October 2026)",
        "url": "https://github.com/laksa19/mikhmonv3"
      },
      {
        "label": "MikroTik Hotspot documentation (accessed 26 October 2026)",
        "url": "https://help.mikrotik.com/docs/spaces/ROS/pages/56459266/Hotspot"
      }
    ],
    "closeTitle": "Ready to outgrow Mikhmon?",
    "closeReassurance": "14 days free. Your router stays online throughout.",
    "trademark": "Mikhmon is developed by Laksa19. MikroTik and RouterOS are trademarks of SIA Mikrotikls. This page is not affiliated with either project.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  },
  {
    "slug": "from-spreadsheets",
    "name": "your current system",
    "heroTitle": "Switch from your current system",
    "heroSub": "Whether you run spreadsheets, a free tool or another billing platform — here is how the move works and what to prepare.",
    "entity": "DataRadius is ISP billing and management software that connects to MikroTik routers, collects payments through mobile money, cards and local providers, and manages subscribers, fiber and field teams from one workspace. This guide covers the general migration path regardless of what you currently use.",
    "lastVerified": "Last verified: October 2026",
    "movesTitle": "What moves",
    "movesIntro": "DataRadius imports your operating data from CSV files. Prepare these exports from your current system, spreadsheet or records.",
    "moves": [
      {
        "field": "Customer list",
        "detail": "Subscriber names, contacts, service addresses and account status. Any CSV with consistent columns works — the import wizard maps fields."
      },
      {
        "field": "Plan definitions",
        "detail": "Service plans with speeds, data limits and pricing. Create them in DataRadius, then assign imported subscribers."
      },
      {
        "field": "Payment history",
        "detail": "Past payment records import for reference and reporting continuity, where available."
      },
      {
        "field": "Router connections",
        "detail": "MikroTik routers connect to DataRadius directly. Each router is added to the workspace and provisions subscribers."
      }
    ],
    "timelineTitle": "Typical timeline",
    "timelineIntro": "Timeline depends on the size of your network and the quality of your existing records. Most providers finish in one to three weeks.",
    "steps": [
      {
        "label": "Prepare your data",
        "description": "Export or compile customer records, plan details and payment history into CSV files with consistent columns."
      },
      {
        "label": "Create your workspace",
        "description": "Sign up for the free trial. Configure your currency, payment providers and notification channels."
      },
      {
        "label": "Import and map fields",
        "description": "Upload CSV files into DataRadius. The import wizard maps your columns to DataRadius fields."
      },
      {
        "label": "Connect routers",
        "description": "Add MikroTik routers to DataRadius one at a time. Each router provisions subscribers without disconnecting active users."
      },
      {
        "label": "Verify and go live",
        "description": "Run both systems side by side until subscriber counts and collections match, then retire the old system."
      }
    ],
    "checklistTitle": "What to check after switching",
    "checklist": [
      "Active subscriber count matches your existing records",
      "Payment collections reconcile for the first billing cycle",
      "All routers report healthy in the DataRadius dashboard",
      "Subscriber notifications (SMS, email) reach end users",
      "Scheduled reports generate correctly"
    ],
    "stayTitle": "When to stay on your current system",
    "stayIntro": "Every system has trade-offs. Consider staying on your current setup if any of these apply.",
    "stayReasons": [
      "Your current system handles specific regulatory requirements (local e-invoicing, franchise licensing) that DataRadius does not yet support.",
      "You have deep custom integrations that would take significant time to replicate.",
      "Your current system works well and you are not experiencing payment collection, scaling or management issues."
    ],
    "faq": [
      {
        "q": "What file format does the import need?",
        "a": "CSV. Export customers, plans and balances from your current system. The import wizard maps the columns."
      },
      {
        "q": "Can I switch from a spreadsheet?",
        "a": "Yes. Save your spreadsheet as CSV and import it. The wizard handles column mapping and validation."
      },
      {
        "q": "Is there downtime during the switch?",
        "a": "No. Customer records import without affecting the live network. Routers move one at a time."
      },
      {
        "q": "What if my current system is not listed here?",
        "a": "Contact us with details about your current setup. We will map the migration path and help with any custom data formats."
      },
      {
        "q": "Do you help with the migration?",
        "a": "Yes. Every account includes a named migration engineer who reviews your import and answers questions throughout."
      }
    ],
    "sources": [],
    "closeTitle": "Ready to switch?",
    "closeReassurance": "14 days free. Move at your own pace.",
    "trademark": "All product names and trademarks are the property of their respective owners.",
    "correction": "If anything on this page is inaccurate, email hello@dataradius.net and we will correct it."
  }
];
