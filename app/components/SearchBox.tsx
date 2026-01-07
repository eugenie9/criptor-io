"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchArticles } from "@/app/actions";
import { getSource } from "../utils";

interface SearchResult extends TArticle {}

interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

export default function SearchBox() {
  const router = useRouter();
  const [state, setState] = React.useState<SearchState>({
    isOpen: false,
    query: "",
    results: [],
    isLoading: false,
    error: null,
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setState((prev) => ({ ...prev, isOpen: false }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(`/publisher/${result.source}/${result.slug}`);
    setState((prev) => ({ ...prev, isOpen: false, query: "" }));
  };

  return (
    <div ref={searchRef} className="relative w-full sm:max-w-xs md:w-80">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search news..."
            value={state.query}
            onChange={handleInputChange}
            onFocus={() => setState((prev) => ({ ...prev, isOpen: true }))}
            className="w-full px-4 py-2.5 pl-10 pr-10 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-light/50 focus:border-crypto-light transition-all duration-200"
          />

          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
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

          {/* Clear Button */}
          {state.query && (
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {state.isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Loading State */}
          {state.isLoading && (
            <div className="p-4 text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-crypto-light"></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Searching...
              </p>
            </div>
          )}

          {/* Error State */}
          {state.error && !state.isLoading && (
            <div className="p-4 text-center text-sm text-red-600 dark:text-red-400">
              {state.error}
            </div>
          )}

          {/* No Results */}
          {!state.isLoading &&
            !state.error &&
            state.query &&
            state.results.length === 0 && (
              <div className="p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3"
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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No articles found for "{state.query}"
                </p>
              </div>
            )}

          {/* Results List */}
          {!state.isLoading && state.results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {state.results.map((result, index) => {
                const source = getSource(result.source);
                return (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors group"
                  >
                    <div className="flex gap-3">
                      {result.thumbnail && (
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="h-12 w-12 rounded object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-crypto-light transition-colors line-clamp-2">
                          {result.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {source?.name}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* View All Results Button */}
              {state.results.length > 0 && (
                <button
                  onClick={handleSubmit}
                  className="w-full p-3 text-center text-sm font-medium text-crypto-light hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-800"
                >
                  View all results
                </button>
              )}
            </div>
          )}

          {/* Empty State - No Query */}
          {!state.isLoading && !state.query && state.results.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Start typing to search...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
