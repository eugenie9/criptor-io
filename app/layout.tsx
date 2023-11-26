import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Criptor.io - Cryptocurrency News",
  description: "An RSS reader for cryptocurrency news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container flex flex-col min-h-screen mx-auto px-4 xl:px-0">
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
