"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import sources from "@/sources.json";
import { getSource } from "@/app/utils";

export default function SelectPublisher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState("Select Publisher");

  const handleChange = (sourceId: string, sourceName: string) => {
    setSelectedSource(sourceName);
    setIsOpen(false);
    router.push(`/publisher/${sourceId}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 lg:hidden">
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-crypto-dark border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <span>{selectedSource}</span>
          <svg
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-white dark:bg-crypto-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => handleChange(source.id, source.name)}
                className="flex items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <img
                  src={getSource(source.id).logo}
                  alt={source.name}
                  className="h-6 w-6 object-contain rounded-full mr-2"
                />
                <span>{source.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
