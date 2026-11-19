export type SwitchTool = {
  slug: string;
  name: string;
  tagline: string;
  moves: string[];
  watch: string[];
  steps: string[];
};

export const switchTools: SwitchTool[] = [
  {
    slug: "from-splynx",
    name: "Splynx",
    tagline: "Customers, tariffs, balances and PPPoE secrets move cleanly from Splynx.",
    moves: [
      "Customers with names, phones, emails and addresses",
      "Internet tariffs mapped to DataRadius plans",
      "Account balances and open invoices",
      "PPPoE usernames, passwords and static IPs",
      "Router inventory and site assignments",
    ],
    watch: [
      "Tariffs that use proration or custom day cycles: flag them for your migration engineer before import",
      "Custom RADIUS reply attributes in Splynx get recreated as plan rate limits in DataRadius",
      "Recurring billing runs on a different day in DataRadius: pick a cut-over at a cycle boundary",
      "Blocked-customer logic moves to plan expiry rules, check a few suspended accounts after import",
    ],
    steps: [
      "Export customers from Splynx (Customers, Export) as CSV, include tariff, balance and login fields",
      "Recreate your tariffs as plans in DataRadius with the same names",
      "Run the import wizard: it maps Splynx columns, flags duplicates and reports every row",
      "Move one router to DataRadius and verify a sample of subscribers authenticate and pay",
      "Run both systems side by side for one billing cycle, then move the remaining routers",
    ],
  },
  {
    slug: "from-uisp",
    name: "UISP",
    tagline: "Clients, sites, devices and service plans come across; device management is the part to plan.",
    moves: [
      "Clients with contact details and service addresses",
      "Service plans and active subscriptions",
      "Sites and their GPS locations",
      "Device inventory: models, serials and site assignment",
      "Payment records and account credit",
    ],
    watch: [
      "UISP manages devices; DataRadius manages billing and RADIUS. Plan which system keeps monitoring during the transition",
      "Suspension rules in UISP become plan expiry behaviour in DataRadius",
      "Data plans with usage caps need the same caps defined as DataRadius plan limits",
      "UCRM-era exports differ from current UISP exports: tell your engineer which you have",
    ],
    steps: [
      "Export clients and services from UISP (CRM section) as CSV",
      "Create matching plans in DataRadius, including data caps where used",
      "Import clients through the wizard and reconcile counts and balances",
      "Move your first router or access site to DataRadius and verify authentication",
      "Keep UISP running for monitoring during the side-by-side cycle, then retire it",
    ],
  },
  {
    slug: "from-mikrotik-user-manager",
    name: "MikroTik User Manager",
    tagline: "Profiles become plans and users become subscribers. The mental model changes more than the data.",
    moves: [
      "Users with their login credentials",
      "Profiles and profile limitations mapped to plans",
      "Customer records and credit balances",
      "Voucher batches, if you use them",
    ],
    watch: [
      "User Manager ties users to one router; DataRadius subscribers can roam across your network",
      "Time-based limitations (uptime limits) become plan durations",
      "Shared users and user-groups need a flat subscriber list before import",
      "User Manager has no billing: plan prices and payment collection are new, configure them before cut-over",
    ],
    steps: [
      "Export the user list from User Manager on each router",
      "Create one DataRadius plan per profile, with matching rate limits and durations",
      "Import users as subscribers with their existing usernames",
      "Point the router's RADIUS to DataRadius instead of User Manager: one command per router",
      "Verify a few users authenticate and their limits apply, then repeat per router",
    ],
  },
  {
    slug: "from-mikhmon",
    name: "Mikhmon",
    tagline: "Vouchers and hotspot users transfer; profiles become proper plans with real billing behind them.",
    moves: [
      "Hotspot users and their passwords",
      "User profiles mapped to DataRadius plans",
      "Voucher batches and unused voucher stock",
      "Comment fields carrying customer details",
    ],
    watch: [
      "Mikhmon writes users straight into RouterOS; DataRadius uses RADIUS. The router configuration changes, not just the data",
      "Voucher codes can be regenerated in DataRadius if the raw list was not kept",
      "Expiry by profile date-ranges becomes plan durations",
      "Users in the RouterOS user database are cleaned up when RADIUS takes over: take a backup first",
    ],
    steps: [
      "Export users and profiles from Mikhmon, or pull them from the RouterOS user database",
      "Create plans matching your profiles, including time and data limits",
      "Import users; keep their credentials so subscribers notice nothing",
      "Run the DataRadius setup command on the hotspot router: it switches auth to RADIUS and installs your portal",
      "Sell new vouchers from DataRadius and retire the old stock gradually",
    ],
  },
  {
    slug: "from-sonar",
    name: "Sonar",
    tagline: "Accounts, services, IP assignments and field operations all have a home in DataRadius.",
    moves: [
      "Accounts and contacts with service addresses",
      "Data services and their plan assignments",
      "IP assignments and subnets",
      "Inventory: equipment, serials and deployments",
      "Recurring invoices, credits and payments",
      "Dispatch jobs and technician assignments",
    ],
    watch: [
      "Sonar's service model is flexible; map each service type to a DataRadius plan before import",
      "IPAM entries move as plan or subscriber static IPs: subnets are recreated in DataRadius network settings",
      "Dispatch workflows become field jobs in DataRadius: open jobs can be recreated or finished in Sonar first",
      "Custom fields have no direct equivalent: export them as notes or tags",
    ],
    steps: [
      "Export accounts, services and IP assignments from Sonar",
      "Create plans per service type used on active accounts",
      "Import accounts through the wizard and reconcile service counts and balances",
      "Recreate inventory against subscribers and sites in DataRadius",
      "Run the side-by-side billing cycle, then move routers and retire Sonar",
    ],
  },
  {
    slug: "from-powercode",
    name: "Powercode",
    tagline: "Customers, services, equipment and dispatch move over; billing history archives cleanly.",
    moves: [
      "Customers with contacts and service addresses",
      "Internet services and tariffs",
      "Equipment inventory and customer-premises assignments",
      "Balances, credits and payment history",
      "Technicians and open tickets",
    ],
    watch: [
      "Powercode tariffs with bundled services need one DataRadius plan per sellable bundle",
      "Equipment linked to customers transfers as CPE records on subscribers",
      "Suspension automation in Powercode becomes plan expiry in DataRadius",
      "Open support tickets are not imported: close or export them for reference",
    ],
    steps: [
      "Export customers and services from Powercode",
      "Create matching plans and bundles in DataRadius",
      "Import and reconcile balances against a Powercode aging report",
      "Move a pilot router and verify subscriber sessions",
      "Run the side-by-side cycle, move routers, and keep Powercode read-only for reference",
    ],
  },
  {
    slug: "from-spreadsheets",
    name: "Spreadsheets",
    tagline: "From a spreadsheet, a free tool, or your own system: if you can produce a CSV, we can map the move.",
    moves: [
      "Subscriber names, phones and addresses",
      "Plan names and monthly prices",
      "Balances carried forward",
      "PPPoE or hotspot credentials, if you have them",
      "Router and site lists",
    ],
    watch: [
      "Inconsistent formats are the real work: one phone format, one date format, one column per value",
      "Duplicate rows get flagged on import: decide which record wins beforehand",
      "Subscribers without credentials get new ones provisioned at import",
      "If payments were recorded outside the sheet, reconcile balances once before import, not after",
    ],
    steps: [
      "Export or clean your sheet into CSV: name, phone, plan, balance, username",
      "Create the plans your sheet references, same names",
      "Run the import wizard: it validates every row and shows the errors before anything is created",
      "Connect your routers to DataRadius and verify a few subscribers pay and reconnect",
      "Keep the spreadsheet as an archive; the dashboard is the source of truth from day one",
    ],
  },
];
