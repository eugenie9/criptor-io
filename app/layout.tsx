import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SidebarLayout from "@/app/components/SidebarLayout";
import Footer from "@/app/components/Footer";
import Script from "next/script";
import AppProviderWrapper from "@/app/components/AppProviderWrapper";

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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-5VQ7Z6Y23B`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5VQ7Z6Y23B');
          `}
        </Script>
      </head>
      <body
        className={`font-sans bg-white dark:bg-crypto-dark text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <AppProviderWrapper>
          <SidebarLayout>
            <main className="flex flex-col flex-1 animate-fade-in">
              {children}
            </main>
            <div className="border-b border-gray-200 dark:border-gray-700" />
            <Footer />
          </SidebarLayout>
        </AppProviderWrapper>
      </body>
    </html>
  );
}
