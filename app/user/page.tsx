"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/Button";
import { authClient } from "@/utils/auth-client";

export default function UserDashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we've finished loading AND there's no session
    if (!isPending && !session?.user) {
      router.push("/auth/login");
    }
  }, [session?.user, isPending, router]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-light mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 sm:py-4 md:py-8 lg:py-16">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="h-12 sm:h-16 w-12 sm:w-16 bg-gradient-to-br from-crypto-light to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
              Welcome back, {user.name?.split(" ")[0] || "User"}! 👋
            </h1>
            <p className="mt-1 text-xs sm:text-base text-gray-600 dark:text-gray-300">
              Stay ahead of the crypto curve with your personalized news hub
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              24
            </div>
            <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
              Articles Read
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
              7
            </div>
            <div className="text-xs sm:text-sm text-green-600 dark:text-green-400">
              Days Active
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
              5
            </div>
            <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400">
              Saved Articles
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 animate-fade-in">
        {/* Your Reading Journey */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Today's Highlights */}
          <div className="bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-7 sm:h-8 w-7 sm:w-8 bg-gradient-to-r from-crypto-light to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 sm:h-5 w-4 sm:w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-gray-800 dark:text-gray-100">
                  Today&apos;s Crypto Highlights
                </h2>
              </div>
              <span className="text-xs sm:text-sm text-crypto-light font-medium">
                Just for you
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    BTC
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-1">
                    Bitcoin Reaches New Monthly High
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    Market analysis shows strong institutional interest driving
                    the latest surge...
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>BeInCrypto</span>
                    <span className="mx-2">•</span>
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    ETH
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-1">
                    Ethereum 2.0 Staking Rewards Update
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    New staking mechanisms promise higher yields for long-term
                    holders...
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>The Defiant</span>
                    <span className="mx-2">•</span>
                    <span>4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/"
                className="inline-flex items-center text-crypto-light hover:text-crypto-light/80 font-medium transition-colors"
              >
                <span className="text-xs sm:text-sm">
                  Explore more articles
                </span>
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Reading Preferences */}
          <div className="bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-7 sm:h-8 w-7 sm:w-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="h-4 sm:h-5 w-4 sm:w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-gray-800 dark:text-gray-100">
                Your Favorite Sources
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {["BeInCrypto", "The Defiant", "Protos", "CryptoSlate"].map(
                (source, index) => (
                  <div
                    key={source}
                    className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div
                      className={`h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : index === 1
                          ? "bg-green-100 dark:bg-green-900/30"
                          : index === 2
                          ? "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-orange-100 dark:bg-orange-900/30"
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-bold ${
                          index === 0
                            ? "text-blue-600 dark:text-blue-400"
                            : index === 1
                            ? "text-green-600 dark:text-green-400"
                            : index === 2
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-orange-600 dark:text-orange-400"
                        }`}
                      >
                        {source.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {source}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {Math.floor(Math.random() * 20) + 5} articles
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Profile Summary */}
          <div className="bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-4 sm:p-6">
            <div className="text-center">
              <div className="h-16 sm:h-20 w-16 sm:w-20 bg-gradient-to-br from-crypto-light to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {user.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                Crypto Enthusiast since{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="flex items-center justify-center gap-1 mb-3 sm:mb-4">
                <span className="text-crypto-light">⭐</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Premium Reader
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                href="/user/profile"
                className="w-full"
              >
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-crypto-dark border border-gray-100 dark:border-gray-800 rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <Link
                href="/user/preferences"
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="h-7 sm:h-8 w-7 sm:w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-crypto-light transition-colors">
                  Reading Preferences
                </span>
              </Link>

              <Link
                href="/user/settings"
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="h-7 sm:h-8 w-7 sm:w-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-crypto-light transition-colors">
                  Account Security
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group w-full text-left"
              >
                <div className="h-7 sm:h-8 w-7 sm:w-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="h-4 sm:h-5 w-4 sm:w-5 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 group-hover:text-red-500 transition-colors">
                  Sign Out
                </span>
              </button>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="bg-gradient-to-br from-crypto-light/10 to-orange-500/10 border border-crypto-light/20 rounded-lg p-4 sm:p-6 text-center">
            <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gradient-to-br from-crypto-light to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <svg
                className="h-5 sm:h-6 w-5 sm:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-crypto-light mb-1">
              Early Adopter
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              You&apos;re among the first to join our crypto news community!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
