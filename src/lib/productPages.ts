// Product page copy ported from dataradius.net (apps/site/messages/en.json).
export type ProductFeature = {
  title: string;
  body?: string;
  steps?: { label: string; detail: string }[];
  items?: { label: string; detail: string }[];
  bullets?: string[];
  note?: string;
  link?: string;
};

export type ProductPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroSub: string;
  heroSecondary: string;
  features: ProductFeature[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  closeTitle: string;
  closeReassurance: string;
  closeSecondaryLabel?: string;
  closeSecondaryHref?: string;
};

export const billing: ProductPageData = {
  "metaTitle": "ISP billing and payments — DataRadius",
  "metaDescription": "Customers pay by card, mobile money or cash. Their account is credited, their internet comes back on its own, and every payment is reconciled — in your currency.",
  "eyebrow": "Billing and payments",
  "heroTitle": "Every payment matched.",
  "heroAccent": "Every late payer handled.",
  "heroSub": "Customers pay by card, mobile money or cash. Their account is credited and their internet comes back on its own.",
  "heroSecondary": "Explore the live product",
  "features": [
    {
      "title": "Chase late payers without making a single call.",
      "body": "Customers hear before their plan ends, get the grace you choose, and pause only when you say so. Key accounts are never cut off. The moment they pay, they are back online.",
      "steps": [
        {
          "label": "5, 3 and 1 day before expiry",
          "detail": "Reminders go out with a one-tap pay link inside each message."
        },
        {
          "label": "Plan ends",
          "detail": "Grace days keep them online a little longer. Set per plan or for everyone."
        },
        {
          "label": "Grace expires",
          "detail": "Access pauses. The pay link in every reminder still works."
        },
        {
          "label": "Collections ladder",
          "detail": "Reminder, warning, final notice — each with a pay link. Days are yours to set."
        },
        {
          "label": "Payment arrives",
          "detail": "Their account is credited and access comes back on its own. Nobody at your desk touched it."
        },
        {
          "label": "Key accounts",
          "detail": "Protected accounts are never paused. They get reminders, but they stay online."
        }
      ],
      "note": "3 reminders, 0 calls, paid, back online.",
      "link": "Explore the live product"
    },
    {
      "title": "No payment goes missing. Not even the odd ones.",
      "body": "Late confirmations are chased, double taps are charged once, and anything that cannot be placed waits in one list until you assign it in two clicks.",
      "steps": [
        {
          "label": "Slow confirmations chased",
          "detail": "A payment that takes longer than expected is checked again until it is confirmed or clearly failed."
        },
        {
          "label": "Duplicates blocked",
          "detail": "A second tap while the first is still pending joins the first payment. Charged once."
        },
        {
          "label": "Unplaced payments queued",
          "detail": "Money that cannot be matched to a customer waits in a list. Search, pick the right account, apply."
        }
      ],
      "note": "Every payment ended up where it belongs.",
      "link": "Explore the live product"
    },
    {
      "title": "Make it right before they ask.",
      "body": "When a site has been down, choose how to give time back, preview exactly who gets what, tell them, and undo it if you need to. Or let it happen on its own.",
      "steps": [
        {
          "label": "Choose the outage",
          "detail": "Pick the site and time window. DataRadius suggests detected outages."
        },
        {
          "label": "Preview the credits",
          "detail": "See who gets credited, who is skipped and why, and how much time each customer receives."
        },
        {
          "label": "Apply and notify",
          "detail": "Credits are applied and customers are told by SMS. Undo if you credited the wrong group."
        },
        {
          "label": "Automate it",
          "detail": "Turn on automatic credits. When a site comes back, the credits are already applied."
        }
      ],
      "note": "When a site comes back, the credits are already applied.",
      "link": "Explore the live product"
    },
    {
      "title": "Every payment lands in the account you choose.",
      "body": "Split money by service or by site. If an account has trouble, payments move to your backup, and move back when it recovers. Every switch is recorded.",
      "items": [
        {
          "label": "Rules you set",
          "detail": "Send Wi-Fi sales to one account and home internet to another. The first matching rule wins."
        },
        {
          "label": "Health-aware failover",
          "detail": "If an account stops confirming payments, traffic moves to your backup automatically."
        },
        {
          "label": "Cancellations ignored",
          "detail": "A customer cancelling their payment prompt does not count against the account's health."
        },
        {
          "label": "Every switch recorded",
          "detail": "An audit line is written every time payments move to a backup or back to the primary."
        }
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Your currency and number format, everywhere.",
      "body": "Set your currency when you sign up. Symbols, decimals and separators follow your country's convention across invoices, receipts, the portal and every report.",
      "bullets": [
        "Correct symbol and decimal places for your currency",
        "Number separators and symbol position match your country",
        "Billing runs on your local clock — expiry, debt age and midnight plans"
      ],
      "note": "The region selector on this page re-renders every amount — try it."
    },
    {
      "title": "Watch today's money arrive, payment by payment.",
      "body": "Revenue, forecasts, overdue invoices and payment health — updated as each payment lands.",
      "items": [
        {
          "label": "Live payments feed",
          "detail": "Every payment appears on your dashboard the moment it is confirmed. No refresh needed."
        },
        {
          "label": "Revenue chart and forecast",
          "detail": "See this month's revenue and next month's estimate side by side."
        },
        {
          "label": "Payment health",
          "detail": "Completion rate, processing time and a failure breakdown that shows which failed payments are yours to fix."
        },
        {
          "label": "Hide amounts",
          "detail": "Mask all money on screen when someone is looking over your shoulder. Tap any number to peek."
        }
      ]
    },
    {
      "title": "Invoices in your name and colours, ready to send.",
      "body": "Branded PDF invoices with your name, colours and tax line. Receipts sent automatically after every payment. Sequential numbers for your accountant.",
      "bullets": [
        "Branded invoice PDF with your name, colours and registration number",
        "Receipts sent by SMS and email after every payment — nobody has to send them",
        "Sequential invoice and receipt numbers per workspace",
        "Tax shown correctly on every invoice and receipt"
      ]
    },
    {
      "title": "Stop revenue leaks.",
      "body": "Expired sessions are disconnected, orphan credentials are cleaned, and free accounts need a reason and an approver.",
      "items": [
        {
          "label": "Expired sessions disconnected",
          "detail": "When a plan ends, access ends — even if the router still shows them online."
        },
        {
          "label": "Orphan credentials cleaned",
          "detail": "Removed customers cannot keep logging in. Left-behind credentials are cleaned daily."
        },
        {
          "label": "Free accounts audited",
          "detail": "Every free account needs a reason and an approver. A report shows free accounts nobody approved."
        },
        {
          "label": "Staff actions recorded",
          "detail": "See who gave free days, credit or cash — and why. Every staff money action is audited."
        }
      ]
    }
  ],
  "faqTitle": "Billing questions",
  "faqs": [
    {
      "q": "What payment methods can my customers use?",
      "a": "Card payments through Stripe, Paystack or Flutterwave, mobile money where available, bank transfers recorded by your team, and cash. You choose which to enable. Customers see only the methods available in their country."
    },
    {
      "q": "How many currencies does DataRadius support?",
      "a": "You set your currency when you sign up. Symbols, decimals and separators follow your country's convention. The system handles the formatting — you do not need to configure anything beyond choosing your currency."
    },
    {
      "q": "What happens if a payment fails or takes too long?",
      "a": "Late confirmations are checked again automatically. Double taps are blocked so the customer is charged once. Payments that cannot be matched to a customer wait in a list until you assign them in two clicks."
    },
    {
      "q": "What happens when a payment account goes down?",
      "a": "If your primary account stops confirming payments, DataRadius moves traffic to your backup account automatically and moves it back when the primary recovers. Every switch is recorded in the audit log."
    },
    {
      "q": "Can I give credits after an outage?",
      "a": "Yes. Choose the site and time window, preview who gets credited and who is skipped, apply credits and notify customers by SMS. You can undo a credit run, or turn on automatic credits so they are applied the moment a site comes back."
    },
    {
      "q": "How does DataRadius price billing?",
      "a": "You pay per active customer each month — not per router, invoice or API call. Wi-Fi hotspot operators pay a small share of completed sales instead. No setup fees, no contracts."
    }
  ],
  "closeTitle": "Start billing your subscribers today.",
  "closeReassurance": "14 days free. Every payment method ready on day one.",
  "closeSecondaryLabel": "Explore the live product",
  "closeSecondaryHref": "/demo"
};

export const network: ProductPageData = {
  "metaTitle": "ISP network and device management — DataRadius",
  "metaDescription": "Your MikroTik routers, access points and customer devices — watched live, backed up and fixable from your desk. One health number per router.",
  "eyebrow": "Network and devices",
  "heroTitle": "Know first.  Fix fast.",
  "heroAccent": "Tell everyone.",
  "heroSub": "Your routers watched live, backed up every night and fixable from your desk. One number tells you which tower needs you.",
  "heroSecondary": "Explore the live product",
  "features": [
    {
      "title": "Fix it from the office.",
      "body": "See a customer's line live, find the problem and fix their Wi-Fi router remotely — no van, no ladder.",
      "steps": [
        {
          "label": "Customer says it's slow",
          "detail": "Open their connection from the customer list. See their live traffic and plan usage."
        },
        {
          "label": "Look closer",
          "detail": "A 30-second deep look shows what is using the bandwidth and how many devices are connected."
        },
        {
          "label": "Change their Wi-Fi password",
          "detail": "Too many unknown devices? Change the Wi-Fi password from your desk. The freeloaders drop off."
        },
        {
          "label": "Restart their router",
          "detail": "Still slow? Restart their customer router remotely. Back online in under a minute."
        }
      ],
      "note": "Customer-router controls work on supported models.",
      "link": "Explore the live product"
    },
    {
      "title": "Paste one line. Your router appears.",
      "body": "No console sessions, no site visit. We read the router, set up your services, back it up and start watching it.",
      "steps": [
        {
          "label": "Name your router",
          "detail": "Give it a name — the tower, the building, the street. That is all you type."
        },
        {
          "label": "Copy one line",
          "detail": "A setup line appears. Copy it and paste it on the router."
        },
        {
          "label": "We find it and read it",
          "detail": "The router connects. We find the internet port and read what is already configured."
        },
        {
          "label": "Pick services",
          "detail": "Turn on PPPoE or hotspot. We apply, check every step, and keep a backup."
        },
        {
          "label": "It is on your board",
          "detail": "The router joins your fleet board with a health score, watched from now on."
        }
      ],
      "note": "Works with MikroTik routers.",
      "link": "Explore the live product"
    },
    {
      "title": "Main line down. Nobody noticed.",
      "body": "When one internet line fails, traffic moves to the other by itself, then back when it recovers.",
      "note": "Set up and watched for you by our network team.",
      "link": "Explore the live product"
    },
    {
      "title": "Room for how many more?",
      "body": "Pick a spot and see how many more customers your nearby towers can take — and what is holding them back.",
      "steps": [
        {
          "label": "Pick a location",
          "detail": "Choose a spot on your network. Nearby towers are highlighted with their current load."
        },
        {
          "label": "See what fits",
          "detail": "Each tower shows how many more customers it can take and what limits it — the internet line, memory or logins."
        },
        {
          "label": "Adjust your plans",
          "detail": "Change the average plan speed or sharing ratio. The numbers update instantly."
        },
        {
          "label": "Move customers",
          "detail": "A crowded tower? Move customers to one with room, in minutes."
        }
      ],
      "note": "An estimate from the router model, today's load and your plans.",
      "link": "Explore the live product"
    },
    {
      "title": "A safety net under every router.",
      "items": [
        {
          "label": "Backed up nightly and before every change",
          "detail": "Every router is backed up every night and before anything changes. Restore any version in one click."
        },
        {
          "label": "Unexpected changes flagged",
          "detail": "A change made outside DataRadius is detected and flagged on the router's header."
        },
        {
          "label": "Undo in one click",
          "detail": "Backed up before every change. If something goes wrong, put it back."
        },
        {
          "label": "Updates checked afterwards",
          "detail": "Router software updates in one click. We check the router is healthy after every update."
        }
      ]
    },
    {
      "title": "What runs on its own.",
      "bullets": [
        "Address pools grow before they run out",
        "Half-done routers are nudged until they are finished",
        "A bouncing router sends one alert, not two hundred",
        "Changes reach offline routers when they come back",
        "Management scripts keep themselves up to date",
        "Tampered settings are put back",
        "If a router loses its connection, it reconnects by itself",
        "Plans and logins are re-synced when a router comes back",
        "Ghost sessions are cleared and online counts always match"
      ]
    },
    {
      "title": "And more, without the console.",
      "bullets": [
        "See every port and its traffic without walking to the tower",
        "Read any router's log without logging in",
        "Every connected customer, per router, live",
        "Network reports that write themselves",
        "Open the router's own screens from your browser, no passwords",
        "A terminal when you need one, with a safety check",
        "Unique router passwords, changed in one click",
        "Every access point behind your routers, found and watched",
        "Manage supported customer Wi-Fi routers remotely",
        "Swap a dead router — same customers, same history, new passwords",
        "Move customers between routers in minutes",
        "Works with your existing setup — VLANs, pools and all"
      ]
    }
  ],
  "faqTitle": "Network questions",
  "faqs": [
    {
      "q": "Which routers does DataRadius support?",
      "a": "MikroTik routers — both older and newer generations. We handle the differences between them. Support for other router vendors is planned."
    },
    {
      "q": "How do I add a router?",
      "a": "Name it, copy one line and paste it on the router. DataRadius finds it, reads its setup, lets you turn on services and starts watching it. No site visit needed."
    },
    {
      "q": "Can I manage customer Wi-Fi routers?",
      "a": "Yes, on supported models. You can see connected devices, change the Wi-Fi password and restart the router — from your desk. Check which models are supported on the compatibility page."
    },
    {
      "q": "What happens when a router goes offline?",
      "a": "You are alerted within moments. When the router comes back, its plans and logins are brought up to date automatically and any commands you queued are applied."
    },
    {
      "q": "Are routers backed up?",
      "a": "Every router is backed up nightly and before any change. You can restore any version in one click. Changes made outside DataRadius are detected."
    },
    {
      "q": "Can I have two internet lines on one router?",
      "a": "Yes. Our network team sets up load balancing and failover across your internet lines. If one line fails, traffic moves to the other by itself."
    }
  ],
  "closeTitle": "Start watching your network today.",
  "closeReassurance": "14 days free. Your first router can be online in minutes.",
  "closeSecondaryLabel": "Explore the live product",
  "closeSecondaryHref": "/demo"
};

export const fibre: ProductPageData = {
  "metaTitle": "Fiber and OLT management — DataRadius",
  "metaDescription": "Expected light on every cable and closure, checked against what each home really receives. Faults narrowed to one section automatically. Your whole fiber network on one map.",
  "eyebrow": "Fiber",
  "heroTitle": "See every fibre, its light, and",
  "heroAccent": "every fault.",
  "heroSub": "Expected light on every cable and closure, checked against what each home really receives — so weak links show up before customers notice.",
  "heroSecondary": "Explore the live product",
  "features": [
    {
      "title": "Cut a fibre. Watch it get found and fixed.",
      "body": "Pick any cable and cut it. The system narrows down the fault, tells the right people and checks the repair.",
      "steps": [
        {
          "label": "Homes go dark",
          "detail": "The OLT notices homes have lost light. The affected section is identified automatically."
        },
        {
          "label": "Fault narrowed to one section",
          "detail": "The system works out which cable section is cut and how far from the OLT, using the distances it already knows."
        },
        {
          "label": "Customers told, job created",
          "detail": "An incident opens. Affected customers receive a message. A repair job is created and assigned to the nearest crew."
        },
        {
          "label": "Repaired and verified",
          "detail": "The technician splices the cable. Light levels return to normal on every home, checked one by one."
        }
      ],
      "note": "Demo timeline, played faster. In your network the first alert comes at the next OLT check — within minutes.",
      "link": "Explore the live product"
    },
    {
      "title": "See everyone connected behind each ONU.",
      "body": "Customers, Wi-Fi users and access points behind every ONU — what they use, and who was on it when it went dark.",
      "items": [
        {
          "label": "Broadband customers",
          "detail": "Name, plan, data used today and session time — linked from the ONU to their account."
        },
        {
          "label": "Wi-Fi users",
          "detail": "Hotspot users connected through the ONU, with their plan and usage."
        },
        {
          "label": "Access points",
          "detail": "Every AP behind the ONU, with latency, loss and chain position."
        },
        {
          "label": "Last-known list",
          "detail": "When an ONU goes dark, the last snapshot is kept so you know who was connected."
        }
      ],
      "note": "The full device list depends on your OLT. Check compatibility.",
      "link": "Explore the live product"
    },
    {
      "title": "Change one splitter. Every home downstream is recalculated.",
      "body": "When a technician changes a splice or splitter in the field, expected light is recalculated downstream and anything at risk is flagged.",
      "steps": [
        {
          "label": "Technician swaps a splitter",
          "detail": "From their phone, the technician records the new splitter ratio and reason."
        },
        {
          "label": "Light recalculated downstream",
          "detail": "Every home downstream gets a new expected reading, computed from the real path."
        },
        {
          "label": "At-risk homes flagged",
          "detail": "Homes close to the limit are flagged. A budget hint suggests whether a different optic adds headroom."
        },
        {
          "label": "Next check confirms",
          "detail": "When the OLT checks again, measured light is compared with the new expected values. Mismatches are flagged."
        }
      ],
      "note": "Recalculated in seconds after the change syncs.",
      "link": "Explore the live product"
    },
    {
      "title": "A new technician knows the network on day one.",
      "body": "Scan any label to see what is inside, where it goes and what the meter should read — even with no signal.",
      "steps": [
        {
          "label": "Navigate to the closure",
          "detail": "A compass points the way, with distance counting down as the technician walks."
        },
        {
          "label": "Scan the label",
          "detail": "The QR label opens the element page: type, splitter ratio, free ports, who mapped it and when."
        },
        {
          "label": "See what is inside",
          "detail": "A tray diagram shows every fibre by colour and number, with splice losses recorded."
        },
        {
          "label": "Check the reading",
          "detail": "Type the meter reading. Get a verdict: as expected, or darker with a likely cause and what to do next."
        },
        {
          "label": "Works offline",
          "detail": "Every screen works with no signal. Readings sync when the phone reconnects."
        }
      ],
      "note": "Spoken guidance walks new technicians through each step.",
      "link": "Explore the live product"
    },
    {
      "title": "Connect the OLTs you already have.",
      "body": "Hioso OLTs directly. Huawei, ZTE, VSOL and more through SmartOLT. Plug one in behind your router and it comes online.",
      "bullets": [
        "Plug in an OLT behind your MikroTik. It comes online with a guided setup.",
        "New ONUs appear. Register them in one tap.",
        "Already on SmartOLT? Connect it and see your OLTs beside billing and customers.",
        "The OLT model is recognised automatically. No firmware guessing."
      ],
      "link": "Check compatibility"
    },
    {
      "title": "Fix fading links before customers call.",
      "body": "A 90-day light trend shows which homes are slowly losing signal. A job is booked before the link fails.",
      "bullets": [
        "Light trending over 90 days, per home",
        "A fading link is flagged weeks before it fails",
        "A maintenance job is booked with the right cause and location",
        "See which PON port fills up next and when",
        "Map your network a little every day — suggested ports for unmapped ONUs"
      ]
    },
    {
      "title": "Know you can connect a home before you promise.",
      "body": "Pick a spot on the map. See the nearest splitter with free ports, the drop distance, and the expected light — before you send a crew.",
      "bullets": [
        "Nearest splitter, free ports, drop distance and expected light — computed instantly",
        "A far home shows a marginal verdict with the reason",
        "Toggle planned streets on the map and get a bill of materials in your currency",
        "Every home in the build checked for enough light before you dig"
      ],
      "link": "Explore the live product"
    }
  ],
  "faqTitle": "Fiber questions",
  "faqs": [
    {
      "q": "Which OLTs does DataRadius support?",
      "a": "Hioso OLTs are supported directly — EPON, XPON and GPON models. Huawei, ZTE, VSOL and others work through SmartOLT. Direct support for more brands is planned."
    },
    {
      "q": "How does the light-level check work?",
      "a": "DataRadius computes the expected light at every point in your network from your cables, splitters and optics. Each time the OLT is checked, measured readings are compared with expected values. Homes that are darker than expected are flagged."
    },
    {
      "q": "Can it tell a fiber cut from a power cut?",
      "a": "When the OLT reports the reason a home went dark, yes. On Hioso OLTs that information is not always available, so both causes are considered."
    },
    {
      "q": "Do technicians need signal to use the fiber tools?",
      "a": "No. Every fibre screen — closures, splitter diagrams, expected readings and path traces — works offline. Changes sync when the phone reconnects."
    },
    {
      "q": "Can I import my existing network map?",
      "a": "GeoJSON import is available via the API. KML and KMZ import from Google Earth is planned. Our migration team can help bring your existing plant data across."
    },
    {
      "q": "What if I only have a few OLTs mapped?",
      "a": "DataRadius shows you what is missing and suggests where to start. Technicians can map a closure or cable during every job, building the digital record over time."
    }
  ],
  "closeTitle": "Start free and put your fibre network on one map.",
  "closeReassurance": "14 days free. Your first OLT can be online today.",
  "closeSecondaryLabel": "Explore the live product",
  "closeSecondaryHref": "/demo"
};

export const hotspot: ProductPageData = {
  "metaTitle": "Hotspot billing and captive portal builder — DataRadius",
  "metaDescription": "Sell Wi-Fi by the hour, day or gigabyte with a branded login page your customers see the moment they join. Vouchers, free trials, ads and loyalty points — all tracked to the session.",
  "eyebrow": "Wi‑Fi hotspots",
  "heroTitle": "Sell Wi‑Fi with your own",
  "heroAccent": "login page.",
  "heroSub": "Customers join, pick a pass and pay — or use a code, a free trial or an ad. You see every sale as it happens.",
  "heroSecondary": "Explore the live product",
  "features": [
    {
      "title": "Sell hours, gigabytes, or both — your rules.",
      "body": "Build passes that count only while customers are online, end at midnight, cover a family's phones, or appear on a schedule. Every rule shows on the login page the moment you save it.",
      "bullets": [
        "Hours that only count while the customer is online — no wasted time",
        "Data passes and combined time-plus-data passes",
        "Passes that end at midnight, in your time zone",
        "One pass for several devices — shared data or separate",
        "Night bundles that appear and disappear on schedule",
        "Free passes with limits — once a day, or once ever"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Sell Wi‑Fi with printed codes — anywhere.",
      "body": "Make a thousand codes in seconds. Print cards for shops and resellers, send a code by message, or let customers type one on the login page. Guessing gets nobody online.",
      "steps": [
        {
          "label": "Make codes in bulk",
          "detail": "Choose a plan, a quantity and an optional prefix. Codes are ready in seconds — up to ten thousand at a time."
        },
        {
          "label": "Print or export",
          "detail": "Print cards on a thermal roll or A4 sheet. Export to CSV for resellers or point-of-sale systems."
        },
        {
          "label": "Send by message",
          "detail": "Send any code to a customer by SMS or WhatsApp — one tap from the voucher list."
        },
        {
          "label": "Guessing is blocked",
          "detail": "Repeated wrong codes lock the box and trigger an alert. Nobody gets online by guessing."
        }
      ],
      "note": "Each code works only for its plan, and guessing gets nobody online.",
      "link": "Explore the live product"
    },
    {
      "title": "Regulars are welcomed by name and buy in one tap.",
      "body": "Returning customers skip the steps. They see their balance, their points and a one-tap rebuy — on the same phone, without logging in again.",
      "items": [
        {
          "label": "Recognised on the same phone",
          "detail": "Returning customers see their name, balance and a one-tap rebuy card. No login needed."
        },
        {
          "label": "Loyalty points",
          "detail": "Customers earn points with every purchase and turn them into Wi‑Fi credit."
        },
        {
          "label": "Wallet balance",
          "detail": "Customers keep a balance and buy with one tap. Low-balance reminders are sent automatically."
        },
        {
          "label": "Safe on shared phones",
          "detail": "On a shared phone, a one-time code protects the balance before any spend."
        }
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Fill your quiet hours. Sales end on their own.",
      "body": "See your busiest hours on a heatmap. Pick a quiet slot, set a discount — customers see the deal, and it switches itself off.",
      "bullets": [
        "Busy-hours heatmap shows when customers are online and when they are not",
        "Run a flash sale for any time window — it ends by itself",
        "Best-selling plans ranked with trend lines",
        "Revenue and sessions compared with last week, per site"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "A different login page for every site.",
      "body": "Design one page for the café, another for the campus. Assign each to a site and customers see the right one.",
      "bullets": [
        "Each site gets its own login page and plan list",
        "Slow internet? A lightweight copy of your page still loads on the router",
        "Customers get reminded before their time runs out",
        "If something fails, customers still see how to pay"
      ]
    },
    {
      "title": "Everything else that runs your hotspot.",
      "bullets": [
        "Turn on a hotspot on a MikroTik in minutes with a guided setup",
        "Smart TVs connect with a code from any phone",
        "Let customers reach chosen sites before they pay",
        "Stop customers reselling your Wi‑Fi from their phones",
        "Block abusers across every site at once",
        "Let local businesses pay for your customers' Wi‑Fi with ads",
        "We watch your login pages and address pools — you hear first if something stops"
      ]
    },
    {
      "title": "Early access",
      "body": "These features are built and available on request.",
      "bullets": [
        "Give staff and guests their own username and password logins",
        "Post a notice on your login pages in seconds",
        "Keep cameras and card machines online — no login needed",
        "Pair TVs, cameras and consoles to a customer's pass"
      ]
    },
    {
      "title": "Design your Wi‑Fi login page.",
      "body": "Drag in plans, free trials and ads, pick your colours — then try it as a customer. Keep it when you start free.",
      "link": "Open the designer"
    }
  ],
  "faqTitle": "Hotspot questions",
  "faqs": [
    {
      "q": "Which routers can run a hotspot?",
      "a": "MikroTik routers with a hotspot-capable licence. DataRadius handles the configuration, portal hosting and session tracking. Check the compatibility page for supported models."
    },
    {
      "q": "How do customers pay?",
      "a": "Voucher codes, free trials, watching an ad, or a wallet balance — all available globally. Mobile-money payment is available in supported regions. Card payments are coming soon."
    },
    {
      "q": "Can I have different plans at different sites?",
      "a": "Yes. Each site can have its own plan list, order and login page design. Customers at one site never see plans meant for another."
    },
    {
      "q": "What happens if my internet is slow?",
      "a": "A lightweight copy of your login page is stored on the router. If the full page cannot load, customers still see your plans and can buy with a code."
    },
    {
      "q": "Can customers resell my Wi‑Fi?",
      "a": "You can block tethered resale per site. When enabled, customers who share their connection from their phone are stopped automatically."
    },
    {
      "q": "How do voucher codes work?",
      "a": "You create codes in bulk — up to ten thousand at a time — with an optional prefix. Each code is tied to a plan. Customers type it on the login page, or you send it by SMS or WhatsApp. Repeated wrong guesses lock the box."
    }
  ],
  "closeTitle": "Start free and sell Wi‑Fi with your own login page.",
  "closeReassurance": "14 days free. Your first hotspot can be online today.",
  "closeSecondaryLabel": "Explore the live product",
  "closeSecondaryHref": "/demo"
};

export const field: ProductPageData = {
  "metaTitle": "Field service and dispatch for ISPs — DataRadius",
  "metaDescription": "Jobs that open themselves from faults, go to the right team and come back with photos, readings and sign-off — even where there is no signal.",
  "eyebrow": "Field operations",
  "heroTitle": "Every technician, every job,",
  "heroAccent": "every part.",
  "heroSub": "Jobs that open themselves, go to the right team and come back with proof — even where there is no signal.",
  "heroSecondary": "Explore the live product",
  "features": [
    {
      "title": "The job that created itself.",
      "body": "When something breaks, a job opens itself with the right priority and deadline. It goes to the team that owns that area. First to claim it gets it — everyone else knows.",
      "bullets": [
        "One job per fault, not one per affected customer",
        "Urgent deadlines start the moment the fault is detected",
        "If the fault clears before anyone arrives, the job cancels itself",
        "Late jobs escalate — team lead first, then owner"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Drag a job. Their phone buzzes.",
      "body": "Assign in one move. The technician gets the job, the deadline and directions — and you see the moment they accept.",
      "bullets": [
        "See who is best for each job, and why — closest base, has room today, knows this site",
        "Assign the whole morning at once",
        "A suggested order for the day, with total distance"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "The whole job, in one hand.",
      "body": "Step-by-step jobs with photos, readings and customer sign-off — saved offline and sent the moment there is signal.",
      "steps": [
        {
          "label": "Briefing before arrival",
          "detail": "The job explains itself: affected customers, site, previous visits and what to bring."
        },
        {
          "label": "Guided steps anyone can follow",
          "detail": "Six phases from prep to sign-off. Required steps cannot be skipped."
        },
        {
          "label": "Photo proof with location",
          "detail": "Every photo shows where it was taken, when, and who took it."
        },
        {
          "label": "Customer signs on the phone",
          "detail": "A signature on the screen proves the work was done and accepted."
        },
        {
          "label": "Works without signal",
          "detail": "Everything saves on the phone. Readings, photos and sign-offs sync when signal returns."
        }
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Fixed from the office. No visit needed.",
      "body": "Check the account, the line and the customer's router in seconds — then fix common problems remotely. Your team decides.",
      "bullets": [
        "Checks run in seconds: account, connection, light level, router, outages and power",
        "Suggested fixes in plain words — reconnect, restart, re-apply the plan",
        "Nothing changes until your team presses a button",
        "Count the visits you did not need to make"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Start the day with only what needs you.",
      "body": "Deadlines at risk, field escalations with playable voice notes, timesheets to approve and stock variances — in one queue.",
      "bullets": [
        "See every technician's shift, current site and jobs done — without a single call",
        "Play a 30-second voice note from the field and read the transcript",
        "Approve timesheets built from the actual day, with exceptions shown",
        "Know who fixes it the first time — and who needs help"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "Know which van has every router.",
      "body": "Every part is tracked from the warehouse to the van to the customer's wall. Use a part on a job and the office ledger updates.",
      "bullets": [
        "Issue stock to a van with a signature",
        "Use a part on a job — scan or pick from the van list",
        "Recover equipment when a customer leaves",
        "Stock variances are flagged for review"
      ]
    },
    {
      "title": "Know when field data does not add up.",
      "body": "Photos far from the site, missing steps, stock used with no job — flagged for review, not punished automatically.",
      "bullets": [
        "Data that does not match is flagged, not silently accepted",
        "Technicians explain with a voice note",
        "Give your auditor the evidence in one download"
      ]
    },
    {
      "title": "Give every area of your network an owner.",
      "body": "Define teams, assign areas and set alert schedules. The right person gets the alert at the right hour. Others sleep.",
      "bullets": [
        "Teams own routers, sites and coverage areas",
        "Alerts follow the on-shift schedule and severity",
        "Do-not-disturb hours per team member"
      ]
    },
    {
      "title": "Everything else that runs your field team.",
      "bullets": [
        "Subscribers book their own visit from the portal",
        "Booking, arrival and completion messages on the channels you choose",
        "Offline maps — download the area, navigate without data",
        "Spoken help on every screen for technicians who prefer to listen",
        "Technician cash, accounted for — issue, spend, return, reconcile",
        "Safety incidents reported from the spot with photos and GPS",
        "A neighbor asks for internet? Capture the lead on the doorstep"
      ]
    }
  ],
  "faqTitle": "Field operations questions",
  "faqs": [
    {
      "q": "Does the technician app work offline?",
      "a": "Yes. Jobs, photos, readings and sign-offs are saved on the phone. Everything syncs when signal returns."
    },
    {
      "q": "How are jobs created automatically?",
      "a": "When a fault is detected — a router goes offline, light levels drop, or customers disconnect in a pattern — a job opens with the right priority and deadline. One job per fault, not one per customer."
    },
    {
      "q": "Can I see where my technicians are?",
      "a": "You can see who is on shift, what they have done today and where they last worked. Consent-based live positions are coming soon."
    },
    {
      "q": "How does dispatch work?",
      "a": "Drag a job to a technician on the dispatch board, or let the system suggest the best person based on proximity, availability and site knowledge. Their phone is notified instantly."
    },
    {
      "q": "Can technicians close jobs from the phone?",
      "a": "Yes. The guided runner walks through every step. Required photos and sign-off cannot be skipped. The job closes from the phone and the office sees the proof."
    },
    {
      "q": "How is stock tracked?",
      "a": "Parts move from the warehouse to a van, from the van to a job, and back if recovered. Every move is recorded with who, when and a signature where needed."
    }
  ],
  "closeTitle": "Start free and run your field team from one place.",
  "closeReassurance": "14 days free. Your first job can be dispatched today.",
  "closeSecondaryLabel": "Explore the live product",
  "closeSecondaryHref": "/demo"
};

export const subscribers: ProductPageData = {
  "metaTitle": "Subscriber portal and retention for ISPs — DataRadius",
  "metaDescription": "A self-service portal subscribers use to pay, check outages, change their Wi-Fi password and book a technician — while you see every step and keep more of them.",
  "eyebrow": "Subscriber experience",
  "heroTitle": "Subscribers who never need to",
  "heroAccent": "call you.",
  "heroSub": "They pay, check outages, change their Wi-Fi password and book a visit — from their phone. You see every step.",
  "heroSecondary": "Explore the live product",
  "features": [
    {
      "title": "One phone number, one portal, no passwords.",
      "body": "Subscribers sign in with their phone number. Hotspot, home and business — managed from a single portal. No usernames to forget.",
      "bullets": [
        "Sign in with a one-time code sent to their phone",
        "See their plan, balance, expiry and connection status in one screen",
        "Pay and renew from the same portal",
        "Book a technician visit in a free slot"
      ],
      "link": "Explore the live product"
    },
    {
      "title": "From sign-up to renewal — handled.",
      "body": "Add a subscriber, connect them, and let the system handle renewals, grace periods and reminders. Every state change is logged.",
      "bullets": [
        "New subscriber online before the installer leaves — account, credentials and welcome message in one step",
        "Paid means online. No one has to press a button",
        "Suspend with a reason — paid days wait for them",
        "Going away? Pause, don't cancel. Resume on the date you pick, or let them resume themselves"
      ]
    },
    {
      "title": "The customers you nearly lost — kept.",
      "body": "Grace periods, pay-later extensions, protected accounts and goodwill days. Each one is a customer who stayed.",
      "bullets": [
        "A few days' grace after expiry, then a clear cut-off — your rule",
        "Keep a good customer online until payday, within limits you set — repaid on the next payment",
        "Clinics and schools stay online. Reminders keep coming until they pay",
        "Give 140 people two free days after a long outage, in one move"
      ]
    },
    {
      "title": "Random disconnects, explained in plain words.",
      "body": "See every drop, the reason and the connection quality score. Open a job in one click when the problem needs a visit.",
      "bullets": [
        "30-day uptime bars for every subscriber — tap a red day to see why",
        "Causes in plain language: connection lost, their router restarted, your tower restarted",
        "A quality score for every connection, visible to the subscriber in their portal",
        "Bad connections become tickets before the complaint"
      ]
    },
    {
      "title": "Every message already written. Change any word.",
      "body": "Reminders, receipts, outage notices and visit updates — ready to send by SMS, WhatsApp or email. Edit any template and see a live preview.",
      "bullets": [
        "Templates grouped by moment: billing, lifecycle, visits, network and support",
        "Insert subscriber variables and see the message exactly as they will",
        "Message only the customers on one tower, one plan or one status — with a live count",
        "Know which messages arrived and which failed"
      ]
    },
    {
      "title": "Every complaint has an owner and a clock.",
      "body": "Requests arrive from the portal, WhatsApp, SMS or email — matched to the subscriber. Each one gets a response timer.",
      "bullets": [
        "Subscribers describe the issue, attach a voice note and track the fix — from their portal",
        "Voice notes transcribed for your team",
        "During an outage, subscribers see a notice instead of a ticket form",
        "Hand a ticket to the right team in one click"
      ]
    },
    {
      "title": "Everything else your subscribers touch.",
      "bullets": [
        "Business lines with a fixed IP address, managed alongside home subscribers",
        "Hotspot customers see their time, data and loyalty points in the same portal",
        "Expired at midnight — paid and back online by 00:02, no app, no call",
        "Subscribers choose how you reach them — SMS, WhatsApp or email per category",
        "Portal announcements targeted by tower, plan or service",
        "Subscribers rate each fix, team by team",
        "We bring your subscribers across from your routers — nothing retyped"
      ]
    }
  ],
  "faqTitle": "Subscriber management questions",
  "faqs": [
    {
      "q": "Can subscribers pay from the portal?",
      "a": "Yes. In regions with mobile money, they pay directly from the portal. Everywhere else, a pay link is sent by SMS or WhatsApp — subscribers pay by card or their local method and reconnect automatically."
    },
    {
      "q": "What can subscribers do in the self-service portal?",
      "a": "See their plan, balance and expiry. Pay and renew. Check connection quality. Book a technician visit. Ask for help with a voice note. Choose how you reach them."
    },
    {
      "q": "How does the pay-later feature work?",
      "a": "Your team grants a subscriber extra days within limits you set — maximum days per extension and per month. The extension is repaid automatically from their next payment. No chasing needed."
    },
    {
      "q": "What happens when a subscriber's plan expires?",
      "a": "Reminders go out before expiry — on the days you choose, with a pay link. Then a grace period you set. Then disconnection. Protected accounts like clinics and schools are never cut off automatically."
    },
    {
      "q": "How are subscriber complaints tracked?",
      "a": "Every request — from the portal, WhatsApp, SMS or email — becomes a ticket with a response timer. Voice notes are transcribed. During known outages, subscribers see a notice instead of a ticket form."
    },
    {
      "q": "Can I message a group of subscribers at once?",
      "a": "Yes. Filter by tower, plan, status or service type. You see a live count before sending. If it is an outage notice, tick one box and a resolved message goes to the same group when the outage ends."
    }
  ],
  "closeTitle": "Start free and let your subscribers help themselves.",
  "closeReassurance": "14 days free. The subscriber portal works from day one.",
  "closeSecondaryLabel": "Explore the live product",
  "closeSecondaryHref": "/demo"
};
