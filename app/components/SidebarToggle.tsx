"use client";

interface SidebarToggleProps {
  onClick: () => void;
}

export default function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle sidebar"
    >
      <svg
        className="h-6 w-6 text-gray-700 dark:text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
