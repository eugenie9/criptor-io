import { AppProvider } from "@/app/context/AppContext";
import { getCryptoPrices, getMarketData } from "@/app/actions";

export default async function AppProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch initial data on the server
  const [initialCryptoData, initialMarketData] = await Promise.all([
    getCryptoPrices(),
    getMarketData(),
  ]);

  return (
    <AppProvider
      initialCryptoData={initialCryptoData}
      initialMarketData={initialMarketData}
    >
      {children}
    </AppProvider>
  );
}
