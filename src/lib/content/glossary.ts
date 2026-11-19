// Ported from dataradius.net content/glossary: regenerate with extract-content.cjs
export const glossary = [
  {
    "slug": "aaa",
    "term": "AAA (Authentication, Authorization, Accounting)",
    "definition": "A framework for controlling network access, enforcing policies, and tracking subscriber usage.",
    "relatedTerms": [
      "RADIUS",
      "NAS",
      "PPPoE",
      "Accounting"
    ],
    "body": "AAA (Authentication, Authorization, Accounting) is the three-part security framework that governs how ISPs verify subscriber identity, determine what resources they can access, and record their network usage for billing and compliance.\n\n### How it works\n\nEach component of AAA serves a distinct purpose. **Authentication** verifies that a subscriber is who they claim to be, typically through a username and password checked against a RADIUS server. **Authorization** determines what the authenticated subscriber is allowed to do: which bandwidth tier applies, whether they receive a static or dynamic IP, and what traffic policies are enforced. **Accounting** records session data such as start and stop times, bytes transferred, and session duration.\n\nThese three functions usually run over the RADIUS protocol. When a subscriber initiates a PPPoE or hotspot connection, the NAS sends an Access-Request (authentication). The RADIUS server replies with an Access-Accept carrying attributes like rate limits (authorization). Throughout the session, the NAS sends Accounting-Start, Interim-Update, and Accounting-Stop packets to log usage.\n\n### Why it matters for ISPs\n\nAAA is the foundation of subscriber management. Without it, an ISP has no mechanism to enforce paid plans, cap data usage, or generate accurate invoices. Accounting records also serve as an audit trail for regulatory compliance and dispute resolution.\n\nDataRadius implements the full AAA lifecycle for every subscriber connection. Authentication and authorization happen in real time during session setup, while accounting data feeds directly into billing, usage dashboards, and subscriber analytics."
  },
  {
    "slug": "bandwidth",
    "term": "Bandwidth",
    "definition": "The maximum data transfer rate of a network link, typically measured in megabits or gigabits per second.",
    "relatedTerms": [
      "QoS",
      "FUP",
      "Simple Queue",
      "Throughput"
    ],
    "body": "Bandwidth is the theoretical upper limit of data that a network connection can carry in a given period, expressed in bits per second. When an ISP advertises a 50 Mbps plan, bandwidth is the metric being described, the ceiling of the pipe, not necessarily what the subscriber experiences moment to moment.\n\n### How it works\n\nBandwidth is determined by the physical medium (fiber, copper, wireless) and the encoding scheme used on it. A GPON fiber link, for instance, provides 2.488 Gbps downstream shared among all ONUs on a PON port. A MikroTik router with a gigabit Ethernet uplink is physically capped at 1 Gbps per interface.\n\nISPs allocate portions of their total available bandwidth to individual subscribers through rate-limiting mechanisms such as Simple Queues (MikroTik), RADIUS rate attributes, or traffic shaping policies. The allocated bandwidth per subscriber is often called the plan speed or committed information rate (CIR).\n\n### Why it matters for ISPs\n\nBandwidth is the primary product ISPs sell. Oversubscription, selling more aggregate plan speeds than the uplink can deliver, is standard practice, but it must be managed carefully. When too many subscribers are active simultaneously, contention causes speeds to fall below advertised rates.\n\nDataRadius ties each subscriber's plan speed directly to their RADIUS profile and MikroTik queue, so bandwidth allocation stays consistent with what the customer is paying for."
  },
  {
    "slug": "c2b",
    "term": "C2B (Customer to Business)",
    "definition": "An M-Pesa payment flow where a subscriber sends money to an ISP's Paybill number to pay for services.",
    "relatedTerms": [
      "M-Pesa",
      "Paybill",
      "STK Push",
      "Daraja API"
    ],
    "body": "C2B (Customer to Business) is an M-Pesa transaction type where the subscriber initiates a payment to a business's registered Paybill or Till number. It is one of the two primary collection methods available to ISPs operating in East Africa, alongside STK Push.\n\n### How It Works\n\nThe subscriber opens their M-Pesa menu (via USSD or app), selects \"Lipa na M-Pesa,\" enters the ISP's Paybill number, provides an account reference (typically their username or account number), enters the amount, and confirms with their PIN. Safaricom processes the transaction and sends a confirmation callback to the ISP's registered URL through the Daraja API.\n\nThe callback payload includes the transaction ID, amount, MSISDN (phone number), and the account reference the subscriber entered. The ISP's system uses the account reference to match the payment to the correct subscriber record.\n\n### Why It Matters for ISPs\n\nC2B is subscriber-initiated, meaning the ISP does not need the subscriber to be online or interacting with the ISP's portal at the time of payment. Subscribers can pay from anywhere, at any time, using the standard M-Pesa interface they already know.\n\nThe main challenge with C2B is account matching: subscribers sometimes enter incorrect or misspelled account references. DataRadius handles this by applying matching logic against known subscriber identifiers, including phone number and account number, to resolve payments even when the reference field contains errors."
  },
  {
    "slug": "captive-portal",
    "term": "Captive Portal",
    "definition": "A web page displayed to Wi-Fi users before granting network access, used for login, payment, or terms acceptance.",
    "relatedTerms": [
      "Hotspot",
      "MikroTik",
      "Walled Garden",
      "DNS"
    ],
    "body": "A captive portal is the web page a network presents to users when they first connect to a hotspot or restricted Wi-Fi network. Until the user completes the required action, logging in, entering a voucher code, accepting terms, or making a payment, their traffic is blocked or redirected.\n\n### How it works\n\nThe router intercepts HTTP and DNS requests from unauthenticated devices and redirects them to the portal URL. Resources that must remain accessible before login, such as the payment gateway or the portal page itself, are placed in a walled garden so the redirect does not block them. Once the user satisfies the portal requirements, the router marks the device as authorised and forwards traffic normally.\n\nOn MikroTik routers, the hotspot feature handles captive portal redirection natively. The portal page can be hosted on the router itself or served from an external URL, giving ISPs full control over branding, layout, and payment integrations.\n\n### Why it matters for ISPs\n\nA well-designed captive portal is the first interaction a subscriber has with the network. It determines whether users can self-serve, selecting a plan, paying via M-Pesa, and getting online without operator intervention. DataRadius provides a hosted captive portal that ISPs can brand with their own logo, colours, and domain, keeping the subscriber experience consistent across every hotspot location."
  },
  {
    "slug": "cgnat",
    "term": "CGNAT (Carrier-Grade NAT)",
    "definition": "ISP-level network address translation that maps many subscribers' private IPs to a shared pool of public addresses.",
    "relatedTerms": [
      "NAT",
      "Static IP",
      "IP Address",
      "VPN"
    ],
    "body": "CGNAT, or Carrier-Grade NAT, is a form of network address translation deployed at the ISP edge rather than at the subscriber's router. It allows an ISP to serve hundreds or thousands of subscribers using a small pool of public IPv4 addresses by translating their private addresses at scale.\n\n### How it works\n\nIn a standard home network, the subscriber's router performs NAT to share one IP among household devices. With CGNAT, the ISP assigns the subscriber's router a private address from a shared range (typically 100.64.0.0/10, the RFC 6598 space reserved for this purpose) and then translates that address to a public IP at the ISP's gateway. The result is double NAT: the subscriber's router translates once, and the ISP translates again.\n\nThe ISP's CGNAT device maintains a large translation table mapping subscriber sessions to public IP and port combinations. Because multiple subscribers share the same public IP, the ISP must log these mappings for regulatory compliance and abuse-report tracing.\n\n### Why it matters for ISPs\n\nIPv4 exhaustion makes CGNAT a practical necessity for most growing ISPs. Public IPv4 addresses are expensive, and regional allocations are limited. CGNAT lets operators onboard new subscribers without acquiring additional address space. The trade-off is added complexity: some protocols break under double NAT, port forwarding requires extra configuration, and remote router management needs an encrypted tunnel to bypass the translation layers."
  },
  {
    "slug": "coa",
    "term": "CoA (Change of Authorization)",
    "definition": "A RADIUS extension that lets ISPs modify or terminate active subscriber sessions without requiring a reconnect.",
    "relatedTerms": [
      "RADIUS",
      "PPPoE",
      "FUP",
      "DM (Disconnect Message)"
    ],
    "body": "CoA (Change of Authorization) is a RADIUS protocol extension defined in RFC 5176 that enables an ISP's management system to push attribute changes to active subscriber sessions in real time. It reverses the traditional RADIUS flow, instead of the NAS asking the server, the server tells the NAS to update a session.\n\n### How it works\n\nA CoA request is sent from the RADIUS server (or management platform) to the NAS, targeting a specific subscriber session by its session ID or username. The request contains updated RADIUS attributes, such as new bandwidth limits, VLAN assignment, or redirection URL. The NAS applies these changes immediately and responds with a CoA-ACK (success) or CoA-NAK (failure).\n\nA related mechanism is the Disconnect Message (DM), which terminates a session outright. DM is commonly used when a subscription expires or when an administrator needs to force a subscriber offline.\n\n### Why it matters for ISPs\n\nWithout CoA, any change to a subscriber's session parameters would require disconnecting and reconnecting the session. For subscribers on long-lived PPPoE sessions, this causes noticeable downtime and disrupts active connections.\n\nCoA enables ISPs to handle common operational scenarios transparently: upgrading or downgrading a plan takes effect instantly, fair-use policy throttling activates without a dropout, and expired accounts can be redirected to a renewal page rather than dropped.\n\nDataRadius sends CoA requests to NAS devices whenever a subscriber's plan changes, a FUP threshold is crossed, or an account status is updated, keeping sessions alive while policies adjust in real time."
  },
  {
    "slug": "daraja-api",
    "term": "Daraja API",
    "definition": "Safaricom's developer API for integrating M-Pesa payments, supporting STK Push, C2B, B2C, and transaction queries.",
    "relatedTerms": [
      "M-Pesa",
      "STK Push",
      "C2B",
      "Paybill"
    ],
    "body": "Daraja API is Safaricom's public REST API that enables developers and businesses to integrate M-Pesa payment functionality into their applications. The name \"Daraja\" means \"bridge\" in Swahili, reflecting its role as the connection between M-Pesa and third-party systems.\n\n### How It Works\n\nDaraja exposes several endpoints for different payment scenarios:\n\n- **STK Push (Lipa Na M-Pesa Online):** Initiates a payment prompt on the subscriber's phone. The subscriber confirms with their PIN, and the result is delivered via a callback URL.\n- **C2B Registration:** Registers validation and confirmation URLs so the business receives real-time notifications when a subscriber pays to their Paybill.\n- **B2C (Business to Customer):** Sends money from the business to a subscriber, used for refunds or disbursements.\n- **Transaction Status:** Queries the outcome of a specific transaction by its ID.\n\nAuthentication uses OAuth 2.0 with consumer key and secret pairs issued per app. All callbacks are HTTPS POST requests containing JSON payloads with transaction details.\n\n### Why It Matters for ISPs\n\nDaraja is the only official interface for programmatic M-Pesa operations. ISPs in East Africa rely on it for automated payment collection, real-time account crediting, and reconciliation.\n\nDataRadius connects to Daraja for both STK Push initiation and C2B callback processing. When a subscriber pays, the callback triggers automatic balance updates and, where configured, immediate service activation, removing the manual step between payment and connectivity."
  },
  {
    "slug": "dhcp",
    "term": "DHCP",
    "definition": "Dynamic Host Configuration Protocol automatically assigns IP addresses and network settings to devices on a LAN.",
    "relatedTerms": [
      "Option 82",
      "RADIUS",
      "IP Address",
      "NAS"
    ],
    "body": "DHCP (Dynamic Host Configuration Protocol) is a network protocol that automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses to devices when they connect to a network. It eliminates the need for manual IP configuration on each subscriber device.\n\n### How It Works\n\nDHCP follows a four-step process known as DORA:\n\n1. **Discover:** The client broadcasts a request for an IP address.\n2. **Offer:** The DHCP server responds with an available address and configuration parameters.\n3. **Request:** The client formally requests the offered address.\n4. **Acknowledge:** The server confirms the assignment and the lease duration.\n\nLeases are time-limited. The client must renew its lease before expiry or lose its address. This recycling mechanism lets ISPs serve more subscribers than they have addresses, since not all devices are online simultaneously.\n\n### Why It Matters for ISPs\n\nDHCP is the foundation of IP address management for ISPs that do not use PPPoE for subscriber authentication. In DHCP-based deployments, common in FTTH networks using OLTs, subscriber identification typically relies on Option 82 data inserted by relay agents, linking each DHCP request to a specific physical port or VLAN.\n\nISPs also use DHCP pools to segment subscribers by plan tier, assigning different subnets or gateway addresses based on service level.\n\nDataRadius supports DHCP-based subscriber identification alongside PPPoE, allowing ISPs to manage both authentication models within a single platform. DHCP lease events feed into session tracking and usage accounting the same way PPPoE sessions do."
  },
  {
    "slug": "dm",
    "term": "DM (Disconnect Message)",
    "definition": "A RADIUS packet sent to a NAS to immediately terminate an active subscriber session.",
    "relatedTerms": [
      "CoA",
      "RADIUS",
      "PPPoE",
      "NAS"
    ],
    "body": "DM (Disconnect Message) is a RADIUS protocol packet defined in RFC 5176, sent from the RADIUS server to the NAS to force the immediate termination of a subscriber's active session without waiting for the session to end naturally.\n\n### How it works\n\nIn standard RADIUS flows, the NAS initiates most communication: sending Access-Requests and Accounting packets to the server. Disconnect Messages reverse this direction. The RADIUS server (or an authorized management system) sends a Disconnect-Request packet to the NAS on UDP port 3799 (the standard CoA port). The packet identifies the target session using attributes like Acct-Session-Id, User-Name, or Framed-IP-Address. The NAS locates the matching session, tears it down, and responds with a Disconnect-ACK to confirm. If the session cannot be found, the NAS replies with a Disconnect-NAK.\n\nThis mechanism is sometimes called \"RADIUS PoD\" (Packet of Disconnect) and is closely related to CoA (Change of Authorization), which modifies a session in place rather than terminating it. Both use the same UDP port and share a similar packet structure.\n\n### Why it matters for ISPs\n\nDisconnect Messages give ISPs real-time control over active sessions. Common use cases include cutting off a subscriber who has exhausted their data bundle, removing a user flagged for non-payment, or forcing a reconnect so updated plan attributes take effect immediately.\n\nDataRadius sends Disconnect Messages to MikroTik NAS devices automatically when a subscriber's plan expires, their account is suspended, or an operator manually terminates a session from the dashboard. This ensures billing state and network state stay synchronized without manual router intervention."
  },
  {
    "slug": "dns",
    "term": "DNS (Domain Name System)",
    "definition": "A system that translates human-readable domain names into IP addresses for internet navigation.",
    "relatedTerms": [
      "DHCP",
      "Walled Garden",
      "Captive Portal",
      "MikroTik"
    ],
    "body": "DNS (Domain Name System) is the protocol responsible for converting domain names like `example.com` into the numeric IP addresses that networking equipment uses to route traffic, functioning as the internet's directory service.\n\n### How it works\n\nWhen a subscriber types a URL into their browser, the device sends a DNS query to a resolver: usually assigned by the ISP during DHCP or PPPoE session setup. The resolver checks its cache first. If the answer is not cached, it queries authoritative name servers in a hierarchical process: root servers, then top-level domain servers, then the domain's own name servers. The final IP address is returned to the subscriber's device, which then connects directly.\n\nISPs often operate their own recursive DNS resolvers to reduce latency for subscribers and maintain control over query handling. Custom DNS configurations also enable features like walled gardens, where unpaid or unauthenticated subscribers are redirected to a captive portal page instead of their intended destination.\n\n### Why it matters for ISPs\n\nDNS performance directly affects perceived internet speed. A slow resolver adds visible delay to every new page load, even on a fast connection. ISPs that run well-tuned local resolvers give subscribers a noticeably snappier browsing experience.\n\nBeyond performance, DNS is a control point. ISPs use DNS redirection to implement captive portals for hotspot login, enforce content filtering policies, and display payment reminders to subscribers with overdue balances. In a DataRadius deployment, MikroTik routers can be configured to intercept DNS traffic and redirect it through the ISP's resolver, enabling walled garden functionality for both hotspot and PPPoE subscribers."
  },
  {
    "slug": "fup",
    "term": "FUP (Fair Usage Policy)",
    "definition": "A bandwidth management rule that throttles subscriber speeds after they exceed a predefined data usage cap.",
    "relatedTerms": [
      "CoA",
      "PPPoE",
      "Bandwidth",
      "QoS"
    ],
    "body": "FUP (Fair Usage Policy) is a bandwidth management mechanism used by ISPs to regulate network consumption by reducing a subscriber's speed once they surpass a set data threshold within a billing cycle.\n\n### How It Works\n\nWhen a subscriber reaches their data cap, say 100 GB on a 50 Mbps plan, the ISP automatically downgrades their connection speed to a lower tier, such as 2 Mbps, for the remainder of the billing period. The subscriber stays connected but at reduced throughput. This is typically enforced through a RADIUS Change of Authorization (CoA) message sent to the NAS, which updates the session's rate limits in real time without disconnecting the user.\n\nFUP differs from a hard cap, where the connection is cut off entirely. With FUP, the subscriber can still browse, check email, and use lightweight services, they just cannot consume bandwidth at full speed.\n\n### Why It Matters for ISPs\n\nFUP lets ISPs offer attractively high headline speeds while protecting network performance for all subscribers. Without it, a small percentage of heavy users can degrade the experience for everyone on a shared access network.\n\nMost billing and network management platforms, including DataRadius, automate FUP enforcement by tracking cumulative usage from RADIUS accounting records and triggering a CoA the moment the threshold is crossed. This removes the need for manual intervention and ensures consistent policy application across thousands of active sessions."
  },
  {
    "slug": "gpon",
    "term": "GPON",
    "definition": "Gigabit Passive Optical Network: a fiber access technology that delivers high-speed internet from the ISP to subscriber premises.",
    "relatedTerms": [
      "OLT",
      "ONU",
      "Splitter",
      "Fiber"
    ],
    "body": "GPON is a passive optical network standard (ITU-T G.984) that allows ISPs to deliver gigabit-speed internet to subscribers over fiber optic cables. It is called \"passive\" because the distribution network between the ISP and the subscriber uses unpowered optical splitters rather than active electronics.\n\n### How it works\n\nA GPON network has three main components: the OLT (Optical Line Terminal) at the ISP's central office or point of presence, passive optical splitters in the field, and ONUs (Optical Network Units) at each subscriber's premises.\n\nThe OLT sends a downstream signal at 2.488 Gbps on a single fiber. Splitters divide this signal, typically in ratios of 1:8, 1:16, or 1:32, delivering it to multiple ONUs over individual drop fibers. Upstream, each ONU transmits at 1.244 Gbps using time-division multiple access (TDMA), so all subscribers share the upstream capacity without collision.\n\nA single GPON port on the OLT can serve up to 128 ONUs, though 1:32 or 1:64 split ratios are most common in practice.\n\n### Why it matters for ISPs\n\nGPON dramatically reduces the cost of last-mile fiber deployment. Because the distribution network is passive, there are no powered cabinets in the field to maintain, lowering both capital and operating costs compared to active Ethernet alternatives.\n\nDataRadius integrates with GPON infrastructure by communicating with OLTs to manage ONU registration, monitor optical power levels, and track subscriber-to-ONU mappings. This gives ISPs visibility into their fiber plant directly from the same platform that handles billing and authentication."
  },
  {
    "slug": "hotspot",
    "term": "Hotspot",
    "definition": "A shared Wi-Fi access point that requires user authentication and supports billing before granting internet access.",
    "relatedTerms": [
      "Captive Portal",
      "MikroTik",
      "Voucher",
      "M-Pesa"
    ],
    "body": "A hotspot is a Wi-Fi access point configured to authenticate users and optionally charge them before allowing internet access. ISPs deploy hotspots in public locations such as restaurants, apartment buildings, bus stations, and shopping centres to monetise shared connectivity.\n\n### How it works\n\nWhen a device connects to a hotspot SSID, the router intercepts the first web request and redirects it to a captive portal page. The user must then log in with credentials, enter a voucher code, or complete a payment, such as an M-Pesa transaction, before the router grants access. Session limits (time, data, or bandwidth) are enforced by the router, typically through RADIUS accounting.\n\nMikroTik routers are the most common hotspot platform among African ISPs because RouterOS includes a built-in hotspot server with RADIUS support, bandwidth shaping, and walled-garden configuration out of the box.\n\n### Why it matters for ISPs\n\nHotspots turn shared infrastructure into a pay-per-use revenue stream. Automated billing removes the need for manual voucher distribution, and real-time session tracking gives operators visibility into per-location performance. DataRadius connects to MikroTik hotspot routers and automates the full cycle, from subscriber payment through to session activation and disconnection, so ISPs can scale locations without adding manual work."
  },
  {
    "slug": "ip-address",
    "term": "IP Address",
    "definition": "A numeric identifier assigned to each device on a network, enabling communication and routing.",
    "relatedTerms": [
      "DHCP",
      "Static IP",
      "NAT",
      "CGNAT"
    ],
    "body": "An IP address is a unique numeric label assigned to every device participating in a computer network, used to identify the source and destination of data packets as they travel across the internet or a local network.\n\n### How it works\n\nIP addresses come in two versions. **IPv4** addresses use a 32-bit format written as four decimal octets (e.g., 192.168.1.1), providing roughly 4.3 billion unique addresses. **IPv6** uses 128 bits (e.g., 2001:db8::1) to support a vastly larger address space. Most ISPs still operate primarily on IPv4, often combined with NAT or CGNAT to stretch limited address pools across many subscribers.\n\nWhen a subscriber connects, the ISP assigns an IP address either dynamically via DHCP or a RADIUS attribute, or statically through a permanent reservation. Dynamic assignment draws from a shared pool, returning the address when the session ends. Static assignment binds a specific address to a subscriber account so it remains consistent across sessions.\n\n### Why it matters for ISPs\n\nIP address management directly affects service quality, regulatory compliance, and operational costs. ISPs must track which subscriber held which address at any given time to respond to abuse complaints or legal requests. Running out of available addresses causes connection failures, so pool sizing and reclamation need careful planning.\n\nDataRadius handles IP assignment as part of the RADIUS authentication flow. Operators can define address pools per plan, assign static IPs to individual subscribers, and monitor pool utilization from a single dashboard: keeping allocation organized as the network grows."
  },
  {
    "slug": "latency",
    "term": "Latency",
    "definition": "The time delay for data to travel between two points on a network, measured in milliseconds.",
    "relatedTerms": [
      "Throughput",
      "Bandwidth",
      "QoS",
      "DNS"
    ],
    "body": "Latency is the time it takes for a data packet to travel from its source to its destination across a network, typically measured as round-trip time (RTT) in milliseconds. It is one of the most noticeable indicators of network quality from a subscriber's perspective.\n\n### How it works\n\nLatency has multiple contributing components. **Propagation delay** is the physical time for a signal to traverse the medium, fiber, copper, or wireless. **Processing delay** occurs at each router or switch that inspects and forwards the packet. **Queuing delay** happens when packets wait in a buffer behind other traffic. **Serialization delay** is the time needed to push bits onto the wire.\n\nFor a typical fiber-to-the-home ISP, propagation delay is minimal over short distances. The dominant sources of latency are usually congestion-related queuing on oversubscribed links and DNS resolution time for initial page loads. Bufferbloat, excessive buffering in network equipment, is a common cause of latency spikes during peak hours.\n\n### Why it matters for ISPs\n\nHigh latency degrades the subscriber experience even when raw bandwidth is sufficient. Video calls stutter, online games become unplayable, and web pages feel sluggish. Subscribers often describe these symptoms as \"slow internet\" even though a speed test may show full throughput.\n\nISPs manage latency through proper QoS configuration, adequate backhaul capacity, and traffic shaping that prevents a few heavy users from congesting shared links. DataRadius gives operators visibility into per-subscriber and per-device latency metrics, making it straightforward to identify congested segments and validate that QoS policies are working as intended."
  },
  {
    "slug": "mpesa",
    "term": "M-Pesa",
    "definition": "Safaricom's mobile money service enabling payments, transfers, and bill settlement across East Africa.",
    "relatedTerms": [
      "STK Push",
      "Paybill",
      "C2B",
      "Daraja API"
    ],
    "body": "M-Pesa is a mobile money platform operated by Safaricom that allows users to deposit, withdraw, transfer money, and pay for goods and services directly from their mobile phone. It is the dominant payment method across Kenya, Tanzania, and several other East African markets.\n\n### How It Works\n\nM-Pesa operates on a SIM-based wallet system. Users register at an agent, load cash into their mobile wallet, and transact using USSD menus or the M-Pesa app. For business payments, subscribers send money to a Paybill number or Till number. The recipient business receives real-time confirmation of the payment through Safaricom's Daraja API, which delivers transaction callbacks over HTTPS.\n\nTwo primary payment flows are relevant for ISPs:\n\n- **C2B (Customer to Business):** The subscriber initiates payment to the ISP's Paybill number manually.\n- **STK Push:** The ISP triggers a payment prompt on the subscriber's phone, which they confirm with their PIN.\n\n### Why It Matters for ISPs\n\nIn East Africa, M-Pesa is not just one payment option: it is often the only payment method subscribers use. ISPs that lack M-Pesa integration lose the ability to collect payments efficiently.\n\nDataRadius integrates with M-Pesa through the Daraja API, supporting both STK Push and C2B flows. Payments are automatically matched to subscriber accounts, credited to balances, and reflected in billing records without manual reconciliation."
  },
  {
    "slug": "mikrotik",
    "term": "MikroTik",
    "definition": "A Latvian network equipment manufacturer widely used by ISPs for affordable routing, switching, and wireless.",
    "relatedTerms": [
      "RouterOS",
      "PPPoE",
      "Hotspot",
      "VPN"
    ],
    "body": "MikroTik is a network hardware and software company based in Latvia that manufactures routers, switches, and wireless equipment. Founded in 1996, MikroTik has become one of the most widely adopted equipment vendors among small and mid-sized ISPs globally, particularly in Africa, Southeast Asia, and Latin America.\n\n### Why ISPs Choose MikroTik\n\nMikroTik devices offer a combination of low cost and high configurability that makes them attractive to ISPs building or scaling their networks. A single MikroTik router can serve as a PPPoE concentrator, DHCP server, firewall, bandwidth manager, and hotspot gateway, roles that would require separate appliances from other vendors.\n\nAll MikroTik devices run RouterOS, a proprietary operating system that exposes a full API for remote management. This API allows external systems to create PPPoE accounts, set bandwidth limits, manage firewall rules, and monitor device health programmatically.\n\n### Common ISP Use Cases\n\n- **PPPoE access concentration:** Authenticating and managing subscriber sessions.\n- **Bandwidth shaping:** Applying per-subscriber speed limits through simple queues or queue trees.\n- **Hotspot gateway:** Serving captive portals for prepaid Wi-Fi access.\n- **VPN termination:** Establishing encrypted tunnels for remote management.\n\nThe RouterOS API enables ISPs to automate subscriber provisioning, apply plan changes, and monitor router status from a single dashboard, eliminating the need to log into each router individually through WinBox or the web interface."
  },
  {
    "slug": "nas",
    "term": "NAS (Network Access Server)",
    "definition": "A device that authenticates subscribers via RADIUS before granting network access.",
    "relatedTerms": [
      "RADIUS",
      "PPPoE",
      "MikroTik",
      "Option 82"
    ],
    "body": "NAS (Network Access Server) is a network device that serves as the gateway between subscribers and the broader internet, authenticating each connection request through a RADIUS server before allowing access.\n\n### How it works\n\nWhen a subscriber connects, their device sends credentials to the NAS: typically a MikroTik router or similar access device. The NAS forwards these credentials to a RADIUS server using Access-Request packets. If the RADIUS server validates the subscriber, it responds with an Access-Accept containing session parameters such as IP address, bandwidth limits, and session timeout. The NAS then applies these attributes and permits the subscriber onto the network.\n\nFor PPPoE deployments, the NAS terminates PPP sessions directly. In DHCP-based setups, it may use Option 82 to relay subscriber identification to the RADIUS server for authentication decisions.\n\n### Why it matters for ISPs\n\nThe NAS is the enforcement point where billing plans translate into actual network access. Without a properly configured NAS, an ISP cannot control who connects, at what speed, or for how long. Every disconnect message, change of authorization, and session accounting event flows through the NAS.\n\nIn a typical deployment, MikroTik routers act as the NAS. A management platform communicates with each router over an encrypted connection, pushing RADIUS configurations and subscriber policies automatically. This eliminates the need to manually configure RADIUS clients on every router, reducing setup errors and speeding up new site deployments."
  },
  {
    "slug": "nat",
    "term": "NAT (Network Address Translation)",
    "definition": "A routing technique that maps private IP addresses to one or more public IPs, enabling internet access for local networks.",
    "relatedTerms": [
      "CGNAT",
      "IP Address",
      "VPN",
      "Static IP"
    ],
    "body": "NAT, or Network Address Translation, is a method used by routers to translate private IP addresses on a local network to a public IP address when communicating with the internet. It allows many devices on a LAN to share a single public IP, which is essential given the limited supply of IPv4 addresses.\n\n### How it works\n\nWhen a device on a private network (for example, 192.168.1.x) sends a request to the internet, the NAT router replaces the source IP with its own public IP and tracks the mapping in a translation table. When the response arrives, the router looks up the original private IP in the table and forwards the packet to the correct device. This process is transparent to the end user.\n\nThe most common form is PAT (Port Address Translation), sometimes called NAT overload, where the router differentiates sessions by assigning unique source port numbers to each connection. A single public IP can support thousands of simultaneous sessions this way.\n\n### Why it matters for ISPs\n\nEvery ISP uses NAT at some level. Subscriber routers NAT the home network, and in many cases the ISP applies a second layer of NAT (CGNAT) at their own edge. Understanding NAT is critical for troubleshooting connectivity issues, configuring port forwarding for subscribers, and planning IP address allocation. DataRadius tracks the NAT configuration on each managed router, giving operators visibility into address assignments and connection states."
  },
  {
    "slug": "olt",
    "term": "OLT",
    "definition": "Optical Line Terminal: the ISP-side equipment in a GPON network that aggregates and manages subscriber fiber connections.",
    "relatedTerms": [
      "GPON",
      "ONU",
      "PON Port",
      "Splitter"
    ],
    "body": "OLT (Optical Line Terminal) is the headend device in a GPON deployment that sits at the ISP's point of presence or central office. It serves as the aggregation point for all subscriber fiber connections in a given area, converting between the ISP's core network and the passive optical distribution network.\n\n### How it works\n\nAn OLT contains multiple PON ports, each of which connects to a single fiber strand that feeds a tree of passive splitters. Through those splitters, a single PON port can serve dozens of ONUs at subscriber premises.\n\nThe OLT manages downstream traffic by broadcasting data to all connected ONUs on the PON port, each ONU filters and accepts only the frames addressed to it using GEM port encryption. For upstream traffic, the OLT coordinates time slots using TDMA, assigning each ONU a precise transmission window to prevent collisions on the shared fiber.\n\nBeyond data forwarding, the OLT handles ONU authentication (by serial number or password), bandwidth allocation via T-CONTs and DBA (Dynamic Bandwidth Allocation), and optical-layer monitoring including signal strength readings from each ONU.\n\n### Why it matters for ISPs\n\nThe OLT is the single most critical device in a fiber network, if it goes offline, every subscriber behind it loses connectivity. Proper monitoring of OLT health, PON port utilization, and optical power levels is essential to maintaining service quality.\n\nDataRadius connects to OLTs to pull real-time ONU status, optical signal readings, and registration data. This allows ISPs to detect degraded fiber links, manage ONU onboarding, and correlate subscriber accounts with their physical fiber termination point."
  },
  {
    "slug": "ont",
    "term": "ONT (Optical Network Terminal)",
    "definition": "A subscriber-premises fiber device that converts optical signals to electrical, often used interchangeably with ONU.",
    "relatedTerms": [
      "ONU",
      "GPON",
      "OLT",
      "Power Budget"
    ],
    "body": "An ONT (Optical Network Terminal) is the device installed at a subscriber's location that terminates the fiber-optic connection and provides Ethernet, Wi-Fi, or telephone ports for the end user. In everyday ISP operations, the terms ONT and ONU (Optical Network Unit) are used interchangeably, though ITU-T standards technically reserve ONT for the subscriber-side device in a GPON architecture.\n\n### How it works\n\nThe ONT receives downstream optical signals from the OLT through the passive splitter tree, converts them into electrical signals, and forwards traffic to the subscriber's local network. In the upstream direction, the ONT transmits data back to the OLT during its assigned time slot, following the GPON time-division multiple access (TDMA) protocol. Each ONT registers with the OLT using a serial number or password, and the OLT assigns it an ONU-ID for ongoing communication.\n\nMost ONTs also handle tasks like NAT, DHCP, VLAN tagging, and Wi-Fi access point functions, depending on the model and the ISP's configuration.\n\n### Why it matters for ISPs\n\nThe ONT is the last piece of ISP-managed equipment before the subscriber's own devices. Its signal levels, uptime, and firmware version directly affect the customer experience. Managing ONT inventory, activation status, and optical readings in a platform like DataRadius gives support teams the visibility they need to resolve issues without a site visit."
  },
  {
    "slug": "onu",
    "term": "ONU",
    "definition": "Optical Network Unit: the subscriber-side fiber terminal that converts optical signals to Ethernet for local devices.",
    "relatedTerms": [
      "GPON",
      "OLT",
      "ONT",
      "Power Budget"
    ],
    "body": "ONU (Optical Network Unit) is the customer premises equipment in a GPON network that terminates the fiber connection and provides Ethernet (and sometimes Wi-Fi or POTS) interfaces for the subscriber's local devices. The terms ONU and ONT (Optical Network Terminal) are often used interchangeably, though ONT technically refers to a single-subscriber unit per the ITU-T standard.\n\n### How it works\n\nThe ONU receives a downstream optical signal from the OLT via the passive splitter network. It demodulates this signal, extracts only the data frames assigned to it, and forwards them over its Ethernet ports to the subscriber's router or devices. In the upstream direction, the ONU converts electrical signals to optical and transmits during its allocated TDMA time slot.\n\nEach ONU is identified by a unique serial number. During registration, the OLT authenticates the ONU, typically by serial number matching, and assigns it a bandwidth profile. The ONU then reports its optical receive power and other diagnostics back to the OLT, which the ISP can monitor remotely.\n\n### Why it matters for ISPs\n\nThe ONU is the device that subscribers interact with directly, and its health determines the subscriber's experience. A degraded fiber connection, dirty connector, or failing ONU laser will reduce speeds or cause dropouts, often before the subscriber notices enough to report the issue.\n\nMonitoring ONU optical power levels proactively lets ISPs detect problems early. In DataRadius, ONU signal readings are collected from the OLT and surfaced alongside subscriber account data, so support teams can diagnose fiber-layer issues without logging into the OLT directly."
  },
  {
    "slug": "option-82",
    "term": "Option 82",
    "definition": "A DHCP relay agent information option that embeds subscriber location data into DHCP requests for identification.",
    "relatedTerms": [
      "DHCP",
      "RADIUS",
      "PPPoE",
      "NAS"
    ],
    "body": "Option 82 is a DHCP sub-option defined in RFC 3046 that allows relay agents to insert additional identifying information, such as the circuit ID and remote ID, into a subscriber's DHCP request before forwarding it to the DHCP server.\n\n### How It Works\n\nWhen a subscriber device sends a DHCP Discover broadcast, it passes through a relay agent (typically a switch or OLT). The relay agent appends Option 82 data to the packet, usually containing two sub-options:\n\n- **Circuit ID (Sub-option 1):** Identifies the physical port or VLAN the request originated from, for example, slot 0, port 3, VLAN 100.\n- **Remote ID (Sub-option 2):** Identifies the relay agent itself, often by MAC address or hostname.\n\nThe DHCP server uses this data to determine which subscriber is connecting and assign the correct IP address, subnet, and policy without requiring PPPoE authentication.\n\n### Why It Matters for ISPs\n\nFor ISPs running DHCP-based access networks (common in FTTH and fixed wireless), Option 82 is the primary method of tying a physical port to a subscriber account. It enables per-subscriber IP assignment, bandwidth policies, and usage tracking without a separate authentication protocol.\n\nDataRadius supports Option 82-based subscriber identification, allowing ISPs to match incoming DHCP requests to subscriber records and apply the correct service plan. This is especially useful in deployments where PPPoE is not desired but per-user accountability is still required."
  },
  {
    "slug": "paybill",
    "term": "Paybill",
    "definition": "A Safaricom M-Pesa business shortcode that allows subscribers to send payments to a registered business account.",
    "relatedTerms": [
      "M-Pesa",
      "STK Push",
      "C2B",
      "Till Number"
    ],
    "body": "Paybill is a Safaricom M-Pesa payment channel that assigns a short numeric code to a registered business. Subscribers use this shortcode along with an account reference to send payments from their M-Pesa wallet to the business.\n\n### How it works\n\nA subscriber dials the M-Pesa USSD menu, selects \"Lipa na M-Pesa,\" chooses \"Pay Bill,\" then enters the business shortcode and an account number. The account number is a reference that the business uses to identify which customer or invoice the payment applies to, for ISPs, this is typically the subscriber's username or account ID.\n\nOnce the subscriber confirms with their PIN, Safaricom processes the transaction and sends a Customer-to-Business (C2B) callback to the business's registered confirmation URL. This callback includes the phone number, amount, transaction ID, and the account reference the subscriber entered.\n\n### Why it matters for ISPs\n\nPaybill is the most common payment method for Kenyan ISPs. It works on every M-Pesa-enabled phone, including feature phones without internet access, making it accessible to all subscribers regardless of device.\n\nThe challenge with Paybill is that subscribers type the account reference manually, which leads to typos and mismatched payments. ISPs need reliable validation and matching logic on their end to handle these cases.\n\nDataRadius processes Paybill C2B callbacks automatically, matching incoming payments to subscriber accounts using the account reference. When a match is found, the corresponding plan is activated and the subscriber's session is updated via RADIUS, no manual reconciliation required."
  },
  {
    "slug": "pon-port",
    "term": "PON Port",
    "definition": "A physical port on an OLT that serves a tree of ONUs through passive splitters in a fiber network.",
    "relatedTerms": [
      "OLT",
      "GPON",
      "ONU",
      "Splitter"
    ],
    "body": "A PON port is a physical interface on an OLT (Optical Line Terminal) that connects to a single fiber strand and, through one or more passive splitters, serves a group of ONUs at subscriber premises. Each PON port defines the root of a point-to-multipoint fiber tree.\n\n### How it works\n\nA single GPON PON port can support up to 128 ONUs and delivers a shared downstream capacity of 2.488 Gbps with 1.244 Gbps upstream. The OLT schedules upstream time slots across all ONUs on the port using dynamic bandwidth allocation (DBA), ensuring fair access to the shared medium. Downstream traffic is broadcast to every ONU on the tree, but each ONU only decrypts and processes frames addressed to it via its GEM port mapping.\n\nThe number of PON ports on an OLT card determines how many independent fiber trees the chassis can serve. Common OLT line cards offer 4, 8, or 16 PON ports per card.\n\n### Why it matters for ISPs\n\nPON port utilization is a primary capacity planning metric. When a port approaches its subscriber or bandwidth ceiling, the ISP must either redistribute ONUs across ports or install additional OLT cards. Tracking per-port subscriber counts and traffic loads in a management platform like DataRadius helps operations teams spot saturation early and plan upgrades before subscribers notice degradation."
  },
  {
    "slug": "power-budget",
    "term": "Power Budget",
    "definition": "The maximum allowable optical signal loss between an OLT and ONU in a fiber link, measured in decibels.",
    "relatedTerms": [
      "GPON",
      "OLT",
      "ONU",
      "Splitter"
    ],
    "body": "Power budget is the total amount of optical loss a fiber link can tolerate while still delivering a usable signal to the subscriber's ONU. It is calculated as the difference between the OLT's transmit power and the ONU's minimum receive sensitivity, expressed in decibels (dB).\n\n### How it works\n\nEvery element in a fiber path introduces loss: the fiber cable itself (approximately 0.35 dB/km at 1310 nm), each splice (0.05 to 0.1 dB), each connector (0.3 to 0.5 dB), and every splitter stage (loss depends on the split ratio). To determine if a link will function, network engineers add up all expected losses and compare the total to the available power budget.\n\nFor example, a GPON Class B+ system offers roughly 28 dB of power budget. If a 1:32 splitter consumes 17.5 dB and 10 km of fiber adds 3.5 dB, the remaining margin for connectors, splices, and aging is about 7 dB. If total losses exceed the budget, the ONU cannot synchronize and the subscriber loses service.\n\n### Why it matters for ISPs\n\nRunning out of power budget is one of the most common causes of intermittent fiber faults: especially when ISPs add splitters without recalculating the link. Tracking component-level losses in a system like DataRadius lets field teams verify feasibility before installation and quickly isolate degradation when signal levels drop."
  },
  {
    "slug": "pppoe",
    "term": "PPPoE",
    "definition": "Point-to-Point Protocol over Ethernet: the session protocol ISPs use to authenticate and manage individual subscriber connections.",
    "relatedTerms": [
      "RADIUS",
      "CoA",
      "FUP",
      "MikroTik"
    ],
    "body": "PPPoE is a network protocol that encapsulates PPP frames inside Ethernet frames, giving ISPs the ability to manage individual subscriber sessions over shared broadband infrastructure. It is the most widely used access protocol among last-mile Internet providers.\n\n### How it works\n\nA subscriber's router or device broadcasts a PPPoE discovery request on the local network. The ISP's access concentrator, often a MikroTik router, responds and establishes a point-to-point session. During this handshake, the subscriber provides credentials (usually a username and password), which the access concentrator forwards to a RADIUS server for validation.\n\nOnce authenticated, the subscriber receives an IP address and a set of session parameters, bandwidth rate limits, DNS servers, and idle timeouts, all delivered through RADIUS attributes. The session remains active until the subscriber disconnects, the session times out, or the ISP terminates it via a Disconnect Message.\n\n### Why it matters for ISPs\n\nPPPoE solves a fundamental problem: how to identify, authenticate, and apply per-subscriber policies on a shared Ethernet segment. Each session is individually trackable, making it straightforward to enforce bandwidth plans, apply fair-use policies, and generate accurate accounting records.\n\nIn DataRadius, PPPoE sessions are the primary mechanism for subscriber access control. When a subscriber connects, DataRadius authenticates the session via RADIUS, assigns the correct bandwidth profile, and monitors usage in real time. Plan changes and FUP actions are applied mid-session using CoA, so subscribers stay connected without interruption."
  },
  {
    "slug": "qos",
    "term": "QoS (Quality of Service)",
    "definition": "The practice of prioritizing network traffic to guarantee bandwidth and performance for specific services or subscribers.",
    "relatedTerms": [
      "Bandwidth",
      "FUP",
      "Simple Queue",
      "MikroTik"
    ],
    "body": "QoS (Quality of Service) is a set of techniques ISPs use to manage network traffic by assigning different priorities to different types of data. Instead of treating every packet equally, QoS rules ensure that latency-sensitive traffic, such as VoIP calls or video streams, receives preferential treatment over less time-critical transfers like file downloads.\n\n### How it works\n\nQoS operates by classifying packets and placing them into priority queues. When a link becomes congested, higher-priority queues are served first. Common mechanisms include traffic shaping (smoothing burst rates to a target ceiling), traffic policing (dropping packets that exceed a rate), and queue disciplines that determine the order packets leave an interface.\n\nOn MikroTik routers, ISPs typically configure QoS through Simple Queues or queue trees. Simple Queues apply per-subscriber rate limits, while queue trees offer more granular, class-based hierarchies for advanced traffic engineering.\n\n### Why it matters for ISPs\n\nWithout QoS, a single heavy downloader can degrade the experience for every subscriber sharing the same link. Proper QoS configuration keeps browsing responsive, voice calls clear, and gaming latency low, even during peak hours.\n\nDataRadius reads each subscriber's plan speed and pushes matching Simple Queue entries to MikroTik routers automatically, keeping QoS rules in sync with billing without manual router edits."
  },
  {
    "slug": "radius",
    "term": "RADIUS",
    "definition": "Remote Authentication Dial-In User Service: the protocol ISPs use to authenticate, authorize, and account for subscriber sessions.",
    "relatedTerms": [
      "PPPoE",
      "CoA",
      "NAS",
      "Option 82"
    ],
    "body": "RADIUS is the standard AAA (Authentication, Authorization, and Accounting) protocol that ISPs rely on to control subscriber access to their networks. Defined in RFC 2865 and RFC 2866, RADIUS acts as the central decision-maker whenever a subscriber connects.\n\n### How it works\n\nWhen a subscriber initiates a connection, typically through PPPoE, the Network Access Server (NAS) forwards the credentials to a RADIUS server. The server checks the subscriber's identity against its database, then returns an Access-Accept or Access-Reject response. If accepted, the response includes session attributes such as bandwidth limits, IP assignment, and session timeout.\n\nThroughout the session, the NAS sends Accounting packets to the RADIUS server, recording data like session duration, bytes transferred, and disconnect reason. This accounting data is essential for usage-based billing, fair-use policy enforcement, and capacity planning.\n\n### Why it matters for ISPs\n\nRADIUS gives ISPs a single point of control over who connects, what speeds they receive, and how their usage is tracked. Without it, managing thousands of concurrent subscribers would require per-device configuration, an approach that does not scale.\n\nDataRadius uses RADIUS as its core session-management protocol, handling authentication, applying bandwidth profiles, and collecting real-time accounting data from every NAS in the network. Combined with CoA support, this allows mid-session changes like plan upgrades or FUP throttling without disconnecting the subscriber."
  },
  {
    "slug": "routeros",
    "term": "RouterOS",
    "definition": "MikroTik's proprietary router operating system featuring CLI, GUI, and API access for network management.",
    "relatedTerms": [
      "MikroTik",
      "PPPoE",
      "Hotspot",
      "VPN"
    ],
    "body": "RouterOS is the operating system that runs on all MikroTik networking devices. It provides routing, firewall, bandwidth management, hotspot, VPN, and wireless functionality through a unified platform that ISPs can manage via command line, web interface, WinBox, or a programmatic API.\n\n### How It Works\n\nRouterOS is a Linux-based OS with a proprietary management layer. It can be accessed through multiple interfaces:\n\n- **WinBox:** A native Windows GUI application (also runs via Wine on macOS/Linux) for graphical configuration.\n- **CLI (Terminal/SSH):** Text-based configuration for scripting and automation.\n- **REST API (v7+):** An HTTP-based API introduced in RouterOS v7 for modern integrations.\n- **Legacy API (port 8728/8729):** A binary protocol available since RouterOS v3, widely used by management platforms.\n\nRouterOS organizes configuration into logical sections, `/ip address`, `/ppp secret`, `/queue simple`, each configurable through any of the access methods above.\n\n### Why It Matters for ISPs\n\nRouterOS's API is what makes MikroTik devices viable for automated ISP operations. Without it, every subscriber change, adding a PPPoE account, adjusting a speed limit, blocking a user, would require manual login to each router.\n\nA management platform communicates with RouterOS through its API to provision subscriber sessions, apply bandwidth profiles, manage hotspot users, and sync configuration changes across a fleet of routers, eliminating the need to log into each device individually."
  },
  {
    "slug": "simple-queue",
    "term": "Simple Queue",
    "definition": "A MikroTik RouterOS feature that applies per-subscriber bandwidth limits using a first-match queue list.",
    "relatedTerms": [
      "QoS",
      "MikroTik",
      "Bandwidth",
      "PPPoE"
    ],
    "body": "Simple Queue is MikroTik RouterOS's built-in mechanism for limiting the upload and download speed of individual subscribers or IP addresses. Each entry in the Simple Queue list defines a target (an IP, subnet, or PPPoE interface) and a max-limit for both upload and download directions.\n\n### How it works\n\nRouterOS evaluates Simple Queues from top to bottom. When a packet matches a queue's target, that queue's rate limits apply and no further queues are checked. Each queue can also define a burst-limit, burst-threshold, and burst-time, allowing subscribers short speed boosts before settling to their plan rate. Priority values (1 to 8) let ISPs ensure that certain queues are served first when a parent link is congested.\n\nISPs often pair Simple Queues with PPPoE or DHCP bindings so that every authenticated session gets an automatic speed cap matching the subscriber's plan.\n\n### Why it matters for ISPs\n\nSimple Queues are the most straightforward way to enforce fair usage on a MikroTik network. They prevent any single user from consuming the entire uplink and give operators a per-subscriber view of real-time bandwidth consumption directly in WinBox or the RouterOS terminal.\n\nDataRadius creates, updates, and removes Simple Queue entries on MikroTik routers whenever a subscriber's plan changes or their account is suspended, eliminating the need to manage queue lists by hand."
  },
  {
    "slug": "snmp",
    "term": "SNMP (Simple Network Management Protocol)",
    "definition": "A protocol for monitoring and managing network devices such as routers, switches, and OLTs remotely.",
    "relatedTerms": [
      "OLT",
      "MikroTik",
      "ONU",
      "Bandwidth"
    ],
    "body": "SNMP (Simple Network Management Protocol) is a widely adopted application-layer protocol that allows network administrators to query devices for operational data, receive alerts about hardware issues, and modify device configurations from a central management system.\n\n### How it works\n\nSNMP operates on a manager-agent model. The **manager** (a monitoring server or platform) sends requests to **agents** running on network devices such as routers, switches, and OLTs. Each agent exposes a structured data tree called a MIB (Management Information Base), which defines the metrics available for that device: interface traffic counters, CPU utilization, memory usage, uptime, optical signal levels, and more.\n\nThree core operations drive the protocol. **GET** retrieves a specific value from the MIB. **SET** writes a configuration change to the device. **TRAP** is an unsolicited alert sent by the agent when a predefined threshold is crossed, such as an interface going down or CPU load exceeding a limit. Most ISP monitoring relies heavily on periodic GET polling combined with trap-based alerting.\n\n### Why it matters for ISPs\n\nWithout SNMP, an ISP operates blind. Detecting a failing OLT port, a saturated uplink, or a subscriber's ONU dropping signal requires either manual inspection or waiting for a customer complaint. SNMP polling catches these problems early, often before subscribers notice.\n\nDataRadius uses SNMP to collect real-time metrics from MikroTik routers and OLTs across the network. Interface throughput, device health, and optical power readings are gathered automatically, feeding into dashboards and threshold-based alerts that help ISP operators respond to issues before they affect service quality."
  },
  {
    "slug": "splitter",
    "term": "Splitter",
    "definition": "A passive optical device that divides a single fiber strand into multiple paths to serve several subscribers.",
    "relatedTerms": [
      "GPON",
      "OLT",
      "ONU",
      "Power Budget"
    ],
    "body": "A splitter is a small, unpowered fiber-optic component that takes one input fiber and divides its optical signal into two or more output fibers. Splitters are the backbone of passive optical networks (PON), enabling a single OLT port to reach dozens of subscriber premises without any active electronics in the field.\n\n### How it works\n\nInside a splitter, a fused-biconical taper or planar lightwave circuit (PLC) physically splits the incoming light. Common split ratios are 1:2, 1:4, 1:8, 1:16, 1:32, and 1:64. Each split introduces insertion loss, roughly 3.5 dB per 1:2 stage, so a 1:32 splitter typically adds about 17 to 18 dB of loss. Splitters can be cascaded (for example, a 1:4 followed by 1:8 units) to extend reach in stages, but every additional stage reduces the power budget available between the OLT and the ONU.\n\nBecause splitters contain no electronics, they require no power supply and no climate control, which makes outside-plant deployment simple. They are usually housed in fiber distribution cabinets, splice closures, or wall-mount enclosures.\n\n### Why it matters for ISPs\n\nChoosing the right split ratio directly affects how many subscribers a single PON port can serve and whether the optical power budget can support the required distance. Over-splitting leads to weak signals and service drops; under-splitting wastes OLT capacity. Accurate splitter records in a management platform like DataRadius help network teams trace faults and plan capacity before adding new subscribers."
  },
  {
    "slug": "static-ip",
    "term": "Static IP",
    "definition": "A fixed IP address permanently assigned to a subscriber or device, unchanged between sessions.",
    "relatedTerms": [
      "IP Address",
      "DHCP",
      "NAT",
      "PPPoE"
    ],
    "body": "A static IP is an IP address that remains permanently assigned to a specific subscriber or device, persisting across disconnections and reboots rather than being drawn from a shared pool each time a session starts.\n\n### How it works\n\nIn a typical ISP setup, most subscribers receive dynamic IP addresses from a DHCP or RADIUS-managed pool. A static IP bypasses this pool entirely. The address is reserved in the RADIUS server configuration and returned as a Framed-IP-Address attribute every time that subscriber authenticates. The NAS assigns the same address regardless of when or where the subscriber connects.\n\nStatic IPs can be allocated from a dedicated subnet separate from the dynamic pool, which simplifies network management and prevents overlap. Reverse DNS records are often configured for static addresses, mapping the IP back to a hostname: a requirement for running mail servers and certain business applications.\n\n### Why it matters for ISPs\n\nStatic IPs are a common premium add-on that ISPs offer to business subscribers or anyone hosting services like security cameras, VPN endpoints, or web servers. Because the address never changes, remote access and DNS configurations remain stable. ISPs typically charge a recurring fee for static IP assignments, creating an additional revenue stream with minimal operational overhead.\n\nDataRadius supports static IP assignment at the subscriber level. Operators set the reserved address on a subscriber's profile or plan, and the RADIUS server delivers it automatically during every PPPoE or hotspot session. This removes the need to configure static mappings directly on each router."
  },
  {
    "slug": "stk-push",
    "term": "STK Push",
    "definition": "A Safaricom M-Pesa SIM Toolkit prompt that initiates a payment request directly on a subscriber's phone.",
    "relatedTerms": [
      "M-Pesa",
      "Paybill",
      "Daraja API",
      "C2B"
    ],
    "body": "STK Push is a payment initiation method provided by Safaricom's M-Pesa platform that sends a payment prompt directly to a subscriber's SIM toolkit. Instead of the subscriber manually navigating M-Pesa menus, the business triggers the prompt, the subscriber only needs to enter their PIN to confirm.\n\n### How it works\n\nThe business system sends an API request to Safaricom's Daraja API with the subscriber's phone number, the amount, and the Paybill shortcode. Safaricom delivers a SIM Toolkit dialog to the subscriber's phone displaying the business name and amount. If the subscriber enters their M-Pesa PIN, the transaction is processed and the business receives a callback confirming the payment. If the subscriber cancels or the prompt times out, a failure callback is returned instead.\n\nSTK Push uses the Lipa Na M-Pesa Online endpoint, which abstracts the USSD flow into a single API call. The entire process typically completes within 15 to 30 seconds.\n\n### Why it matters for ISPs\n\nFor Kenyan ISPs, STK Push removes friction from the payment process. Subscribers can pay for their Internet plan without memorizing Paybill numbers or account references. This directly reduces failed payments caused by incorrect account numbers, a common problem with manual C2B transactions.\n\nDataRadius integrates STK Push to let subscribers pay from the captive portal, the subscriber app, or through automated renewal reminders. When a payment is confirmed, the system activates the plan and sends a CoA to the NAS, restoring full-speed access within seconds."
  },
  {
    "slug": "throughput",
    "term": "Throughput",
    "definition": "The actual data transfer rate achieved on a network link under real-world conditions such as congestion and latency.",
    "relatedTerms": [
      "Bandwidth",
      "QoS",
      "Latency",
      "FUP"
    ],
    "body": "Throughput is the measured rate at which data successfully travels from one point to another on a network. Unlike bandwidth, which describes the theoretical maximum, throughput reflects what subscribers actually experience after accounting for protocol overhead, congestion, packet loss, and latency.\n\n### How it works\n\nWhen a subscriber runs a speed test, the result is a throughput measurement. Even on a 100 Mbps plan, the observed throughput might be 92 Mbps due to TCP/IP header overhead, or much lower if the network path is congested. Factors that reduce throughput include shared media contention, long round-trip times (which limit TCP window efficiency), packet retransmissions, and queue drops at congested interfaces.\n\nISPs monitor throughput at multiple points: the uplink to the transit provider, the backhaul between sites, and the last mile to the subscriber. Comparing throughput to allocated bandwidth reveals whether a bottleneck exists and where.\n\n### Why it matters for ISPs\n\nSubscribers judge their internet experience by throughput, not bandwidth. A plan may promise 50 Mbps, but if throughput regularly drops to 20 Mbps during peak hours, customer satisfaction falls. Tracking real-time throughput per subscriber and per link helps ISPs identify congestion points, justify infrastructure upgrades, and maintain service-level commitments.\n\nDataRadius surfaces per-subscriber traffic data collected from MikroTik routers, giving operators visibility into actual throughput alongside plan limits."
  },
  {
    "slug": "voucher",
    "term": "Voucher",
    "definition": "A prepaid access code that grants time-limited or data-limited internet connectivity on an ISP hotspot network.",
    "relatedTerms": [
      "Hotspot",
      "M-Pesa",
      "Captive Portal",
      "FUP"
    ],
    "body": "A voucher is a single-use code that an ISP subscriber enters on a captive portal to activate a prepaid internet session. Each voucher is tied to a plan that defines the allowed duration, data cap, bandwidth limit, or a combination of all three. Once redeemed, the session starts immediately and expires when the plan limit is reached.\n\n### How it works\n\nThe ISP generates a batch of voucher codes, each linked to a specific plan and price. Distribution happens through printed cards, SMS, reseller agents, or automated purchase via mobile money. When a subscriber enters the code on the captive portal, the system validates it, activates a RADIUS session on the router, and begins enforcing the plan limits. Used codes are marked as redeemed and cannot be reused.\n\nVouchers can also be generated on demand. A subscriber pays via M-Pesa, and the system creates and activates a voucher instantly, the user never needs to type a code manually. This pay-and-connect flow reduces friction and eliminates the need for physical voucher cards.\n\n### Why it matters for ISPs\n\nVouchers are the primary revenue model for hotspot ISPs across Africa. They allow operators to sell connectivity in small, affordable increments, an hour, a day, or a fixed data bundle. DataRadius supports bulk voucher generation, automatic activation on payment, reseller commission tracking, and real-time usage monitoring per voucher."
  },
  {
    "slug": "vpn",
    "term": "VPN (Virtual Private Network)",
    "definition": "An encrypted tunnel between two endpoints, used by ISPs for secure remote router management and site linking.",
    "relatedTerms": [
      "IPsec",
      "MikroTik",
      "NAT"
    ],
    "body": "A VPN, or Virtual Private Network, is a technology that creates an encrypted communication channel over a public network such as the internet. In an ISP context, VPNs are primarily used to establish secure management tunnels between field routers and the operator's central platform, allowing remote configuration, monitoring, and troubleshooting without exposing management interfaces to the public internet.\n\n### How it works\n\nA VPN client on the router initiates a connection to a VPN server, authenticating with credentials or cryptographic keys. Once established, all traffic routed through the tunnel is encrypted end-to-end.\n\nFor routers behind NAT or carrier-grade NAT, common in networks where public IPv4 addresses are scarce, the VPN tunnel provides a reliable path for the management platform to reach the device. The router connects outward, and the management system accesses it through the established tunnel.\n\n### Why it matters for ISPs\n\nWithout a VPN, managing a distributed fleet of routers requires either public IP addresses on every device or physical site visits for configuration changes. An encrypted tunnel lets an ISP manage routers remotely, configuring subscribers, monitoring health, and troubleshooting, from a single dashboard, regardless of where each router is deployed."
  },
  {
    "slug": "walled-garden",
    "term": "Walled Garden",
    "definition": "A set of allowed destinations that hotspot users can reach before completing authentication on the network.",
    "relatedTerms": [
      "Captive Portal",
      "Hotspot",
      "DNS",
      "MikroTik"
    ],
    "body": "A walled garden is a list of IP addresses, domains, or URL patterns that a hotspot router permits unauthenticated users to access. Everything outside the walled garden remains blocked until the user logs in or completes a payment through the captive portal.\n\n### How it works\n\nWhen a device connects to a hotspot but has not yet authenticated, the router applies firewall rules that drop or redirect all traffic except requests to walled-garden destinations. Typical entries include the captive portal page itself, payment provider endpoints (for example, M-Pesa callback URLs), DNS servers required for domain resolution, and any third-party authentication services the portal depends on.\n\nOn MikroTik RouterOS, walled-garden entries can be configured as exact hostnames or regex patterns. There are two levels: the HTTP-level walled garden, which matches by URL, and the IP-level walled garden, which matches by destination address and is needed for HTTPS traffic that the router cannot inspect.\n\n### Why it matters for ISPs\n\nAn incorrectly configured walled garden either blocks the payment flow, preventing subscribers from buying access, or leaks free access to destinations that should be gated. DataRadius manages walled-garden rules on connected routers automatically, ensuring payment and portal endpoints are always reachable while all other traffic stays gated until the subscriber session is active."
  },
  {
    "slug": "wireguard",
    "term": "WireGuard",
    "definition": "A modern VPN protocol used by ISPs to create encrypted management tunnels between routers and central systems.",
    "relatedTerms": [
      "VPN",
      "MikroTik",
      "RouterOS",
      "IPsec"
    ],
    "body": "WireGuard is a lightweight VPN protocol that ISPs use to create encrypted tunnels between routers and management systems. RouterOS 7 includes native support, making it a common choice for MikroTik-based networks.\n\n### Why ISPs use it\n\nManaging a distributed fleet of routers traditionally requires a public IP on every device or a complex IPsec setup. An encrypted VPN tunnel removes that requirement: routers initiate an outbound connection through any NAT, and the management system reaches them as if they were on a local network. This is especially useful in regions where public IPv4 addresses are scarce and routers sit behind carrier-grade NAT."
  }
] as const;
