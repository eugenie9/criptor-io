import React from "react";

export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`container mx-auto px-4 md:px-8 lg:px-12 py-16 ${className}`}
    >
      {children}
    </div>
  );
}
