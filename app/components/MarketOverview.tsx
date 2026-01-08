import { getCryptoPrices } from "../actions";
import symbols from "@/data/symbols.json";
import { formatPrice } from "../utils";

export default async function MarketOverview() {
  const prices = await getCryptoPrices();

  return (
    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-6 pb-4">
      <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-crypto-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Market Overview
      </h3>
      <div className="space-y-3">
        {(prices || []).map((priceItem: any, index: number) => {
          if (index >= 4) return null; // Show only top 5
          const price = priceItem.lastPrice;
          const priceChangePercent = priceItem.priceChangePercent;
          const symbol = symbols[priceItem.symbol as keyof typeof symbols];
          return (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center space-x-2">
                <img src={symbol.logo} alt={symbol.name} className="w-4 h-4" />
                <span className="font-medium">{symbol.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-sm">{formatPrice(price)}</span>
                <span
                  className={`text-xs ${
                    priceChangePercent > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {priceChangePercent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
