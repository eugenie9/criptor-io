"use client";

import { useEffect, useState } from "react";
import symbols from "@/data/symbols.json";
import { formatPrice } from "../utils";

interface TickerItem {
  symbol: string;
  name: string;
  logo: string;
  price: string | number;
  priceChangePercent: string;
}

export default function CryptoTicker({ initialData }: { initialData?: any[] }) {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const items: TickerItem[] = initialData.map((priceItem) => {
        const symbol = symbols[priceItem.symbol as keyof typeof symbols];
        return {
          symbol: symbol.shortName,
          name: symbol.name,
          logo: symbol.logo,
          price: formatPrice(priceItem.lastPrice),
          priceChangePercent: Number(priceItem.priceChangePercent).toFixed(2),
        };
      });
      setTickerItems(items);
    }
  }, [initialData]);

  if (tickerItems.length === 0) return null;

  // Duplicate items for seamless looping
  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.symbol}-${index}`}
              className="ticker-item inline-flex items-center px-6 py-3 gap-2"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="w-5 h-5 flex-shrink-0"
              />
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {item.symbol}
              </span>
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                ${item.price}
              </span>
              <span
                className={`text-xs font-medium ${
                  Number(item.priceChangePercent) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Number(item.priceChangePercent) >= 0 ? "+" : ""}
                {item.priceChangePercent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .ticker-content {
          display: inline-flex;
          white-space: nowrap;
          animation: scroll 90s linear infinite;
        }

        .ticker-item {
          display: inline-flex;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .ticker-content {
            animation-duration: 60s;
          }
        }
      `}</style>
    </div>
  );
}
