"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again or return to the
        homepage.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-crypto-light text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
