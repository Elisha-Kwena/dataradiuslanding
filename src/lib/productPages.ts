export type ProductFeature = {
  title: string;
  body: string;
  steps?: { label: string; detail: string }[];
  items?: { label: string; detail: string }[];
  bullets?: string[];
  note?: string;
};

export type ProductPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroSub: string;
  features: ProductFeature[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  closeTitle: string;
  closeReassurance: string;
};

export const billing: ProductPageData = {
  metaTitle: "Billing | Every payment matched, every late payer handled",
  metaDescription:
    "Customers pay by card, mobile money or cash. Their account is credited, their internet comes back on its own, and every payment is reconciled.",
  eyebrow: "Billing & Payments",
  heroTitle: "Every payment matched. Every late payer",
  heroAccent: "handled.",
  heroSub:
    "Customers pay by card, mobile money or cash. Their account is credited and their internet comes back on its own.",
  features: [
    {
      title: "Chase late payers without making a single call.",
      body: "Customers hear before their plan ends, get the grace you choose, and pause only when you say so. The moment they pay, they are back online.",
      steps: [
        { label: "5, 3 and 1 day before expiry", detail: "Reminders go out with a one-tap pay link inside each message." },
        { label: "Plan ends", detail: "Grace days keep them online a little longer. Set per plan or for everyone." },
        { label: "Grace expires", detail: "Access pauses. The pay link in every reminder still works." },
        { label: "Collections ladder", detail: "Reminder, warning, final notice: each with a pay link. Days are yours to set." },
        { label: "Payment arrives", detail: "Their account is credited and access comes back on its own. Nobody touched it." },
        { label: "Key accounts", detail: "Protected accounts are never paused. They get reminders, but they stay online." },
      ],
      note: "3 reminders, 0 calls, paid, back online.",
    },
    {
      title: "No payment goes missing. Not even the odd ones.",
      body: "Late confirmations are chased, double taps are charged once, and anything that cannot be placed waits in one list until you assign it in two clicks.",
      items: [
        { label: "Slow confirmations chased", detail: "A payment that takes longer than expected is checked again until it is confirmed or clearly failed." },
        { label: "Duplicates blocked", detail: "A second tap while the first is still pending joins the first payment. Charged once." },
        { label: "Unplaced payments queued", detail: "Money that cannot be matched to a customer waits in a list. Search, pick the right account, apply." },
      ],
      note: "Every payment ended up where it belongs.",
    },
    {
      title: "Make it right before they ask.",
      body: "When a site has been down, choose how to give time back, preview exactly who gets what, tell them, and undo it if you need to. Or let it happen on its own.",
      steps: [
        { label: "Choose the outage", detail: "Pick the site and time window. DataRadius suggests detected outages." },
        { label: "Preview the credits", detail: "See who gets credited, who is skipped and why, and how much time each customer receives." },
        { label: "Apply and notify", detail: "Credits are applied and customers are told by SMS. Undo if you credited the wrong group." },
        { label: "Automate it", detail: "Turn on automatic credits. When a site comes back, the credits are already applied." },
      ],
    },
    {
      title: "Stop revenue leaks.",
      body: "Expired sessions are disconnected, orphan credentials are cleaned, and free accounts need a reason and an approver.",
      items: [
        { label: "Expired sessions disconnected", detail: "When a plan ends, access ends: even if the router still shows them online." },
        { label: "Orphan credentials cleaned", detail: "Removed customers cannot keep logging in. Left-behind credentials are cleaned daily." },
        { label: "Free accounts audited", detail: "Every free account needs a reason and an approver. A report shows free accounts nobody approved." },
        { label: "Staff actions recorded", detail: "See who gave free days, credit or cash: and why. Every staff money action is audited." },
      ],
    },
  ],
  faqTitle: "Billing questions",
  faqs: [
    { q: "What payment methods can my customers use?", a: "Card payments through Stripe, Paystack or Flutterwave, mobile money where available, bank transfers recorded by your team, and cash. You choose which to enable." },
    { q: "What happens if a payment fails or takes too long?", a: "Late confirmations are checked again automatically. Double taps are blocked so the customer is charged once. Payments that cannot be matched wait in a list until you assign them in two clicks." },
    { q: "What happens when a payment account goes down?", a: "If your primary account stops confirming payments, DataRadius moves traffic to your backup automatically and back when it recovers. Every switch is recorded in the audit log." },
    { q: "Can I give credits after an outage?", a: "Yes. Choose the site and time window, preview who gets credited, apply and notify by SMS. Undo a credit run, or turn on automatic credits entirely." },
    { q: "How does DataRadius price billing?", a: "You pay per active customer each month: not per router, invoice or API call. Wi-Fi hotspot operators pay a small share of completed sales instead. No setup fees, no contracts." },
  ],
  closeTitle: "Start billing your subscribers today.",
  closeReassurance: "14 days free. Every payment method ready on day one.",
};

