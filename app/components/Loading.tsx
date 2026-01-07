export default function Loading() {
  return (
    <div className="flex flex-col pt-8 lg:pt-4 px-4 lg:px-8 max-w-7xl mx-auto w-full animate-pulse">
      {/* Hero section skeleton - 3 large cards */}
      <div className="grid grid-cols-8 md:grid-cols-7 gap-4 mb-8">
        <div className="col-span-8 md:col-span-3">
          <div className="relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 h-72 md:h-[496px]">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-3">
              <div className="h-4 w-24 bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-6 w-full bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-6 w-3/4 bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-3 w-20 bg-white/20 dark:bg-gray-600/30 rounded"></div>
            </div>
          </div>
        </div>
        <div className="col-span-4 md:col-span-2">
          <div className="relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 h-72 md:h-[496px]">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-3">
              <div className="h-4 w-20 bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-5 w-full bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-5 w-2/3 bg-white/20 dark:bg-gray-600/30 rounded"></div>
            </div>
          </div>
        </div>
        <div className="col-span-4 md:col-span-2">
          <div className="relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 h-72 md:h-[496px]">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-3">
              <div className="h-4 w-24 bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-6 w-full bg-white/20 dark:bg-gray-600/30 rounded"></div>
              <div className="h-6 w-3/4 bg-white/20 dark:bg-gray-600/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* News rows skeleton */}
      <div className="w-full py-8 md:py-10">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="grid grid-cols-3 bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="col-span-2 flex flex-col p-6 sm:p-8 space-y-4">
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded ml-2"></div>
                </div>
              </div>
              <div className="col-span-1 bg-gray-200 dark:bg-gray-800">
                <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
