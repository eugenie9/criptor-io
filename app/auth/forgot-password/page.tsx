"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Button from "@/app/components/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || "Failed to send reset email");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8 md:py-16 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-14 sm:h-16 w-14 sm:w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-4 sm:mb-6">
              <svg
                className="h-7 sm:h-8 w-7 sm:w-8 text-white"
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
              Check Your Email 📧
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              We&apos;ve sent a password reset link to
            </p>
            <p className="text-base sm:text-lg font-semibold text-crypto-light mt-1">
              {email}
            </p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Please check your inbox and follow the instructions to reset your
              password and get back to tracking crypto news.
            </p>
          </div>

          <div className="bg-white dark:bg-crypto-dark rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  <strong>Didn&apos;t receive the email?</strong>
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Check your spam folder or{" "}
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="text-crypto-light hover:text-crypto-light/80 font-semibold transition-colors underline"
                  >
                    try sending again
                  </button>
                </p>
              </div>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  ← Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8 md:py-16 min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="h-14 sm:h-16 w-14 sm:w-16 bg-gradient-to-br from-crypto-light to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="h-7 sm:h-8 w-7 sm:w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
            Reset Your Password
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            No worries! Enter your email address and we&apos;ll send you a
            secure link to reset your password
          </p>
        </div>

        <div className="bg-white dark:bg-crypto-dark rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg text-sm flex items-center">
                <svg
                  className="h-5 w-5 text-red-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-light focus:border-transparent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>

            <div className="text-center pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/auth/login"
                className="text-xs sm:text-sm text-crypto-light hover:text-crypto-light/80 transition-colors font-medium"
              >
                ← Back to Sign In
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Remember your password? Sign in to continue reading crypto news
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
