"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { name: "Top", icon: "🔥", href: "/" },
  { name: "News", icon: "📰", href: "/" },
  { name: "Podcasts", icon: "🎙️", href: "#" },
  { name: "Coins", icon: "🪙", href: "#" },
  { name: "Data", icon: "📊", href: "#" },
  { name: "Places", icon: "🌍", href: "#" },
  { name: "Directory", icon: "📁", href: "/publisher" },
];

const moreLinks = [
  { name: "About", href: "/about" },
  { name: "Brand Assets", href: "#" },
  { name: "Disclaimer", href: "/info/disclaimer" },
  { name: "FAQ", href: "#" },
  { name: "Help & Support", href: "#" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside and prevent scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 -ml-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
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

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-white dark:bg-crypto-dark overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-crypto-dark border-b border-gray-200 dark:border-gray-800 px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-2 -ml-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
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
                onClick={() => setIsOpen(false)}
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

          {/* Menu Content */}
          <div className="px-4 py-6">
            {/* SECTIONS */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
                Sections
              </h3>
              <div className="space-y-1">
                {sections.map((section) => (
                  <Link
                    key={section.name}
                    href={section.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-medium">{section.name}</span>
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
                ))}
              </div>
            </div>

            {/* MORE FROM CRIPTOR */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
                More from Criptor
              </h3>
              <div className="space-y-1">
                {moreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <span className="font-medium">{link.name}</span>
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
                ))}
              </div>
            </div>

            {/* EXPLORE CRIPTOR */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
                Explore Criptor
              </h3>
              <div className="bg-gradient-to-br from-crypto-light/10 to-purple-500/10 dark:from-crypto-light/20 dark:to-purple-500/20 rounded-2xl p-6 border border-crypto-light/20">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  News + Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Breaking coverage, market context, and reporting.
                </p>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="inline-block text-sm font-semibold text-crypto-light hover:text-crypto-light/80 transition-colors"
                >
                  LATEST NEWS →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
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
              </div>
            </div>

            <nav className="space-y-6 pb-0">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Publishers
                </h3>
                <ul className="grid grid-cols-2 gap-3">
                  {sources.map((source) => {
                    const meta = getSource(source.id);
                    return (
                      <li key={source.id}>
                        <Link
                          href={`/publisher/${source.id}`}
                          className="flex items-center py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-crypto-light shadow-sm border border-gray-200/80 dark:border-gray-700/70 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <img
                            src={meta.logo}
                            alt={meta.name || source.name}
                            className="h-6 w-6 object-contain rounded-full mr-2 bg-white p-0.5"
                          />
                          <span className="text-sm font-medium">
                            {meta.name || source.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="hidden">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Navigation
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-crypto-light transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/info/terms-of-service"
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-crypto-light transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/info/privacy-policy"
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-crypto-light transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/info/cookie-policy"
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-crypto-light transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
