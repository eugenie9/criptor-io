"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess(true);
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user) {
      router.push("/user");
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.email(
        {
          email: email,
          password: password,
        },
        {
          onSuccess: () => {
            // Session will be updated automatically
            // Router will redirect via useEffect above
          },
          onError: (ctx) => {
            setError(ctx.error?.message || "Invalid email or password");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-800 dark:text-gray-100">
            Welcome Back to Criptor!
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Sign in to access your personalized crypto news dashboard
          </p>
        </div>

        <div className="bg-white dark:bg-crypto-dark rounded-lg shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all duration-300 p-6 sm:p-8 border border-gray-100 dark:border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {success && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-lg text-sm flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-3"
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
                  <p className="font-medium">Account created successfully!</p>
                  <p className="text-xs mt-1 opacity-80">
                    Welcome to the Criptor community. Please sign in to
                    continue.
                  </p>
                </div>
              </div>
            )}
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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-crypto-light hover:text-crypto-light/80 transition-colors hidden"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-light focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <div className="text-center pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                New to Criptor?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold text-crypto-light hover:text-crypto-light/80 transition-colors"
                >
                  Join our crypto community →
                </Link>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Get personalized news, track your reading, and stay ahead of the
                crypto curve
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
