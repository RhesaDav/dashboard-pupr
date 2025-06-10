"use client";
import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";
import { UserSyncStatus } from "../user-sync-status";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { Loader2, AlertCircle, RefreshCw, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { loading, error,logout } = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Loading Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we set up your workspace...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  const ErrorContent = () => {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center space-y-4 max-w-md mx-auto p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-sm text-muted-foreground">
              {error || "Unable to load the dashboard. Please try again."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => {
                logout()
                window.location.href = '/login';
              }}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors border"
            >
              <LogOut className="h-4 w-4" />
              <span>Re-login</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal Dashboard State
  return (
    <div
      className={cn(
        "flex flex-col flex-1 transition-all duration-300 ease-in-out",
        "md:pl-64"
      )}
    >
      <Sidebar isOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <Header onToggleSidebar={toggleSidebar} />
      {/* <UserSyncStatus /> */}
      <main className="p-4 md:p-6 flex-grow overflow-y-auto">
        {error? <ErrorContent/> : children}
      </main>
    </div>
  );
};

export default DashboardLayout;