export const network: ProductPageData = {
  metaTitle: "Network | Know first, fix fast, tell everyone",
  metaDescription:
    "Your MikroTik routers, access points and customer devices: watched live, backed up and fixable from your desk.",
  eyebrow: "Network & Devices",
  heroTitle: "Know first. Fix fast. Tell",
  heroAccent: "everyone.",
  heroSub:
    "Your routers watched live, backed up every night and fixable from your desk. One number tells you which tower needs you.",
  features: [
    {
      title: "Fix it from the office.",
      body: "See a customer's line live, find the problem and fix their Wi-Fi router remotely: no van, no ladder.",
      steps: [
        { label: "Customer says it's slow", detail: "Open their connection from the customer list. See live traffic and plan usage." },
        { label: "Look closer", detail: "A 30-second deep look shows what is using the bandwidth and how many devices are connected." },
        { label: "Change their Wi-Fi password", detail: "Too many unknown devices? Change the Wi-Fi password from your desk. The freeloaders drop off." },
        { label: "Restart their router", detail: "Still slow? Restart their customer router remotely. Back online in under a minute." },
      ],
      note: "Customer-router controls work on supported models.",
    },
    {
      title: "Paste one line. Your router appears.",
      body: "No console sessions, no site visit. We read the router, set up your services, back it up and start watching it.",
      steps: [
        { label: "Name your router", detail: "Give it a name: the tower, the building, the street. That is all you type." },
        { label: "Copy one line", detail: "A setup line appears. Copy it and paste it on the router." },
        { label: "We find it and read it", detail: "The router connects. We find the internet port and read what is already configured." },
        { label: "Pick services", detail: "Turn on PPPoE or hotspot. We apply, check every step, and keep a backup." },
        { label: "It is on your board", detail: "The router joins your fleet board with a health score, watched from now on." },
      ],
      note: "Works with MikroTik routers.",
    },
    {
      title: "A safety net under every router.",
      body: "Every router is backed up, watched for unexpected changes, and restorable in one click.",
      items: [
        { label: "Backed up nightly and before every change", detail: "Restore any version in one click." },
        { label: "Unexpected changes flagged", detail: "A change made outside DataRadius is detected and flagged on the router's header." },
        { label: "Undo in one click", detail: "Backed up before every change. If something goes wrong, put it back." },
        { label: "Updates checked afterwards", detail: "Router software updates in one click. We check the router is healthy after every update." },
      ],
    },
    {
      title: "What runs on its own.",
      body: "The routine work happens without you.",
      bullets: [
        "Address pools grow before they run out",
        "Half-done routers are nudged until they are finished",
        "A bouncing router sends one alert, not two hundred",
        "Changes reach offline routers when they come back",
        "Tampered settings are put back",
        "If a router loses its connection, it reconnects by itself",
        "Plans and logins are re-synced when a router comes back",
        "Ghost sessions are cleared and online counts always match",
      ],
    },
  ],
  faqTitle: "Network questions",
  faqs: [
    { q: "Which routers does DataRadius support?", a: "MikroTik routers: both older and newer generations. We handle the differences between them. Support for other router vendors is planned." },
    { q: "How do I add a router?", a: "Name it, copy one line and paste it on the router. DataRadius finds it, reads its setup, lets you turn on services and starts watching it. No site visit needed." },
    { q: "Can I manage customer Wi-Fi routers?", a: "Yes, on supported models. You can see connected devices, change the Wi-Fi password and restart the router: from your desk." },
    { q: "What happens when a router goes offline?", a: "You are alerted within moments. When the router comes back, its plans and logins are brought up to date automatically and any queued commands are applied." },
    { q: "Are routers backed up?", a: "Every router is backed up nightly and before any change. You can restore any version in one click. Changes made outside DataRadius are detected." },
    { q: "Can I have two internet lines on one router?", a: "Yes. Load balancing and failover across your internet lines: if one fails, traffic moves to the other by itself." },
  ],
  closeTitle: "Start watching your network today.",
  closeReassurance: "14 days free. Your first router can be online in minutes.",
};

