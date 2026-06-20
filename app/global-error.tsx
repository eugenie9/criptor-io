"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans bg-white dark:bg-[#1c2434] text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-2xl md:text-4xl font-heading font-bold mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 text-center max-w-md">
            A critical error occurred. Please refresh the page or try again
            later.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-crypto-light text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
