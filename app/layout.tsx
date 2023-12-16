import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Criptor.io - Your Ultimate Source for Cryptocurrency News",
  description:
    "Stay updated with the latest cryptocurrency news from around the globe with Criptor.io, your comprehensive RSS reader for all things crypto.",
  keywords:
    "Cryptocurrency, Crypto News, Bitcoin, Ethereum, Blockchain, Crypto Market, Altcoins, Crypto Trading, Crypto Investment, Crypto Updates, Blockchain Technology, DeFi, NFT, Crypto RSS Reader, Criptor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container flex flex-col min-h-screen mx-auto px-4 md:px-8 lg:px-12">
          <Header />
          <main className="flex flex-col flex-1">{children}</main>
          <div className="border-b border-black" />
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