export const fibre: ProductPageData = {
  metaTitle: "Fibre | See every fibre, its light, and every fault",
  metaDescription:
    "Expected light on every cable and closure, checked against what each home really receives. Faults narrowed to one section automatically.",
  eyebrow: "Fibre",
  heroTitle: "See every fibre, its light, and every",
  heroAccent: "fault.",
  heroSub:
    "Expected light on every cable and closure, checked against what each home really receives: so weak links show up before customers notice.",
  features: [
    {
      title: "Cut a fibre. Watch it get found and fixed.",
      body: "Pick any cable and cut it. The system narrows down the fault, tells the right people and checks the repair.",
      steps: [
        { label: "Homes go dark", detail: "The OLT notices homes have lost light. The affected section is identified automatically." },
        { label: "Fault narrowed to one section", detail: "The system works out which cable section is cut and how far from the OLT." },
        { label: "Customers told, job created", detail: "An incident opens. Affected customers receive a message. A repair job goes to the nearest crew." },
        { label: "Repaired and verified", detail: "The technician splices the cable. Light levels return to normal on every home, checked one by one." },
      ],
    },
    {
      title: "Change one splitter. Every home downstream is recalculated.",
      body: "When a technician changes a splice or splitter in the field, expected light is recalculated downstream and anything at risk is flagged.",
      steps: [
        { label: "Technician swaps a splitter", detail: "From their phone, the technician records the new ratio and reason." },
        { label: "Light recalculated downstream", detail: "Every home downstream gets a new expected reading, computed from the real path." },
        { label: "At-risk homes flagged", detail: "Homes close to the limit are flagged. A budget hint suggests whether a different optic adds headroom." },
        { label: "Next check confirms", detail: "Measured light is compared with the new expected values. Mismatches are flagged." },
      ],
    },
    {
      title: "A new technician knows the network on day one.",
      body: "Scan any label to see what is inside, where it goes and what the meter should read: even with no signal.",
      steps: [
        { label: "Navigate to the closure", detail: "A compass points the way, with distance counting down as the technician walks." },
        { label: "Scan the label", detail: "The QR label opens the element page: type, splitter ratio, free ports, who mapped it and when." },
        { label: "See what is inside", detail: "A tray diagram shows every fibre by colour and number, with splice losses recorded." },
        { label: "Check the reading", detail: "Type the meter reading. Get a verdict: as expected, or darker with a likely cause and what to do next." },
        { label: "Works offline", detail: "Every screen works with no signal. Readings sync when the phone reconnects." },
      ],
    },
    {
      title: "Fix fading links before customers call.",
      body: "A 90-day light trend shows which homes are slowly losing signal. A job is booked before the link fails.",
      bullets: [
        "Light trending over 90 days, per home",
        "A fading link is flagged weeks before it fails",
        "A maintenance job is booked with the right cause and location",
        "See which PON port fills up next and when",
        "Map your network a little every day: suggested ports for unmapped ONUs",
      ],
    },
  ],
  faqTitle: "Fiber questions",
  faqs: [
    { q: "Which OLTs does DataRadius support?", a: "Hioso OLTs directly: EPON, XPON and GPON models. Huawei, ZTE, VSOL and others work through SmartOLT. Direct support for more brands is planned." },
    { q: "How does the light-level check work?", a: "DataRadius computes the expected light at every point from your cables, splitters and optics. Measured readings are compared with expected values: darker homes get flagged." },
    { q: "Do technicians need signal to use the fiber tools?", a: "No. Every fibre screen, closures, splitter diagrams, expected readings and path traces, works offline. Changes sync when the phone reconnects." },
    { q: "Can I import my existing network map?", a: "GeoJSON import is available via the API. KML and KMZ import from Google Earth is planned. Our migration team can help bring your plant data across." },
    { q: "What if I only have a few OLTs mapped?", a: "DataRadius shows you what is missing and suggests where to start. Technicians map a closure or cable during every job, building the record over time." },
  ],
  closeTitle: "Put your fibre network on one map.",
  closeReassurance: "14 days free. Your first OLT can be online today.",
};

