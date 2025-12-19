import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://criptor.net"
  ),
  title: "Criptor.net - Your Ultimate Source for Cryptocurrency News",
  description:
    "Stay updated with the latest cryptocurrency news from around the globe with Criptor.net, your comprehensive RSS reader for all things crypto.",
  keywords:
    "Cryptocurrency, Crypto News, Bitcoin, Ethereum, Blockchain, Crypto Market, Altcoins, Crypto Trading, Crypto Investment, Crypto Updates, Blockchain Technology, DeFi, NFT, Crypto RSS Reader, Criptor",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#1c2434" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${robotoMono.variable}`}
    >
      <body
        className={`font-sans bg-white dark:bg-crypto-dark text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <div className="flex flex-col min-h-screen min-w-screen">
          <Header />
          <main className="flex flex-col flex-1 container mx-auto animate-fade-in">
            {children}
          </main>
          <div className="border-b border-gray-200 dark:border-gray-700" />
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
