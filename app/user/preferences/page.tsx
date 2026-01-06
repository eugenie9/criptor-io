"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/Button";
import { authClient } from "@/utils/auth-client";

export default function PreferencesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    newsletter: false,
    darkMode: false,
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/auth/login");
    }
  }, [session?.user, isPending, router]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);

    try {
      // TODO: Save preferences to database
      // await fetch("/api/user/preferences", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(preferences),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess(true);
      setSaving(false);
    } catch (error) {
      setSaving(false);
    }
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

  return (
    <div className="container mx-auto px-4 xl:px-0 py-6 sm:py-8 md:py-16">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/user"
            className="inline-flex items-center text-xs sm:text-sm text-crypto-light hover:text-crypto-light/80 transition-colors mb-4 sm:mb-6 font-medium"
          >
            <svg
              className="h-3 sm:h-4 w-3 sm:w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="h-12 sm:h-16 w-12 sm:w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="h-6 sm:h-8 w-6 sm:w-8 text-white"
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
            <div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
                Your Preferences
              </h1>
              <p className="mt-1 text-xs sm:text-base text-gray-600 dark:text-gray-300">
                Customize your crypto news experience to match your interests
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-crypto-dark rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-4 sm:p-6 md:p-8 border border-gray-100 dark:border-gray-800">
          {success && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3">
              <svg
                className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium">Preferences saved successfully!</p>
                <p className="text-xs mt-1 opacity-80">
                  Your crypto news experience has been personalized.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-4 sm:py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                <div className="h-9 sm:h-10 w-9 sm:w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
                    Email Notifications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Get notified about breaking crypto news, market alerts, and
                    account updates
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-crypto-light/20 dark:peer-focus:ring-crypto-light/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-crypto-light"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mt-1">
                  <svg
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    Weekly Newsletter
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Receive our curated weekly digest of the most important
                    crypto news and trends
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.newsletter}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      newsletter: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-crypto-light/20 dark:peer-focus:ring-crypto-light/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-crypto-light"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-6">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mt-1">
                  <svg
                    className="h-5 w-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    Dark Mode Theme
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Switch between light and dark themes for comfortable reading
                    at any time
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.darkMode}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      darkMode: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-crypto-light/20 dark:peer-focus:ring-crypto-light/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-crypto-light"></div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={handleSave} variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
