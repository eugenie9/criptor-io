"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import sources from "@/sources.json";
import ThemeToggle from "./ThemeToggle";
import { getSource } from "@/app/utils";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
        className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
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
          className="fixed inset-0 z-50 bg-white dark:bg-crypto-dark afnimate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto p-4 bg-white border-b-2 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center ml-0 lg:ml-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
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
                <div className="flex flex-col">
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-crypto-light">
                    Criptor
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    An RSS reader for cryptocurrency news
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <ThemeToggle /> */}
                <button
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
