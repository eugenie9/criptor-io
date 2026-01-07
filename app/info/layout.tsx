"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Section from "../components/Section";

const items = [
  {
    name: "Terms of Service",
    href: "/info/terms-of-service",
  },
  {
    name: "Privacy Policy",
    href: "/info/privacy-policy",
  },
  {
    name: "Cookie Policy",
    href: "/info/cookie-policy",
  },
  {
    name: "Disclaimer",
    href: "/info/disclaimer",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Section className="py-8 md:py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-card dark:shadow-card-dark">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
              Legal Pages
            </h2>
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-crypto-light/10 text-crypto-light dark:text-crypto-light"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-crypto-light dark:hover:text-crypto-light"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-xl shadow-card dark:shadow-card-dark p-6 md:p-8 lg:p-10">
            {children}
          </div>

          {/* Disclaimer Footer */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 leading-relaxed">
                  This page is created for UI purposes only. Criptor is a
                  project for the purpose of learning and practicing the Next.js
                  framework. All content on the site is taken from the Internet
                  and is not the intellectual property of the author of the
                  site. The author of the site is not responsible for the
                  content of the site and its use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
