"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
        <TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}