export const hotspot: ProductPageData = {
  metaTitle: "Hotspot | Sell Wi-Fi with your own login page",
  metaDescription:
    "Sell Wi-Fi by the hour, day or gigabyte with a branded login page. Vouchers, free trials, ads and loyalty points: all tracked to the session.",
  eyebrow: "Wi-Fi Hotspot",
  heroTitle: "Sell Wi-Fi with your own",
  heroAccent: "login page.",
  heroSub:
    "Customers join, pick a pass and pay: or use a code, a free trial or an ad. You see every sale as it happens.",
  features: [
    {
      title: "Sell hours, gigabytes, or both: your rules.",
      body: "Build passes that count only while customers are online, end at midnight, cover a family's phones, or appear on a schedule. Every rule shows on the login page the moment you save it.",
      bullets: [
        "Hours that only count while the customer is online: no wasted time",
        "Data passes and combined time-plus-data passes",
        "Passes that end at midnight, in your time zone",
        "One pass for several devices: shared data or separate",
        "Night bundles that appear and disappear on schedule",
        "Free passes with limits: once a day, or once ever",
      ],
    },
    {
      title: "Sell Wi-Fi with printed codes: anywhere.",
      body: "Make a thousand codes in seconds. Print cards for shops and resellers, send a code by message, or let customers type one on the login page.",
      steps: [
        { label: "Make codes in bulk", detail: "Choose a plan, a quantity and an optional prefix. Up to ten thousand at a time." },
        { label: "Print or export", detail: "Print cards on a thermal roll or A4 sheet. Export to CSV for resellers or point-of-sale systems." },
        { label: "Send by message", detail: "Send any code to a customer by SMS or WhatsApp: one tap from the voucher list." },
        { label: "Guessing is blocked", detail: "Repeated wrong codes lock the box and trigger an alert. Nobody gets online by guessing." },
      ],
    },
    {
      title: "Regulars are welcomed by name and buy in one tap.",
      body: "Returning customers skip the steps. They see their balance, their points and a one-tap rebuy: on the same phone, without logging in again.",
      items: [
        { label: "Recognised on the same phone", detail: "Returning customers see their name, balance and a one-tap rebuy card. No login needed." },
        { label: "Loyalty points", detail: "Customers earn points with every purchase and turn them into Wi-Fi credit." },
        { label: "Wallet balance", detail: "Customers keep a balance and buy with one tap. Low-balance reminders are sent automatically." },
        { label: "Safe on shared phones", detail: "On a shared phone, a one-time code protects the balance before any spend." },
      ],
    },
    {
      title: "Fill your quiet hours. Sales end on their own.",
      body: "See your busiest hours on a heatmap. Pick a quiet slot, set a discount: customers see the deal, and it switches itself off.",
      bullets: [
        "Busy-hours heatmap shows when customers are online and when they are not",
        "Run a flash sale for any time window: it ends by itself",
        "Best-selling plans ranked with trend lines",
        "Revenue and sessions compared with last week, per site",
      ],
    },
  ],
  faqTitle: "Hotspot questions",
  faqs: [
    { q: "Which routers can run a hotspot?", a: "MikroTik routers with a hotspot-capable licence. DataRadius handles the configuration, portal hosting and session tracking." },
    { q: "How do customers pay?", a: "Voucher codes, free trials, watching an ad, or a wallet balance: all available globally. Mobile-money payment is available in supported regions." },
    { q: "Can I have different plans at different sites?", a: "Yes. Each site can have its own plan list, order and login page design. Customers at one site never see plans meant for another." },
    { q: "What happens if my internet is slow?", a: "A lightweight copy of your login page is stored on the router. If the full page cannot load, customers still see your plans and can buy with a code." },
    { q: "Can customers resell my Wi-Fi?", a: "You can block tethered resale per site. When enabled, customers who share their connection from their phone are stopped automatically." },
    { q: "How do voucher codes work?", a: "Create codes in bulk, up to ten thousand at a time, with an optional prefix. Each code is tied to a plan. Repeated wrong guesses lock the box." },
  ],
  closeTitle: "Sell Wi-Fi with your own login page.",
  closeReassurance: "14 days free. Your first hotspot can be online today.",
};

