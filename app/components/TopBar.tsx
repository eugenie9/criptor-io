"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import MobileSearchOverlay from "./MobileSearchOverlay";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/auth");
  const isUserPage = pathname.includes("/user");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isAuthPage || isUserPage) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0a0e14] border-b border-gray-200 dark:border-gray-800 shadow-sm xl:h-[89px]">
        {/* Desktop TopBar */}
        <div className="hidden lg:flex container mx-auto px-4 lg:px-12 w-full h-full">
          <div className="flex items-center justify-between px-2 w-full">
            {/* Breadcrumb or page title */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/"
                className="hover:text-crypto-light transition-colors"
              >
                Home
              </Link>
              {pathname !== "/" && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                    {pathname.split("/")[1] || ""}
                  </span>
                </>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Link
                href="/about"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-crypto-light transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile TopBar */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3">
          {/* Left: Hamburger or Close */}
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
          )}

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-crypto-light">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </Link>

          {/* Right: Search & Theme Toggle */}
          <div className="flex items-center gap-1">
            {!isSearchOpen && (
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
      </div>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
