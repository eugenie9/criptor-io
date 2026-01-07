"use client";
import { useEffect, useState } from "react";
import { searchArticles } from "@/app/actions";
import HorizontalCard from "@/app/components/HorizontalCard";

export default function SearchResults({
  query,
  initialResults,
}: {
  query: string;
  initialResults: {
    items: any[];
    total: number;
    nextOffset: number | null;
  };
}) {
  const [results, setResults] = useState<TArticle[]>(initialResults.items);
  const [pageCount, setPageCount] = useState(
    Math.ceil(initialResults.total / 10)
  );
  const [totalResults, setTotalResults] = useState(initialResults.total);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [initiallyRendered, setInitiallyRendered] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      try {
        // @ts-ignore
        const response = await searchArticles(query, 10, currentOffset);
        const articles = (response.items || []).map((item: any) => ({
          ...item,
          url: item.url || `/${item.source}/${item.slug}`,
        }));
        setResults(articles);
        setPageCount(Math.ceil((response.total || 0) / 10));
        setTotalResults(response.total || 0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
        setHasSearched(true);
      }
    };

    if (!initiallyRendered) {
      setInitiallyRendered(true);
    } else {
      performSearch();
    }
  }, [currentOffset]);

  return (
    <>
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-light mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Searching articles...
          </p>
        </div>
      )}

      {/* No Query State */}
      {!isLoading && !query && !hasSearched && (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Use the search box to find articles
          </p>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && hasSearched && results.length === 0 && query && (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No articles found for "{query}"
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Try a different search term
          </p>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && results.length > 0 && (
        <div>
          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {totalResults}
              </span>{" "}
              article{results.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            {results.map((article, index) => (
              <div
                key={`${article.source}-${article.slug}-${index}`}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <HorizontalCard article={article} />
              </div>
            ))}

            {/* Pagination Info */}
            {pageCount > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    setCurrentOffset((prev) => Math.max(0, prev - 10));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  Page {currentPage} of {pageCount}
                </p>
                <button
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                    setCurrentOffset((prev) => prev + 10);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage >= pageCount}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
