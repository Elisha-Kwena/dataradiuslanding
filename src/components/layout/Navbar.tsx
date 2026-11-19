"use client"

import Logo from "../common/Logo"
import ThemeButton from "./ThemeButton"
import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { navlinks, resources, type NavLink } from "@/lib/navData"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

const navLinks = [
    {id:1,label:"Switch",href:"/switch"},
    {id:2,label:"Pricing",href:"/pricing"}
]

type MenuKey = "products" | "resources"

const menus: Record<MenuKey, { eyebrow: string; viewAll: string; viewAllHref: string; items: NavLink[] }> = {
    products: { eyebrow: "Our product", viewAll: "Explore the whole system", viewAllHref: "/products", items: navlinks },
    resources: { eyebrow: "Resources", viewAll: "All resources", viewAllHref: "/resources/learn", items: resources },
}

function MegaItem({ item, onClick }: { item: NavLink; onClick: () => void }) {
    const Icon = item.icon
    return (
        <Link
            href={item.link}
            onClick={onClick}
            className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors duration-300 hover:bg-blue-800"
        >
            <span className="grid size-9 flex-none place-items-center rounded-lg bg-blue-800/30 text-blue-400 transition-colors group-hover/item:bg-white/20 group-hover/item:text-white">
                <Icon className="size-4.5" />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-medium text-slate-200 transition-colors group-hover/item:text-white">{item.label}</span>
                <span className="mt-0.5 block truncate font-serif text-[12px] text-slate-500 transition-colors group-hover/item:text-blue-200">{item.description}</span>
            </span>
        </Link>
    )
}

