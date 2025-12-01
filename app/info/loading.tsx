export default function Loading() {
  return (
    <div className="w-full md:w-3/4 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            {/* Section Header */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            {/* Section Content */}
            <div className="ml-11 space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
