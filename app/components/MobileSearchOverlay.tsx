"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchArticles } from "@/app/actions";
import { getSource } from "../utils";

interface SearchResult extends TArticle {}

interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

export default function MobileSearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, setState] = React.useState<SearchState>({
    query: "",
    results: [],
    isLoading: false,
    error: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = useCallback(async (query: string) => {
    setState((prev) => ({ ...prev, query, isLoading: true, error: null }));

    if (!query.trim()) {
      setState((prev) => ({
        ...prev,
        results: [],
        isLoading: false,
      }));
      return;
    }

    try {
      // @ts-ignore
      const response = await searchArticles(query);
      const articles = (response.items || []).map((item: any) => ({
        ...item,
        url: item.url || `/${item.source}/${item.slug}`,
      }));
      setState((prev) => ({
        ...prev,
        results: articles,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to search articles",
        isLoading: false,
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, query: value }));

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      if (value.trim()) {
        handleSearch(value);
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.query.trim()) {
      router.push(`/search?q=${encodeURIComponent(state.query)}`);
      onClose();
      setState({ query: "", results: [], isLoading: false, error: null });
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(`/publisher/${result.source}/${result.slug}`);
    onClose();
    setState({ query: "", results: [], isLoading: false, error: null });
  };

  const handleClose = () => {
    onClose();
    setState({ query: "", results: [], isLoading: false, error: null });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[57px] z-40 bg-white dark:bg-crypto-dark lg:hidden flex flex-col">
      {/* Search Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Search Criptor
        </h2>

        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search cryptocurrency news..."
              value={state.query}
              onChange={handleInputChange}
              className="w-full px-6 py-4 pr-16 text-base rounded-xl border border-crypto-light bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-crypto-light focus:ring-0 focus:ring-crypto-light outline-none transition-colors"
            />
            {state.query ? (
              <button
                type="button"
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    query: "",
                    results: [],
                  }));
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-crypto-light flex items-center justify-center text-white hover:bg-crypto-light/90 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-crypto-light flex items-center justify-center text-white hover:bg-crypto-light/90 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Content Area with Search */}
      <div className="flex-1 overflow-y-auto">
        {/* Results */}
        <div>
          {/* Loading State */}
          {state.isLoading && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-crypto-light/10 dark:bg-crypto-light/20 mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-crypto-light border-t-transparent"></div>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Searching...
              </p>
            </div>
          )}

          {/* Error State */}
          {state.error && !state.isLoading && (
            <div className="p-6 mx-6">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded px-4 py-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {state.error}
                </p>
              </div>
            </div>
          )}

          {/* No Results */}
          {!state.isLoading &&
            !state.error &&
            state.query &&
            state.results.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

          {/* Results List */}
          {!state.isLoading && state.results.length > 0 && (
            <div>
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {state.results.length}{" "}
                  {state.results.length === 1 ? "Result" : "Results"}
                </p>
              </div>
              {state.results.map((result, index) => {
                const source = getSource(result.source);
                return (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 transition-all"
                  >
                    <div className="flex gap-3">
                      {result.thumbnail && (
                        <div className="relative flex-shrink-0">
                          <img
                            src={result.thumbnail}
                            alt={result.title}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2 mb-1.5">
                          {result.title}
                        </h3>
                        {source && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {source.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* View All Results Button */}
              <button
                onClick={handleSubmit}
                className="w-full p-4 text-center text-sm font-medium text-crypto-light hover:bg-crypto-light/5 dark:hover:bg-crypto-light/10 transition-all"
              >
                View all results →
              </button>
            </div>
          )}

          {/* Empty State - No Query */}
          {!state.isLoading && !state.query && state.results.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-crypto-light/10 dark:bg-crypto-light/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-crypto-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Search Criptor
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start typing to find crypto news articles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
