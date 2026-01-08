"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCryptoPrices, getMarketData } from "../actions";

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
    !initialCryptoData.length && !initialMarketData
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
      return;
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

  return (
    <AppContext.Provider value={{ cryptoData, marketData, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
