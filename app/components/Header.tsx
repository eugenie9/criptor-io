import Link from "next/link";
import SelectPublisher from "@/app/components/SelectPublisher";
import sources from "@/sources.json";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import Button from "./Button";
import { getSource } from "@/app/utils";

const FEATURED_SOURCE_IDS = ["beincrypto", "coin_gape", "crypto_potato", "defiant", "protos"];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-crypto-dark/95 backdrop-blur-sm transition-colors duration-300 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <MobileMenu />
            <Link href="/" className="flex items-center ml-0 lg:ml-0">
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-crypto-light">
                  Criptor
                </h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  An RSS reader for cryptocurrency news
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Button href="/about" variant="outline" size="sm">
                About
              </Button>
            </div>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>

      <nav className="border-t border-gray-200 dark:border-gray-700 py-2 hidden lg:block bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto flex items-center">
          <div className="flex flex-wrap items-center gap-2 pr-4">
          {sources
            .filter((source) => FEATURED_SOURCE_IDS.includes(source.id))
            .map((source) => (
              <Link
                key={source.id}
                prefetch={false}
                href={`/publisher/${source.id}`}
                className="group flex items-center text-sm xl:text-base font-medium py-1.5 px-3 rounded-full bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-200 hover:text-crypto-light hover:bg-white dark:hover:bg-gray-800 shadow-sm border border-gray-200/80 dark:border-gray-700/70 transition-colors duration-200"
              >
                <img
                  src={getSource(source.id).logo}
                  alt={source.name}
                  className="h-5 w-5 object-contain rounded-full bg-white p-0.5 mr-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span>{source.name}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/publisher"
            prefetch={false}
            className="ml-auto text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-crypto-light transition-colors duration-200 whitespace-nowrap"
          >
            Browse all
          </Link>
        </div>
      </nav>
    </header>
  );
}
