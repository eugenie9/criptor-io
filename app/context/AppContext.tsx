"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { getCryptoPrices, getMarketData } from "../actions";

// ── Separate Contexts for granular subscriptions ──────────────────────

interface CryptoContextType {
  cryptoData: any[];
  isLoading: boolean;
}

const CryptoContext = createContext<CryptoContextType>({
  cryptoData: [],
  isLoading: true,
});

interface MarketContextType {
  marketData: any;
  isLoading: boolean;
}

const MarketContext = createContext<MarketContextType>({
  marketData: null,
  isLoading: true,
});

// ── Combined type kept for backward compatibility ─────────────────────

interface AppContextType {
  cryptoData: any[];
  marketData: any;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType>({
  cryptoData: [],
  marketData: null,
  isLoading: true,
});

// ── Provider ──────────────────────────────────────────────────────────

interface AppProviderProps {
  children: ReactNode;
  initialCryptoData?: any[];
  initialMarketData?: any;
}

export function AppProvider({
  children,
  initialCryptoData = [],
  initialMarketData = null,
}: AppProviderProps) {
  const [cryptoData, setCryptoData] = useState<any[]>(initialCryptoData);
  const [marketData, setMarketData] = useState<any>(initialMarketData);
  const [isLoading, setIsLoading] = useState(
    !initialCryptoData.length && !initialMarketData,
  );

  useEffect(() => {
    // Mark as loaded if we have initial data
    if (initialCryptoData.length || initialMarketData) {
      setIsLoading(false);
    }

    // Fetch crypto prices
    const fetchCryptoData = async () => {
      try {
        const data = await getCryptoPrices();
        setCryptoData(data);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
      }
    };

    // Fetch global market data
    const fetchMarketData = async () => {
      try {
        const data = await getMarketData();
        setMarketData(data);
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };

    // Start fetching after 2 minutes
    const initialDelay = setTimeout(() => {
      fetchCryptoData();
      fetchMarketData();

      // Then set up regular intervals
      const cryptoInterval = setInterval(fetchCryptoData, 60000); // Every 60 seconds
      const marketInterval = setInterval(fetchMarketData, 120000); // Every 2 minutes

      return () => {
        clearInterval(cryptoInterval);
        clearInterval(marketInterval);
      };
    }, 120000); // 2 minutes initial delay

    return () => {
      clearTimeout(initialDelay);
    };
  }, [initialCryptoData, initialMarketData]);

  // Memoized context values to prevent unnecessary re-renders
  const cryptoValue = useMemo(
    () => ({ cryptoData, isLoading }),
    [cryptoData, isLoading],
  );

  const marketValue = useMemo(
    () => ({ marketData, isLoading }),
    [marketData, isLoading],
  );

  const combinedValue = useMemo(
    () => ({ cryptoData, marketData, isLoading }),
    [cryptoData, marketData, isLoading],
  );

  return (
    <CryptoContext.Provider value={cryptoValue}>
      <MarketContext.Provider value={marketValue}>
        <AppContext.Provider value={combinedValue}>
          {children}
        </AppContext.Provider>
      </MarketContext.Provider>
    </CryptoContext.Provider>
  );
}

// ── Hooks ─────────────────────────────────────────────────────────────

/** Granular hook — only re-renders when cryptoData or isLoading changes */
export function useCrypto() {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto must be used within AppProvider");
  }
  return context;
}

/** Granular hook — only re-renders when marketData or isLoading changes */
export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within AppProvider");
  }
  return context;
}

/** Combined hook — kept for backward compatibility. Prefer useCrypto() or useMarket() for better performance. */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
