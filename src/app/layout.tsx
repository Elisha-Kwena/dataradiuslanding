import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { akhirTahun, autobusOmnibus, superShiny, earlybird, ibmblockserif, oblisk, anton } from '../lib/fonts';
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CurrencyProvider } from "@/contexts/PricingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "DataRadius: Everything your ISP runs on",
  description:
    "Billing, M-Pesa payments, routers and subscribers in one dashboard. Customers pay, get online in seconds, and reconnect automatically.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
       className={`${geistSans.variable} ${geistMono.variable} ${akhirTahun.variable} ${autobusOmnibus.variable} ${oblisk.variable} ${superShiny.variable} ${ibmblockserif.variable} ${earlybird.variable} ${anton.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-serif">
        <CurrencyProvider>
          <Navbar />
          {children}
          <Footer />
        </CurrencyProvider>
        </body>
    </html>
  );
}
