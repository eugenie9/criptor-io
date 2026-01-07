"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import sources from "@/sources.json";
import { getSource } from "@/app/utils";
import ThemeToggle from "./ThemeToggle";

const FEATURED_SOURCE_IDS = [
  "beincrypto",
  "bitcoin_magazine",
  "crypto_potato",
  "crypto_slate",
  "defiant",
  "forkast",
  "protos",
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/publisher", label: "Publishers" },
    { href: "/about", label: "About" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-full lg:w-[200px]
          bg-white dark:bg-[#0f1419] 
          border-r border-gray-200 dark:border-gray-800
          z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
          flex flex-col
        `}
      >
        {/* Mobile Menu Header */}
        <div className="lg:hidden sticky top-0 bg-white dark:bg-[#0f1419] border-b border-gray-200 dark:border-gray-800 px-4 py-3 z-10">
          <div className="flex justify-between items-center">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
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

            {/* Logo */}
            <Link
              href="/"
              onClick={onClose}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-crypto-light">
                <span className="text-white font-bold text-xl">C</span>
              </div>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Logo Section */}
        <div className="hidden lg:block sticky top-0 bg-white dark:bg-[#0f1419] z-10 border-b border-gray-200 dark:border-gray-800 px-6 py-5">
          <Link href="/" onClick={onClose} className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-heading font-bold text-crypto-light">
                Criptor
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Crypto News Reader
              </p>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Content */}
        <div className="lg:hidden px-4 py-6">
          {/* Navigation */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
              Navigation
            </h3>
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors group ${
                      isActive
                        ? "bg-crypto-light/10 text-crypto-light dark:bg-crypto-light/20"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-crypto-light transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured Publishers */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
              Featured Publishers
            </h3>
            <div className="space-y-1">
              {sources
                .filter((source) => FEATURED_SOURCE_IDS.includes(source.id))
                .map((source) => {
                  const isActive = pathname.includes(`/publisher/${source.id}`);
                  return (
                    <Link
                      key={source.id}
                      href={`/publisher/${source.id}`}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors group ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={getSource(source.id).logo}
                          alt={source.name}
                          className="h-6 w-6 object-contain rounded bg-white p-0.5"
                        />
                        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-crypto-light transition-colors">
                          {source.name}
                        </span>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-crypto-light transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
              Legal
            </h3>
            <div className="space-y-1">
              <Link
                href="/info/privacy-policy"
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <span className="font-medium">Privacy Policy</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-crypto-light transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/info/terms-of-service"
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <span className="font-medium">Terms of Service</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-crypto-light transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 px-4">
              © 2025 Criptor.net
            </p>
          </div>
        </div>

        {/* Desktop Search Box */}
        <div className="hidden lg:block px-4 pt-4 pb-2">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-light/50 text-gray-900 dark:text-gray-100"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  block px-4 py-3 rounded-lg
                  text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-crypto-light/10 text-crypto-light dark:bg-crypto-light/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-crypto-light"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Publishers Section */}
        <div className="hidden lg:block px-4 pb-6">
          <div className="mb-3 flex items-center justify-between px-2">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Featured Publishers
            </h2>
          </div>
          <div className="space-y-1">
            {sources
              .filter((source) => FEATURED_SOURCE_IDS.includes(source.id))
              .slice(0, 7)
              .map((source) => {
                const isActive = pathname.includes(`/publisher/${source.id}`);
                return (
                  <Link
                    key={source.id}
                    href={`/publisher/${source.id}`}
                    onClick={onClose}
                    className={`
                      group flex items-center gap-3 px-3 py-2 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }
                    `}
                  >
                    <img
                      src={getSource(source.id).logo}
                      alt={source.name}
                      className="h-6 w-6 object-contain rounded bg-white p-0.5"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-crypto-light transition-colors">
                      {source.name}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Desktop Footer Section */}
        <div className="hidden lg:block border-t border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex flex-col space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <Link
              href="/info/privacy-policy"
              onClick={onClose}
              className="hover:text-crypto-light transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/info/terms-of-service"
              onClick={onClose}
              className="hover:text-crypto-light transition-colors"
            >
              Terms of Service
            </Link>
            <p className="pt-2 text-xs">© 2025 Criptor.net</p>
          </div>
        </div>
      </aside>
    </>
  );
}