function MobileSection({
    label,
    open,
    onToggle,
    children,
}: {
    label: string
    open: boolean
    onToggle: () => void
    children: ReactNode
}) {
    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-semibold text-white"
            >
                {label}
                <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${open ? "max-h-120" : "max-h-0"}`}>
                <div className="flex flex-col gap-1 pb-2 pl-3">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function Navbar(){
    const path = usePathname()
    const isResourcesActive =
        path.startsWith("/resources/") ||
        ["/changelog", "/docs", "/status"].some((href) => path === href || path.startsWith(`${href}/`))

    const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
    const [hoveredMenu, setHoveredMenu] = useState<MenuKey | null>(null)
    const activeMenu = hoveredMenu ?? openMenu

    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileSection, setMobileSection] = useState<MenuKey | null>(null)
    const headerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
                setOpenMenu(null)
                setHoveredMenu(null)
                setMobileOpen(false)
            }
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpenMenu(null)
                setHoveredMenu(null)
                setMobileOpen(false)
            }
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const closeAll = () => {
        setOpenMenu(null)
        setHoveredMenu(null)
        setMobileOpen(false)
    }

    const expanded = activeMenu !== null || mobileOpen
    const menu = activeMenu ? menus[activeMenu] : null

    return(
        <header ref={headerRef} className="fixed z-999999 inset-x-0 top-0 flex items-start justify-center px-[4%] pt-4">
            <nav
                onMouseLeave={() => setHoveredMenu(null)}
                className={`w-full lg:w-[80%] rounded-3xl border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 ${expanded ? "bg-white/[0.08]" : "bg-white/[0.04]"}`}
            >
                {/* top row */}
                <div className="flex items-center justify-between p-2 pl-4">
                    <div className="flex items-center justify-start gap-8">
                        <Logo/>
                    </div>
                    <div className="hidden lg:flex items-center justify-start gap-2">
                        {(["products", "resources"] as const).map((key) => {
                            const sectionActive = key === "products" ? path.startsWith("/products") : isResourcesActive
                            return (
                            <button
                                key={key}
                                type="button"
                                aria-expanded={activeMenu === key}
                                onClick={() => {
                                    setHoveredMenu(null)
                                    setOpenMenu((current) => current === key ? null : key)
                                }}
                                onMouseEnter={() => setHoveredMenu(key)}
                                className={`flex h-10 items-center gap-1.5 rounded-full px-3 font-semibold capitalize transition-colors ${activeMenu === key ? "bg-blue-800 text-white" : sectionActive ? "text-blue-400 hover:bg-blue-800" : "text-white hover:bg-blue-800"}`}
                            >
                                {key === "products" ? "Product" : "Resources"}
                                <ChevronDown className={`size-4 transition-transform duration-300 ${activeMenu === key ? "rotate-180" : ""}`} />
                            </button>
                            )
                        })}
                        {navLinks.map((navbtn)=>{
                            const isActive = path === navbtn.href || path.startsWith(`${navbtn.href}/`)
                            return (
                            <Link
                                key={navbtn.href}
                                href={navbtn.href}
                                aria-current={isActive ? "page" : undefined}
                                onMouseEnter={() => setHoveredMenu(null)}
                                className={`flex h-10 items-center rounded-full px-3 font-semibold transition-colors ${isActive ? "text-blue-400" : "text-white hover:bg-blue-800"}`}
                            >
                                {navbtn.label}
                            </Link>
                            )
                        })}
                    </div>
                    <div className="hidden lg:flex items-center justify-end gap-3">
                        <ThemeButton />
                        <Link href="/signup" className="flex items-center justify-center p-2 px-6 rounded-full bg-blue-800 cursor-pointer text-white transition-all duration-500 ease-in-out hover:bg-blue-600 hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.6)]">
                            Start Free
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 lg:hidden">
                        <ThemeButton />
                        <button
                            type="button"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-expanded={mobileOpen}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-blue-800"
                        >
                            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>
                </div>

                {/* expanding panel: whole navbar grows in height */}
                <div className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        {/* desktop mega menu */}
                        {menu && (
                            <div className="hidden lg:block border-t border-white/10 px-6 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">{menu.eyebrow}</p>
                                    <Link
                                        href={menu.viewAllHref}
                                        onClick={closeAll}
                                        className="group/all flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                                    >
                                        {menu.viewAll}
                                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/all:translate-x-1" />
                                    </Link>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-1">
                                    {menu.items.map((item) => (
                                        <MegaItem key={item.id} item={item} onClick={closeAll} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* mobile accordion */}
                        <div className="border-t border-white/10 p-3 lg:hidden">
                            <MobileSection
                                label="Product"
                                open={mobileSection === "products"}
                                onToggle={() => setMobileSection((s) => (s === "products" ? null : "products"))}
                            >
                                {navlinks.map((item) => (
                                    <Link key={item.id} href={item.link} onClick={closeAll} className="group flex items-center gap-3 rounded-lg px-3 py-2">
                                        <item.icon className="size-4 flex-none text-blue-400" />
                                        <span className="min-w-0">
                                            <span className="block text-sm text-slate-200 transition-colors group-hover:text-blue-500">{item.label}</span>
                                            <span className="block truncate font-serif text-[12px] text-slate-500">{item.description}</span>
                                        </span>
                                    </Link>
                                ))}
                            </MobileSection>
                            <MobileSection
                                label="Resources"
                                open={mobileSection === "resources"}
                                onToggle={() => setMobileSection((s) => (s === "resources" ? null : "resources"))}
                            >
                                {resources.map((item) => (
                                    <Link key={item.id} href={item.link} onClick={closeAll} className="group flex items-center gap-3 rounded-lg px-3 py-2">
                                        <item.icon className="size-4 flex-none text-blue-400" />
                                        <span className="min-w-0">
                                            <span className="block text-sm text-slate-200 transition-colors group-hover:text-blue-500">{item.label}</span>
                                            <span className="block truncate font-serif text-[12px] text-slate-500">{item.description}</span>
                                        </span>
                                    </Link>
                                ))}
                            </MobileSection>
                            {navLinks.map((navbtn) => (
                                <Link
                                    key={navbtn.href}
                                    href={navbtn.href}
                                    onClick={closeAll}
                                    className={`block rounded-lg px-3 py-2.5 font-semibold transition-colors ${path === navbtn.href || path.startsWith(`${navbtn.href}/`) ? "bg-blue-800/20 text-blue-400" : "text-white hover:bg-blue-800"}`}
                                >
                                    {navbtn.label}
                                </Link>
                            ))}
                            <div className="mt-2 border-t border-white/10 pt-3">
                                <Link href="/signup" onClick={closeAll} className="block rounded-full bg-blue-800 py-2.5 text-center font-semibold text-white transition-colors hover:bg-blue-600">
                                    Start Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
