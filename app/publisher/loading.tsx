export default function Loading() {
  return (
    <div className="py-6 pt-12 px-4 lg:px-12 container mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-6 md:mb-8">
        <div className="h-8 md:h-10 lg:h-11 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 md:h-5 w-full max-w-xl bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Publishers Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 shadow-card dark:shadow-card-dark"
          >
            <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 h-full min-h-[240px] sm:min-h-[280px] space-y-4 sm:space-y-6">
              {/* Publisher Logo Skeleton */}
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>

              {/* Publisher Name Skeleton */}
              <div className="text-center space-y-1 sm:space-y-2 w-full">
                <div className="h-5 sm:h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                <div className="h-3 sm:h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
