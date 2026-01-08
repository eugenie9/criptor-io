"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileSearchOverlay from "./MobileSearchOverlay";
import CryptoTicker from "./CryptoTicker";
import MarketStatsBar from "./MarketStatsBar";
import { useApp } from "../context/AppContext";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const { cryptoData, marketData } = useApp();
  const isAuthPage = pathname.includes("/auth");
  const isUserPage = pathname.includes("/user");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isAuthPage || isUserPage) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0a0e14] border-b border-gray-200 dark:border-gray-800 shadow-sm xl:h-[89px]f">
        {/* Market Stats Bar - Static */}
        <div className="hidden lg:block">
          <MarketStatsBar data={marketData} />
        </div>

        {/* Crypto Ticker - Scrolling */}
        <div className="hidden lg:block">
          <CryptoTicker initialData={cryptoData} />
        </div>

        {/* Mobile TopBar */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          {/* Left: Hamburger or Close */}

          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-2xl font-heading font-bold text-crypto-light">
              Criptor
            </span>
          </Link>

          {/* Right: Search & Theme Toggle */}
          <div className="flex items-center gap-1">
            {isSearchOpen ? (
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 -ml-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close search"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Crypto Ticker */}
        <div className="lg:hidden">
          <MarketStatsBar data={marketData} />
          <CryptoTicker initialData={cryptoData} />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