export const field: ProductPageData = {
  metaTitle: "Field | Every technician, every job, every part",
  metaDescription:
    "Jobs that open themselves from faults, go to the right team and come back with photos, readings and sign-off: even where there is no signal.",
  eyebrow: "Field Operations",
  heroTitle: "Every technician, every job, every",
  heroAccent: "part.",
  heroSub:
    "Jobs that open themselves, go to the right team and come back with proof: even where there is no signal.",
  features: [
    {
      title: "The job that created itself.",
      body: "When something breaks, a job opens itself with the right priority and deadline. It goes to the team that owns that area. First to claim it gets it: everyone else knows.",
      bullets: [
        "One job per fault, not one per affected customer",
        "Urgent deadlines start the moment the fault is detected",
        "If the fault clears before anyone arrives, the job cancels itself",
        "Late jobs escalate: team lead first, then owner",
      ],
    },
    {
      title: "Drag a job. Their phone buzzes.",
      body: "Assign in one move. The technician gets the job, the deadline and directions: and you see the moment they accept.",
      bullets: [
        "See who is best for each job, and why: closest base, has room today, knows this site",
        "Assign the whole morning at once",
        "A suggested order for the day, with total distance",
      ],
    },
    {
      title: "The whole job, in one hand.",
      body: "Step-by-step jobs with photos, readings and customer sign-off: saved offline and sent the moment there is signal.",
      steps: [
        { label: "Briefing before arrival", detail: "The job explains itself: affected customers, site, previous visits and what to bring." },
        { label: "Guided steps anyone can follow", detail: "Six phases from prep to sign-off. Required steps cannot be skipped." },
        { label: "Photo proof with location", detail: "Every photo shows where it was taken, when, and who took it." },
        { label: "Customer signs on the phone", detail: "A signature on the screen proves the work was done and accepted." },
        { label: "Works without signal", detail: "Everything saves on the phone. Readings, photos and sign-offs sync when signal returns." },
      ],
    },
    {
      title: "Fixed from the office. No visit needed.",
      body: "Check the account, the line and the customer's router in seconds: then fix common problems remotely. Your team decides.",
      bullets: [
        "Checks run in seconds: account, connection, light level, router, outages and power",
        "Suggested fixes in plain words: reconnect, restart, re-apply the plan",
        "Nothing changes until your team presses a button",
        "Count the visits you did not need to make",
      ],
    },
    {
      title: "Start the day with only what needs you.",
      body: "Deadlines at risk, field escalations with playable voice notes, timesheets to approve and stock variances: in one queue.",
      bullets: [
        "See every technician's shift, current site and jobs done: without a single call",
        "Play a 30-second voice note from the field and read the transcript",
        "Approve timesheets built from the actual day, with exceptions shown",
        "Know who fixes it the first time: and who needs help",
      ],
    },
  ],
  faqTitle: "Field operations questions",
  faqs: [
    { q: "Does the technician app work offline?", a: "Yes. Jobs, photos, readings and sign-offs are saved on the phone. Everything syncs when signal returns." },
    { q: "How are jobs created automatically?", a: "When a fault is detected, a router goes offline, light levels drop, or customers disconnect in a pattern, a job opens with the right priority and deadline. One job per fault, not one per customer." },
    { q: "How does dispatch work?", a: "Drag a job to a technician on the dispatch board, or let the system suggest the best person based on proximity, availability and site knowledge. Their phone is notified instantly." },
    { q: "Can technicians close jobs from the phone?", a: "Yes. The guided runner walks through every step. Required photos and sign-off cannot be skipped. The job closes from the phone and the office sees the proof." },
    { q: "How is stock tracked?", a: "Parts move from the warehouse to a van, from the van to a job, and back if recovered. Every move is recorded with who, when and a signature where needed." },
  ],
  closeTitle: "Run your field team from one place.",
  closeReassurance: "14 days free. Your first job can be dispatched today.",
};

