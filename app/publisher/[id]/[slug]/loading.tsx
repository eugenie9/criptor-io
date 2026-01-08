export default function Loading() {
  return (
    <div className="w-full py-4 md:py-8 lg:py-12 container mx-auto !pb-0 pt-8 px-4 lg:px-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main article content skeleton */}
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-3 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-3 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-40 bg-gray-100 dark:bg-gray-800 rounded hidden sm:block" />
          </div>
          {/* Publisher info */}
          <div className="flex items-center mb-6 space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
          {/* Article Title */}
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          {/* Article Meta */}
          <div className="flex gap-6 mb-8">
            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          {/* Featured image */}
          <div className="h-[300px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-10" />
          {/* Article content skeleton */}
          <div className="space-y-4 mb-10">
            <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          {/* Related topics */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-gray-100 dark:bg-gray-800 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="lg:col-span-1 space-y-12 max-md:hidden">
          {/* Related articles */}
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg md:px-6 py-6">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  <div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded mt-7"></div>
          </div>
          {/* Market overview skeleton */}
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg md:px-6 py-5">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded mb-1"></div>
                    <div className="h-2 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
