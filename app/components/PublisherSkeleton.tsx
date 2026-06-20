export default function PublisherSkeleton() {
  return (
    <div className="py-8 md:py-10 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4 md:col-span-2">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}
