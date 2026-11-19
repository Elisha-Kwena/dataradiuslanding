import {
    Activity,
    BookOpen,
    Cable,
    Calculator,
    FileText,
    History,
    Router,
    Smartphone,
    Users,
    Wallet,
    Wifi,
    type LucideIcon,
} from "lucide-react";

export type NavLink = { id: number; label: string; description: string; link: string; icon: LucideIcon };

export const navlinks: NavLink[] = [
    {
        id:1,
        label:"Billing & Payments",
        description:"Every Payment matched, every last payer handled",
        link:"/products/billing",
        icon: Wallet,
    },
    {
        id:2,
        label:"Network",
        description:"Routers, access points and customer devices, watches for you",
        link:"/products/network",
        icon: Router,
    },
    {
        id:3,
        label:"Fibre",
        description:"Light levels, faults and plant on one map",
        link:"/products/fibre",
        icon: Cable,
    },
    {
        id:4,
        label:"Wi-Fi hotspot",
        description:"Sell Wi-Fi with your own login page",
        link:"/products/hotspot",
        icon: Wifi,
    },
    {
        id:5,
        label:"Field",
        description:"Technicians, jobs and stock",
        link:"/products/field",
        icon: Smartphone,
    },
    {
        id:6,
        label:"Subscribers",
        description:"Self-service, alerts and retention",
        link:"/products/subscribers",
        icon: Users,
    },
]

export const resources: NavLink[] = [
    {
        id: 1,
        label: "Learn",
        description: "Guides to running an internet business",
        link: "/resources/learn",
        icon: BookOpen,
    },
    {
        id: 2,
        label: "Free tools",
        description: "Calculators for ISP operators",
        link: "/resources/tools",
        icon: Calculator,
    },
    {
        id: 3,
        label: "Changelog",
        description: "Product updates, release by release",
        link: "/changelog",
        icon: History,
    },
    {
        id: 4,
        label: "Docs",
        description: "Setup, configuration and API reference",
        link: "/docs",
        icon: FileText,
    },
    {
        id: 5,
        label: "Status",
        description: "Uptime and incident history",
        link: "/status",
        icon: Activity,
    },
]
