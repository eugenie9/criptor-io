"use client";

import { useState, useEffect } from "react";
import { subscribeToNewsletter } from "../actions";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SubscribeToUpdates() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Auto-dismiss success message after 4 seconds
  useEffect(() => {
    if (status === "success") {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setStatus("idle");
        setShowMessage(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubscribe = async () => {
    setStatus("loading");
    setShowMessage(false);

    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      setShowMessage(true);
      return;
    }

    try {
      subscribeToNewsletter(email).then(({ success, isNewSubscriber }) => {
        if (success) {
          setStatus("success");
          setSuccessMessage(
            isNewSubscriber
              ? "Successfully subscribed!"
              : "You are already subscribed."
          );
          setShowMessage(true);
        } else {
          setStatus("error");
          setErrorMessage("Subscription failed. Please try again later.");
          setShowMessage(true);
        }
      });
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setShowMessage(true);
    } finally {
      setEmail("");
    }
  };

  const dismissError = () => {
    setStatus("idle");
    setShowMessage(false);
    setErrorMessage("");
  };

  return (
    <div className="bg-crypto-light bg-opacity-10 dark:bg-opacity-20 p-8 rounded-lg">
      <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
        Subscribe to Updates
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
        Get the latest cryptocurrency news and insights delivered directly to
        your inbox.
      </p>

      {/* Success State */}
      {status === "success" && showMessage ? (
        <div className="space-y-3">
          <div className="bg-crypto-light/10 dark:bg-crypto-light/20 border border-crypto-light/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-crypto-light"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-900 dark:text-white">
                {successMessage || "Successfully subscribed!"}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-7 hidden">
              Check your inbox to confirm.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-crypto-light focus:ring-1 focus:ring-crypto-light transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            />
            <button
              className="bg-crypto-light hover:bg-crypto-dark text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              onClick={handleSubscribe}
              disabled={status === "loading" || !email}
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </div>

          {/* Error Message */}
          {status === "error" && showMessage && (
            <div className="bg-crypto-dark/5 dark:bg-crypto-dark/30 border-l-4 border-crypto-dark dark:border-crypto-light/50 px-4 py-3 rounded text-sm flex items-start justify-between">
              <p className="text-gray-700 dark:text-gray-300">{errorMessage}</p>
              <button
                onClick={dismissError}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-2 font-bold"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
