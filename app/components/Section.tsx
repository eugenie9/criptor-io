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
      className={`container mx-auto px-4 xl:px-0 py-4 md:py-8 lg:py-16 ${className}`}
    >
      {children}
    </div>
  );
}
