export default function Loading() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Publisher Header Skeleton */}
      <div className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-12 px-4 lg:px-12">
          <div className="flex flex-col items-center text-center mb-8 animate-pulse">
            <div className="mb-6">
              <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto" />
            </div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-3 mx-auto"></div>
            <div className="w-24 h-1 bg-crypto-light bg-opacity-30 dark:bg-gray-700 mx-auto mb-4 rounded"></div>
            <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800 rounded mx-auto"></div>
          </div>
          <div className="flex justify-center animate-pulse">
            <div className="flex space-x-6 text-sm font-medium">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-8 bg-gray-100 dark:bg-gray-700 rounded" />
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article Skeleton */}
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto py-12 px-4 lg:px-12 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="w-16 h-1 bg-crypto-light bg-opacity-30 dark:bg-gray-700 mb-6 rounded"></div>
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-4"></div>
              <div className="flex space-x-2 mb-8">
                <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded mb-4"></div>
              <div className="h-6 w-44 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden h-[400px] bg-gray-200 dark:bg-gray-700 w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stories Skeleton */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto py-12 px-4 lg:px-12 animate-pulse">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="w-16 h-1 bg-crypto-light bg-opacity-30 dark:bg-gray-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 h-full flex flex-col border border-gray-100 dark:border-gray-600 animate-pulse"
              >
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-800"></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded mb-4"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Articles Skeleton */}
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto py-12 px-4 lg:px-12 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="col-span-1 md:col-span-8">
              <div className="flex flex-col mb-12">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="w-16 h-1 bg-crypto-light bg-opacity-30 dark:bg-gray-700 mb-6 rounded"></div>
              </div>
              <div className="flexflex-col space-y-12">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-8 animate-pulse"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="col-span-1 md:col-span-5 md:order-2">
                        <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      </div>
                      <div className="col-span-1 md:col-span-7 md:order-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-3 w-3 bg-gray-100 dark:bg-gray-700 rounded"></div>
                          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-5"></div>
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 lg:mt-16">
                <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="col-span-1 md:col-span-4">
              <div className="sticky top-24 lg:top-48 space-y-10">
                {/* About Publisher */}
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700 animate-pulse">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded ml-3"></div>
                  </div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-6"></div>
                </div>
                {/* Newsletter Signup Skeleton */}
                <div className="bg-crypto-light bg-opacity-10 dark:bg-opacity-20 p-8 rounded-lg animate-pulse">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 w-36 bg-gray-100 dark:bg-gray-800 mb-6 rounded"></div>
                  <div className="flex flex-col space-y-3">
                    <div className="h-9 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-9 w-1/2 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
