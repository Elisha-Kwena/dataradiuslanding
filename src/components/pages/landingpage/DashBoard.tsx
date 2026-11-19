"use client";

const controls = [
    {id:1,background:"bg-red-600"},
    {id:2,background:"bg-yellow-500"},
    {id:3,background:"bg-green-600"},
]

import { Search, Ticket, TrendingUp, Users, Wallet } from "lucide-react"
import {
  LayoutDashboard,
  Activity,
  SquareArrowUpRightExit,
  Smartphone,
  Wifi,
  Cable,
  Network,
  ChevronRight,
  Router,
  Map,
  ChartColumn,
  Receipt,
  MessageSquare,
  Radio,
  FileText,
  Settings,
  Plus,
  Bell,
  Pencil,UserRoundPlus,
  CreditCard,
  Package,
  ArrowDown,
  ArrowUp,
  Check,
  Zap,
  Wrench,
  Sun,
  Moon
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { LucideIcon } from "lucide-react";

type NavItem = {id: number;label:string;logo:LucideIcon;hasSubmenu?:boolean;active?:boolean}

type QuicAction = {id:number,label:string,logo:LucideIcon}

const quickactions: QuicAction[] =[
    {id:1,label:"Hotspot Vouchers",logo:Ticket},
    {id:2,label:"Routers",logo:Router},
    {id:3,label:"Add PPoE Subsciber",logo:UserRoundPlus},
    {id:4,label:"Create Hotspot Plan",logo:CreditCard},
    {id:5,label:"Create PPPoE Plan",logo:Package},
    {id:6,label:"View Reports",logo:ChartColumn},
]
const navlinks: Record<string, NavItem[]> = {

        overview:[
            {id:1,label:"Dashboard",logo:LayoutDashboard,active:true},
            {id:2,label:"Activity Feed",logo:Activity},
            {id:3,label:"Field App",logo:Smartphone},
        ],
        subscribers:[
            {id:1,label:"Hotspot",logo:Wifi,hasSubmenu:true},
            {id:2,label:"PPPoE",logo:Cable,hasSubmenu:true},
            {id:3,label:"Static IP",logo:Network,hasSubmenu:true},
        ],
        network:[
            {id:1,label:"Routers",logo:Router,hasSubmenu:true},
            {id:2,label:"Network Map",logo:Map},
            {id:3,label:"OLTs",logo:Cable,hasSubmenu:true},
            {id:4,label:"Monitoring",logo:ChartColumn,hasSubmenu:true},
        ],
        billing:[
            {id:1,label:"My Subscription",logo:Receipt},
        ],
        support:[
            {id:1,label:"Tickets",logo:MessageSquare,hasSubmenu:true},
            {id:2,label:"Messaging",logo:Radio,hasSubmenu:true},
        ],
        analytics:[
            {id:1,label:"Reports",logo:FileText,hasSubmenu:true},
        ],
        settings:[
            {id:1,label:"Settings",logo:Settings},
        ],

}

type Earning = {id:number,label:string,logo:LucideIcon,amount:number,cta:string}

const earnings: Earning[] = [
    {id:1,label:"Payments today",amount:1200,logo:Wallet,cta:"View Reports"},
    {id:2,label:"Payment this month",amount:4500,logo:TrendingUp,cta:"View All"},
    {id:3,label:"active/total",amount:127,logo:Users,cta:"View All"},
    {id:4,label:"sites online",amount:4,logo:Map,cta:"View Map"},
]

/* ============================ LIVE DEMO DATA ============================ */

type Plan = {name:string;amount:number;mbps:number;monthly?:boolean}

// repeated entries make cheaper plans more likely
const plans: Plan[] = [
    {name:"1 Hour",amount:20,mbps:5},
    {name:"3 Hours",amount:40,mbps:5},
    {name:"24 Hours",amount:100,mbps:10},
    {name:"24 Hours",amount:100,mbps:10},
    {name:"7 Days",amount:300,mbps:10},
    {name:"Monthly PPPoE",amount:800,mbps:10,monthly:true},
]

const pastEarnings = [640, 820, 510, 1430, 980, 1750] // the 6 days before today
const yesterdaySoFar = 1000 // yesterday's total at this time of day (for the % change)
const PAYMENTS_PER_CYCLE = 5 // live payments before the demo resets to its first state
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

// weekday labels: blank on the server, real on the client (avoids hydration mismatch)
const EMPTY_LABELS: string[] = Array(7).fill("")
let cachedLabels: string[] | null = null
function getWeekdayLabels() {
    if (cachedLabels === null) {
        const d = new Date().getDay()
        cachedLabels = Array.from({length:7},(_,i)=> i === 6 ? "Today" : DAYS[(d-(6-i)+7)%7])
    }
    return cachedLabels
}
const getEmptyLabels = () => EMPTY_LABELS

const fmt = (n:number) => n.toLocaleString("en-US")
const rnd = (a:number,b:number) => Math.floor(Math.random()*(b-a+1))+a

/* ============================ RECENT ACTIVITIES DATA ============================ */

type ActivityTone = "blue" | "amber" | "rose" | "emerald"
type ActivityItem = {id:number;icon:LucideIcon;title:string;sub:string;ageSec:number;tone?:ActivityTone}

const MAX_ACTIVITIES = 6

// first state: the feed returns to this after every live cycle
const seedActivities: ActivityItem[] = [
    {id:1,icon:Check,title:"Payment received",sub:"KES 100 · 0712 *** 345",ageSec:42},
    {id:2,icon:Zap,title:"LOS detected",sub:"OLT-3 · port 7 · Malaba",ageSec:44,tone:"rose"},
    {id:3,icon:Wrench,title:"Job auto-created",sub:"#2043 · Fault · Field team",ageSec:45,tone:"amber"},
    {id:4,icon:Wifi,title:"Session started",sub:"24 Hours · 10 Mbps",ageSec:52},
    {id:5,icon:Router,title:"Router back online",sub:"Juja-RB4011 · 18 ms",ageSec:180},
    {id:6,icon:UserRoundPlus,title:"New PPPoE subscriber",sub:"Kamau W. · 10 Mbps",ageSec:420},
]

// occasional extra events mixed into the live feed
const extras: {icon:LucideIcon;title:string;sub:string;tone?:ActivityTone}[] = [
    {icon:Router,title:"Router back online",sub:"Githurai-RB750 · 24 ms"},
    {icon:Zap,title:"LOS detected",sub:"OLT-1 · port 3 · Keroka",tone:"rose"},
    {icon:Wrench,title:"Job auto-created",sub:"#2045 · Install · Keroka",tone:"amber"},
    {icon:Bell,title:"3 plans expire today",sub:"Reminder SMS queued",tone:"amber"},
    {icon:MessageSquare,title:"Ticket opened",sub:"#1043 · No internet"},
    {icon:Ticket,title:"Vouchers redeemed",sub:"8 of 50 · 3 Hours"},
    {icon:UserRoundPlus,title:"New PPPoE subscriber",sub:"Wanjiku N. · 10 Mbps"},
]

const toneChip: Record<ActivityTone,string> = {
    blue: "bg-blue-800/30 text-blue-400",
    amber: "bg-amber-500/15 text-amber-300",
    rose: "bg-rose-500/15 text-rose-300",
    emerald: "bg-emerald-500/15 text-emerald-300",
}

const ago = (s:number) =>
    s < 10 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s/60)}m ago` : `${Math.floor(s/3600)}h ago`

/* ============================ COLUMN CHART ============================ */

function EarningsChart({values,labels}:{values:number[];labels:string[]}){
    const max = Math.max(...values) * 1.15
    const total = values.reduce((a,b)=>a+b,0)

    return(
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-[12px] font-serif uppercase">Earnings · last 7 days</p>
                    <h1 className="text-2xl text-gray-300 font-extrabold font-ibmblockserif">KES {fmt(total)}</h1>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-blue-400">
                    <i className="w-1.5 h-1.5 animate-pulse rounded-full bg-blue-500"></i>
                    LIVE
                </span>
            </div>

            <div className="relative h-44 w-full">
                {/* grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[0,1,2,3].map((line)=>(
                        <div key={line} className="w-full border-t border-slate-800"></div>
                    ))}
                </div>

                {/* columns */}
                <div className="relative z-10 flex h-full items-end gap-2">
                    {values.map((value,index)=>{
                        const isToday = index === values.length-1
                        return(
                            <div key={index} className="group flex h-full flex-1 items-end">
                                <div
                                    className={`relative w-full rounded-t-md transition-all duration-700 ${isToday ? "bg-blue-800 ring-1 ring-blue-500" : "bg-slate-700 group-hover:bg-blue-900"}`}
                                    style={{height:`${(value/max)*100}%`}}
                                >
                                    <span className={`absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-gray-300 transition ${isToday ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                        {fmt(value)}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="w-full flex gap-2">
                {labels.map((label,index)=>(
                    <span key={index} className={`flex-1 text-center font-mono text-[10px] ${index === labels.length-1 ? "text-blue-400" : "text-gray-500"}`}>{label}</span>
                ))}
            </div>
        </div>
    )
}

