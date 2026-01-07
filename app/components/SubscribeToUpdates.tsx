export default function SubscribeToUpdates() {
  return (
    <div className="bg-crypto-light bg-opacity-10 dark:bg-opacity-20 p-8 rounded-lg">
      <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
        Subscribe to Updates
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
        Get the latest cryptocurrency news and insights delivered directly to
        your inbox.
      </p>
      <div className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Your email address"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-light"
        />
        <button className="bg-crypto-light hover:bg-crypto-dark text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
