"use client";

import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar isOpen={isSidebarOpen} />

       {isSidebarOpen && (
         <div
           className="fixed inset-0 z-20 bg-black/30 md:hidden"
           onClick={toggleSidebar}
         />
       )}


      <div
        className={cn(
            "flex flex-col flex-1 transition-all duration-300 ease-in-out",
            // "md:pl-64" // Beri padding kiri di layar medium ke atas
        )}
      >
        <Header onToggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-6 flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;