/* ============================ FIELD JOBS ============================ */

type Job = {id:number;site:string;title:string;state:"claimed"|"progress"|"done";due:string}

const fieldJobs: Job[] = [
    {id:1,site:"Malaba",title:"LOS fault · OLT-3 port 7",state:"progress",due:"SLA 1h 20m"},
    {id:2,site:"Keroka",title:"CPE install · 8 Mbps",state:"claimed",due:"today 14:00"},
    {id:3,site:"Maseno",title:"Village relay check",state:"done",due:"done 09:41"},
]

const jobChip: Record<Job["state"],{label:string;cls:string}> = {
    progress: {label:"In progress",cls:"bg-blue-500/15 text-blue-300"},
    claimed: {label:"Claimed",cls:"bg-amber-500/15 text-amber-300"},
    done: {label:"Done",cls:"bg-emerald-500/15 text-emerald-300"},
}

function FieldJobs(){
    const open = fieldJobs.filter((j)=>j.state!=="done").length
    return(
        <div className="flex-1 self-stretch rounded-lg border border-slate-700 p-3 flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-gray-500 font-serif">FIELD JOBS</h1>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
                    <i className="w-1.5 h-1.5 animate-pulse rounded-full bg-amber-400"></i>
                    {open} OPEN
                </span>
            </div>
            <ul className="flex flex-col">
                {fieldJobs.map((job)=>{
                    const chip = jobChip[job.state]
                    return(
                        <li key={job.id} className="flex items-center gap-3 border-b border-slate-800 py-2 last:border-b-0">
                            <div className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${toneChip[job.state==="done"?"emerald":job.state==="claimed"?"amber":"blue"]}`}>
                                <Wrench className="size-4"/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[12px] font-semibold text-gray-300">{job.title}</p>
                                <p className="truncate font-mono text-[11px] text-gray-500">{job.site} · {job.due}</p>
                            </div>
                            <span className={`flex-none rounded-full px-2 py-0.5 text-[10px] ${chip.cls}`}>{chip.label}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

/* ============================ FLOATING CARD ============================ */

function FloatingCard({show,icon:Icon,title,sub,className}:{show:boolean;icon:LucideIcon;title:string;sub:string;className:string}){
    return(
        <div
            role="status"
            className={`absolute z-20 flex min-w-56 items-center gap-3 rounded-2xl border border-slate-600 bg-slate-800 px-4 py-3 text-left shadow-2xl shadow-black/60 transition duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"} ${className}`}
        >
            <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-blue-800/60 text-blue-300">
                <Icon className="size-5"/>
            </div>
            <div>
                <b className="block text-sm font-semibold text-white">{title}</b>
                <small className="font-mono text-xs text-slate-400">{sub}</small>
            </div>
        </div>
    )
}

/* ============================ RECENT ACTIVITIES ============================ */

function RecentActivities({items}:{items:ActivityItem[]}){
    return(
        <div className="flex-1 overflow-hidden rounded-lg border border-slate-700 p-3 flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-gray-500 font-serif">RECENT ACTIVITIES</h1>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-blue-400">
                    <i className="w-1.5 h-1.5 animate-pulse rounded-full bg-blue-500"></i>
                    LIVE
                </span>
            </div>

            <ul className="flex flex-col">
                {items.map(({id,icon:Icon,title,sub,ageSec,tone})=>(
                    <li
                        key={id}
                        className="flex items-center gap-3 border-b border-slate-800 py-2 transition duration-500 last:border-b-0 starting:-translate-y-2 starting:opacity-0"
                    >
                        <div className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${toneChip[tone ?? "blue"]}`}>
                            <Icon className="size-4"/>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[12px] font-semibold text-gray-300">{title}</p>
                            <p className="truncate font-mono text-[11px] text-gray-500">{sub}</p>
                        </div>
                        <span className="flex-none font-mono text-[10px] text-gray-500">{ago(ageSec)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function DashBoard(){
    // live numbers (seeded from the earnings array)
    const [today,setToday] = useState(earnings[0].amount)
    const [month,setMonth] = useState(earnings[1].amount)
    const [active,setActive] = useState(earnings[2].amount)
    const labels = useSyncExternalStore(() => () => {}, getWeekdayLabels, getEmptyLabels)
    // floating cards
    const [pay,setPay] = useState({title:"+ KES 500",sub:"M-Pesa · 0738 *** 274"})
    const [session,setSession] = useState({title:"Client reconnected",sub:"Monthly PPPoE · 10 Mbps"})
    const [showPay,setShowPay] = useState(false)
    const [showSession,setShowSession] = useState(false)

    // recent activities
    const [activities,setActivities] = useState<ActivityItem[]>(seedActivities)
    const nextId = useRef(100)

    // dashboard-local theme: independent of the marketing page theme
    const [dockLight,setDockLight] = useState(false)

    // keep the "x ago" labels moving
    useEffect(()=>{
        const clock = setInterval(()=>{
            setActivities((list)=>list.map((a)=>({...a,ageSec:a.ageSec+5})))
        },5000)
        return ()=>clearInterval(clock)
    },[])

    // simulated live payments: replace this with your websocket / polling / SSE feed
    useEffect(()=>{
        const timers: ReturnType<typeof setTimeout>[] = []
        const later = (fn:()=>void,ms:number)=>{ timers.push(setTimeout(fn,ms)) }

        let count = 0 // payments since the last reset

        // add an event to the top of the activity feed
        const push = (icon:LucideIcon,title:string,sub:string,tone?:ActivityTone)=>{
            const id = nextId.current++
            setActivities((list)=>[{id,icon,title,sub,ageSec:0,tone},...list].slice(0,MAX_ACTIVITIES))
        }

        const tick = ()=>{
            if (document.hidden) return

            // after a few payments, go back to the first state and start over
            if (count >= PAYMENTS_PER_CYCLE){
                count = 0
                setToday(earnings[0].amount)
                setMonth(earnings[1].amount)
                setActive(earnings[2].amount)
                setShowPay(false)
                setShowSession(false)
                setActivities(seedActivities)
                return
            }
            count++

            const plan = plans[rnd(0,plans.length-1)]
            const phone = `07${rnd(10,99)} *** ${rnd(100,999)}`

            setToday((t)=>t+plan.amount)
            setMonth((m)=>m+plan.amount)
            if (!plan.monthly) setActive((a)=>a+1)

            setPay({title:`+ KES ${fmt(plan.amount)}`,sub:`M-Pesa · ${phone}`})
            setShowPay(true)
            push(Check,"Payment received",`KES ${fmt(plan.amount)} · ${phone}`)
            later(()=>setShowPay(false),2800)

            later(()=>{
                setSession({
                    title: plan.monthly ? "Client reconnected" : "Session started",
                    sub: `${plan.name} · ${plan.mbps} Mbps`,
                })
                setShowSession(true)
                push(Wifi, plan.monthly ? "Client reconnected" : "Session started", `${plan.name} · ${plan.mbps} Mbps`)
            },900)
            later(()=>setShowSession(false),3700)

            // every other payment, mix in a different kind of event
            if (count % 2 === 0){
                const extra = extras[rnd(0,extras.length-1)]
                later(()=>push(extra.icon,extra.title,extra.sub,extra.tone),2200)
            }
        }

        const first = setTimeout(tick,1500)
        const loop = setInterval(tick,4500)
        return ()=>{
            clearTimeout(first)
            clearInterval(loop)
            timers.forEach(clearTimeout)
        }
    },[])

    const live: Record<number,number> = {1:today,2:month,3:active}
    const growth = Math.min(100, ((today - yesterdaySoFar)/yesterdaySoFar)*100)

    return(
        <div className={`relative w-[95%] md:w-3/4 h-[80vh] md:h-[95vh] overflow-y-clip flex flex-col rounded-tr-xl rounded-tl-xl border-t border-l border-r rounded-bl-0 border-slate-700 ${dockLight ? "dock-light bg-[#f3f4f6]" : "dock-dark bg-black"}`}>

            {/* floating cards */}
            <FloatingCard show={showPay} icon={Check} title={pay.title} sub={pay.sub} className="-right-2 md:-right-8 top-16"/>
            <FloatingCard show={showSession} icon={Wifi} title={session.title} sub={session.sub} className="-left-2 md:-left-8 bottom-24"/>

            <div className="w-full flex items-center justify-start gap-3 p-4 py-2.5 border-b border-slate-700">
                <div className="flex items-center justify-start gap-2 ">
                    {controls.map((control,index)=>(
                        <div key={index} className={`w-4 h-4 rounded-full ${control.background}`}></div>
                    ))}
                </div>
                <div className="flex flex-1 max-w-80 items-center justify-start p-2 py-1 rounded-full bg-blue-800/30 shadow-inner">
                    <p className="text-white text-sm">dataradius.net</p>
                </div>
            </div>
            <div className="w-full flex items-start justify-between">

                {/* ================================================================== Sidebar============================================================== */}
                <div className="hidden md:flex w-50 h-full gap-2 border-r border-slate-700 pt-1 flex-col items-start justify-start">
                    <div className="w-full flex items-center justify-start gap-2 px-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-800 pt-1">
                            <h1 className="text-white font-extrabold text-lg font-akhirtahun">RI</h1>
                        </div>
                        <div className="flex flex-col gap-0 items-start justify-start">
                            <h1 className="text-blue-800 font-extrabold">RedHat ISP</h1>
                            <p className="text-white text-[12px] -mt-1">Active</p>
                        </div>
                    </div>

                    <div className="w-full px-2">
                        <div className="w-full border p-1 border-gray-600 rounded-md flex items-center justify-start gap-2">
                            <Search className="size-4 text-gray-500"/>
                            <p className="text-gray-400 text-[12px]">Filter navigation...</p>
                        </div>
                    </div>

                    <div className="w-full  flex flex-col gap-2.5 px-2">
                        {Object.entries(navlinks).map(([group, items])=>{
                            return(
                                <div key={group} className="flex flex-col">
                                    <h1 className="text-gray-500 uppercase text-sm font-mono">{group}</h1>
                                    <ul className="flex flex-col gap-1">
                                        {items.map(({ id, label, logo: Icon, hasSubmenu, active: isActive }) => (
                                          <li
                                            key={id}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`relative flex w-full items-center justify-between gap-3 rounded-lg px-3 py-0.5 text-sm font-medium transition hover:bg-white/5 hover:text-white ${isActive ? "text-white" : "text-slate-500"}`}
                                          >
                                            {isActive && <span className="absolute left-0 inset-y-1 w-0.5 rounded-full bg-blue-600"></span>}
                                            <div className="flex gap-1">
                                                <Icon className={`size-4 ${isActive ? "text-blue-500" : ""}`} />
                                                <span className={`text-[12px] ${isActive ? "font-semibold" : ""}`}>{label}</span>
                                            </div>
                                            {hasSubmenu && <ChevronRight className="size-4" />}
                                          </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                        <div className="w-full mt-2 py-2 border-t border-slate-700 flex items-center justify-between gap-2">
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-8 h-8 relative bg-blue-800 font-akhirtahun uppercase rounded-full p-2 flex items-center justify-center">
                                    el
                                    <div className="absolute bottom-0 right-0 border border-black w-2 h-2 bg-green-600 rounded-full"></div>
                                </div>
                                <div className="flex flex-col gap-0 items-start justify-start">
                                    <h1 className="text-white">elishakwena</h1>
                                    <p className="text-gray-400 text-[12px] -mt-1">Owner</p>
                                </div>
                            </div>
                            <span className="text-gray-600">
                                <Settings className="size-4 hover:text-white transition-all duration-500 ease-in-out"/>
                            </span>

                        </div>
                    </div>

                </div>


                {/* =================================================================== Dashboard ============================================================ */}
                <div className="flex-1 items-start justify-start flex flex-col">

                    {/*======================== NAVBAR=============================== */}
                    <div className="w-full p-2 flex items-center justify-end gap-2 border-b border-slate-700">
                        <div className="flex border rounded-md p-1 w-40 border-slate-700 items-center justify-between gap-2">
                            <div className="flex">
                                <Search className="size-5 text-gray-500"/>
                                <p className="text-gray-500  text-[12px]">Search...</p>
                            </div>
                        </div>
                        <div className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-800">
                            <Plus/>
                        </div>
                        <div className="w-7 h-7 flex items-center justify-center">
                            <Settings className="text-gray-500"/>
                        </div>
                        <button
                            type="button"
                            onClick={()=>setDockLight((v)=>!v)}
                            aria-label="Toggle dashboard theme"
                            className="w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-white/10"
                        >
                            {dockLight ? <Moon className="size-4 text-gray-500"/> : <Sun className="size-4 text-gray-500"/>}
                        </button>
                        <div className="w-7 h-7 flex items-center justify-center relative">
                            <Bell className="text-gray-500"/>
                            <div className="absolute w-2 h-2 rounded-full bg-red-600 top-0 right-1"></div>
                        </div>
                        <div className="w-8 h-8 relative bg-blue-800 rounded-lg font-extrabold font-akhirtahun p-2 flex items-center justify-center">
                            el
                        </div>
                    </div>

                    <div className="w-full p-2 flex flex-col gap-2">
                        <div className="w-full border border-slate-700 rounded-lg p-4 flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h1 className="text-gray-500">QUICK ACTIONS</h1>
                                <Pencil className="text-gray-500 size-4"/>
                            </div>
                            <div className="w-full flex flex-wrap items-center justify-start gap-2 md:justify-between">
                                {quickactions.map((btn, index)=>{
                                    const QickIcon = btn.logo
                                    return(
                                        <div key={index} className="p-2 border flex items-center justify-center gap-2 text-[12px] border-slate-700 rounded-lg">
                                            <QickIcon className="size-5 text-gray-400"/>
                                            {btn.label}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {earnings.map((earn,index)=>{
                                const value = live[earn.id] ?? earn.amount
                                return(
                                    <div key={index} className="rounded-lg flex flex-col items-start justify-between gap-2 border border-slate-700 p-3">
                                        <div className="w-full flex items-start justify-between gap-2">
                                            <div className="flex flex-col gap-2">
                                                <h1 className="text-gray-500 text-[12px] font-serif uppercase">{earn.label}</h1>
                                                {earn.id == 3 ? (
                                                    <h1 className="text-2xl lg:text-4xl text-white font-extrabold font-ibmblockserif">{fmt(value)}</h1>
                                                ) : earn.id == 4 ? (
                                                    <h1 className="text-2xl lg:text-4xl text-white font-extrabold font-ibmblockserif">{fmt(value)}/5</h1>
                                                ) : (
                                                    <h1 className="text-2xl lg:text-4xl text-gray-300 flex items-center justify-start gap-2 font-extrabold font-ibmblockserif">KES {fmt(value)}</h1>
                                                )}

                                                {earn.id == 1 &&(
                                                    <div className={`flex items-center justify-start gap-0 ${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                        {growth >= 0 ? <ArrowUp/> : <ArrowDown/>}
                                                        <p className="text-sm font-extrabold font-mono">{growth >= 0 ? "+" : ""}{growth.toFixed(1)}%</p>
                                                    </div>
                                                )}
                                                {earn.id == 4 &&(
                                                    <div className="flex items-center justify-start gap-1.5">
                                                        <span className="size-1.5 rounded-full bg-rose-500 animate-pulse"/>
                                                        <p className="text-sm font-serif text-rose-300">1 site down</p>
                                                    </div>
                                                )}



                                            </div>
                                            <div className="flex items-cenetr justify-center">
                                                <earn.logo className="text-gray-600 size-8"/>
                                            </div>
                                        </div>
                                        <div className="w-full pt-2 mt-auto border-t border-slate-700">
                                            <div className="flex items-center justify-start gap-2">
                                                <p className="text-gray-500 font-serif">{earn.cta}</p>
                                                <SquareArrowUpRightExit className="text-gray-500 size-4"/>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                        <div className="w-full mt-1 flex flex-col gap-4 lg:flex-row items-stretch justify-between">
                            <div className="border border-slate-700 rounded-lg p-2 w-full lg:w-[40%]">
                                {/* ===============================================CHART CONTAINER ========================================== */}
                                <EarningsChart values={[...pastEarnings,today]} labels={labels}/>
                            </div>

                            {/* ======================================================== FIELD JOBS ========================================== */}
                            <FieldJobs/>

                            {/* ======================================================== RECENT ACTIVITIES ====================================== */}
                            <div className="flex-1 self-stretch flex">
                                <RecentActivities items={activities}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}