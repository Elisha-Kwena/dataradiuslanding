import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { akhirTahun, autobusOmnibus, superShiny, earlybird, ibmblockserif, anton } from '../lib/fonts';
import "./globals.css";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${akhirTahun.variable} ${autobusOmnibus.variable} ${superShiny.variable} ${ibmblockserif.variable} ${earlybird.variable} ${anton.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem("theme")||"dark"}catch(e){document.documentElement.dataset.theme="dark"}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-serif">
        <CurrencyProvider>{children}</CurrencyProvider>
        </body>
    </html>
  );
}
