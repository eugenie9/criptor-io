import { formatPrice } from "../utils";

interface MarketStatsBarProps {
  data?: {
    total_market_cap?: { usd?: number };
    total_volume?: { usd?: number };
    market_cap_percentage?: Record<string, number>;
    market_cap_change_percentage_24h_usd?: number;
    volume_change_percentage_24h_usd?: number;
    markets?: number;
  };
}

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
}

export default function MarketStatsBar({ data }: MarketStatsBarProps) {
  const marketCap = data?.total_market_cap?.usd || 0;
  const marketCapChange = data?.market_cap_change_percentage_24h_usd || 0;
  const volume24h = data?.total_volume?.usd || 0;
  const volume24hChange = data?.volume_change_percentage_24h_usd || 0;
  const btcDominance = data?.market_cap_percentage?.btc || 0;
  const ethDominance = data?.market_cap_percentage?.eth || 0;
  const totalMarkets = data?.markets || 0;

  // Find top altcoin (excluding BTC, ETH, stablecoins)
  const excludeList = ["btc", "eth", "usdt", "usdc", "steth"];
  const topAltcoin = Object.entries(data?.market_cap_percentage || {})
    .filter(([key]) => !excludeList.includes(key.toLowerCase()))
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-[#0a0e14] border-b border-gray-200 dark:border-gray-800 no-scrollbar">
      <div className="flex items-center min-w-max px-4 lg:px-12 py-4 gap-8">
        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-xs font-semibold text-green-500">LIVE</span>
        </div>

        {/* Total Market Cap */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            MARKET CAP
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {formatNumber(marketCap)}
          </span>
          <span
            className={`text-xs font-medium ${
              marketCapChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {marketCapChange >= 0 ? "+" : ""}
            {marketCapChange.toFixed(2)}%
          </span>
        </div>

        {/* 24H Volume */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            24H VOL
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {formatNumber(volume24h)}
          </span>
          <span
            className={`text-xs font-medium ${
              volume24hChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {volume24hChange >= 0 ? "+" : ""}
            {volume24hChange.toFixed(2)}%
          </span>
        </div>

        {/* Markets */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            EXCHANGES
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(totalMarkets)}
          </span>
        </div>

        {/* BTC Dominance */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            BTC DOMINANCE
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {btcDominance.toFixed(1)}%
          </span>
        </div>

        {/* ETH Dominance */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            ETH DOMINANCE
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {ethDominance.toFixed(1)}%
          </span>
        </div>

        {/* Top Altcoin */}
        {topAltcoin && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              TOP ALT
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
              {topAltcoin[0].toUpperCase()} ({topAltcoin[1].toFixed(1)}%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
