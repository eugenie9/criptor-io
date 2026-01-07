import React from "react";

export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full py-4 md:py-8 lg:py-12 ${className}`}>
      {children}
    </div>
  );
}