export const subscribers: ProductPageData = {
  metaTitle: "Subscribers | Subscribers who never need to call you",
  metaDescription:
    "A self-service portal subscribers use to pay, check outages, change their Wi-Fi password and book a technician: while you see every step.",
  eyebrow: "Subscribers",
  heroTitle: "Subscribers who never need to",
  heroAccent: "call you.",
  heroSub:
    "They pay, check outages, change their Wi-Fi password and book a visit: from their phone. You see every step.",
  features: [
    {
      title: "One phone number, one portal, no passwords.",
      body: "Subscribers sign in with their phone number. Hotspot, home and business: managed from a single portal. No usernames to forget.",
      bullets: [
        "Sign in with a one-time code sent to their phone",
        "See their plan, balance, expiry and connection status in one screen",
        "Pay and renew from the same portal",
        "Book a technician visit in a free slot",
      ],
    },
    {
      title: "The customers you nearly lost: kept.",
      body: "Grace periods, pay-later extensions, protected accounts and goodwill days. Each one is a customer who stayed.",
      bullets: [
        "A few days' grace after expiry, then a clear cut-off: your rule",
        "Keep a good customer online until payday, within limits you set: repaid on the next payment",
        "Clinics and schools stay online. Reminders keep coming until they pay",
        "Give 140 people two free days after a long outage, in one move",
      ],
    },
    {
      title: "Random disconnects, explained in plain words.",
      body: "See every drop, the reason and the connection quality score. Open a job in one click when the problem needs a visit.",
      bullets: [
        "30-day uptime bars for every subscriber: tap a red day to see why",
        "Causes in plain language: connection lost, their router restarted, your tower restarted",
        "A quality score for every connection, visible to the subscriber in their portal",
        "Bad connections become tickets before the complaint",
      ],
    },
    {
      title: "Every message already written. Change any word.",
      body: "Reminders, receipts, outage notices and visit updates: ready to send by SMS, WhatsApp or email. Edit any template and see a live preview.",
      bullets: [
        "Templates grouped by moment: billing, lifecycle, visits, network and support",
        "Insert subscriber variables and see the message exactly as they will",
        "Message only the customers on one tower, one plan or one status: with a live count",
        "Know which messages arrived and which failed",
      ],
    },
    {
      title: "Every complaint has an owner and a clock.",
      body: "Requests arrive from the portal, WhatsApp, SMS or email: matched to the subscriber. Each one gets a response timer.",
      bullets: [
        "Subscribers describe the issue, attach a voice note and track the fix: from their portal",
        "Voice notes transcribed for your team",
        "During an outage, subscribers see a notice instead of a ticket form",
        "Hand a ticket to the right team in one click",
      ],
    },
  ],
  faqTitle: "Subscriber management questions",
  faqs: [
    { q: "Can subscribers pay from the portal?", a: "Yes. In regions with mobile money, they pay directly from the portal. Everywhere else, a pay link is sent by SMS or WhatsApp: subscribers pay by card or their local method and reconnect automatically." },
    { q: "What can subscribers do in the self-service portal?", a: "See their plan, balance and expiry. Pay and renew. Check connection quality. Book a technician visit. Ask for help with a voice note. Choose how you reach them." },
    { q: "How does the pay-later feature work?", a: "Your team grants a subscriber extra days within limits you set: maximum days per extension and per month. The extension is repaid automatically from their next payment." },
    { q: "What happens when a subscriber's plan expires?", a: "Reminders go out before expiry: on the days you choose, with a pay link. Then a grace period you set. Then disconnection. Protected accounts are never cut off automatically." },
    { q: "How are subscriber complaints tracked?", a: "Every request becomes a ticket with a response timer. Voice notes are transcribed. During known outages, subscribers see a notice instead of a ticket form." },
    { q: "Can I message a group of subscribers at once?", a: "Yes. Filter by tower, plan, status or service type. You see a live count before sending." },
  ],
  closeTitle: "Let your subscribers help themselves.",
  closeReassurance: "14 days free. The subscriber portal works from day one.",
};
