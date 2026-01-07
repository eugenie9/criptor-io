import { searchArticles } from "@/app/actions";
import Section from "@/app/components/Section";
import MarketOverview from "../components/MarketOverview";
import SubscribeToUpdates from "../components/SubscribeToUpdates";
import SearchResults from "./Results";

export default async function SearchPageContent({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams?.q || "";
  const results = await searchArticles(query, 10, 0);

  return (
    <div className="flex flex-col">
      <Section className="py-8 md:py-12 px-4 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
              Results for
              <span className="font-semibold text-crypto-light">"{query}"</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3 xl:col-span-2">
            <SearchResults query={query} initialResults={results} />
          </div>
          <div className="col-span-3 xl:col-span-1">
            <div className="flex flex-col space-y-6 sticky top-32 mt-12">
              <SubscribeToUpdates />

              <MarketOverview />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
