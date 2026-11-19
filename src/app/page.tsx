

import { Wifi } from "lucide-react";
import Link from "next/link";

import { ArrowRight, Play, Check, RefreshCw } from "lucide-react";

import NetworkBackground from "@/components/ui/NetworkBackground";

import DashBoard from "@/components/pages/landingpage/DashBoard";
import Marquee from "@/components/pages/landingpage/ScrollView";
import LiveDemo from "@/components/pages/landingpage/LiveDemo";
import Features from "@/components/pages/landingpage/Features";
import WaysToEarn from "@/components/pages/landingpage/WaysToEarn";
import Stats from "@/components/pages/landingpage/Stats";
import FieldService from "@/components/pages/landingpage/FieldService";
import SwitchSection from "@/components/pages/landingpage/SwitchSection";
import FinalCTA from "@/components/pages/landingpage/FinalCTA";

const users = [
  {id:1,name:"Jacob Kingsley"},
  {id:2,name:"Mitchelle Kemunto"},
  {id:3,name:"John Doe"},
  {id:4,name:"Patrick Annan"},
  {id:5,name:"Caleb Muuo"},
]
export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-clip">


      {/* HERO SECTION */}

      <section className="w-full pt-20 isolate flex flex-col items-center justify-center relative gap-12">
        <NetworkBackground/>

        <div className="w-[90%] pb-10 mx-auto flex items-center justify-center gap-4">
          <div className="w-full flex items-center justify-center flex-col gap-8">
            <div className="w-fit bg-blue-800/30 pr-4 p-2 rounded-full flex items-center justify-start gap-2">
              <div className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-blue-800/20">
                <Wifi className="size-5 text-blue-600 animate-pulse"/>
              </div>
              <p className="text-white text-sm">For internet service providers</p>
            </div>

            <div className="w-full">
              <h1 className="text-white font-extrabold text-5xl sm:text-7xl lg:text-8xl text-center font-akhirtahun">Everything your</h1>
              <h1 className="text-white font-extrabold text-5xl sm:text-7xl lg:text-8xl text-center font-akhirtahun"><span className="text-blue-800">ISP</span> runs on.</h1>
            </div>
            <div className="w-full">
              <p className="text-slate-400 max-w-[90%] md:max-w-1/2 text-center z-100 mx-auto font-serif text-xl md:text-2xl">Billing, M-Pesa payments, routers and subscribers in one dashboard. Customers pay, get online in seconds, and reconnect automatically</p>
            </div>

            <div className="w-full flex flex-wrap items-center justify-center gap-2">
              <Link href="/signup" className="flex group p-4 px-8 items-center justify-center gap-3 text-black bg-white rounded-full transition-all duration-500 ease-in-out hover:bg-blue-800 hover:text-white">
                <p>Start 14-day free trial</p>
                <ArrowRight className="group-hover:translate-x-2 transition-all duration-500 ease-in-out"/>
              </Link>
              <Link href="#live-demo" className="backdrop-blur-xl flex group gap-2 items-center justify-center p-4 rounded-full text-white transition-all duration-500 ease-in-out border-2 border-transparent hover:border-blue-800 hover:text-blue-800">
                <Play className="fill-white transition-all duration-500 ease-in-out group-hover:fill-blue-800"/>
                Try the live demo
              </Link>
            </div>

            <div className="w-full h-auto mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <div className="flex items-center justify-start -space-x-3">
                {users.map((user) => {
                  const initials = user.name
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()

                  return (
                    <div
                      key={user.id}
                      role="img"
                      aria-label={user.name}
                      className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 border-white bg-blue-800 text-sm font-semibold text-white"
                    >
                      {initials}
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-gray-200 font-semibold">Join +200 more</h3>
                <p className="text-gray-400 text-sm text-center sm:text-left">ISPs and hotspot owners already collecting M-Pesa payments automatically.</p>
              </div>
            </div>
            
          </div>
        </div>
        <div className="w-full flex items-start justify-center">
          <DashBoard/>

        </div>

        <div className="absolute inset-x-0 bottom-0 z-9999 h-30 pointer-events-none bg-linear-to-t from-black to-transparent"></div>
      </section>
      <div className="w-full py-20 bg-black">
        <Marquee/>
      </div>
    
      

      <section id="live-demo" className="w-full pb-24 bg-black scroll-mt-24">
        <div className="mx-auto grid w-[90%] items-start gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
              <RefreshCw className="size-3.5 text-blue-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
                The full lifecycle
              </span>
            </div>
            <h1 className="mt-6 text-white font-akhirtahun font-extrabold text-2xl md:text-5xl leading-[1.05]">
              From the first signup to the{" "}
              <span className="text-blue-800 ">
                renewal of one&rsquo;s system.
              </span>
            </h1>
            <p className="text-gray-400 font-serif text-xl mt-5 leading-relaxed">A new subscriber triggers everything: account created, router configured, invoice sent, welcome message delivered, installation booked.</p>
            <ul className="mt-8 flex flex-col gap-3">
              {["Zero-touch router provisioning", "Self-service pay pages", "Automatic reconnects on payment"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex size-5 flex-none items-center justify-center rounded-full bg-emerald-500/15">
                    <Check className="size-3 text-emerald-400" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <LiveDemo/>
        </div>
      </section>

      <Features/>
      <WaysToEarn/>
      <FieldService/>
      <Stats/>
      <SwitchSection/>
      <FinalCTA/>
    </div>
  );
}
