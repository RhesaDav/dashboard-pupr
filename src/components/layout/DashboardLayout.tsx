"use client";
import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";
import { UserSyncStatus } from "../user-sync-status";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { Loader2, AlertCircle, RefreshCw, LogOut } from "lucide-react";
import Image from "next/image";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { loading, error, logout, isOnline, user } = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isOnline && error?.includes("offline")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto p-6">
          <div className="mb-2">
            <Image
              src="/img/logo-bina-marga.svg"
              alt="Logo Bina Marga"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Mode Offline</h3>
            <p className="text-sm text-muted-foreground">
              Anda sedang offline. Beberapa fitur mungkin terbatas.
            </p>
            {error && (
              <p className="text-sm text-muted-foreground">{error}</p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Coba Lagi</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo Bina Marga */}
          <div className="mb-4">
            <Image
              src="/img/logo-bina-marga.svg"
              alt="Logo Bina Marga"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          
          <div className="text-center">
            <h3 className="text-lg font-semibold">Memuat Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Mohon tunggu sebentar, kami sedang menyiapkan ruang kerja Anda...
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
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto p-6">
          {/* Logo Bina Marga */}
          <div className="mb-2">
            <Image
              src="/img/logo-bina-marga.svg"
              alt="Logo Bina Marga"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Terjadi Kesalahan</h3>
            <p className="text-sm text-muted-foreground">
              {error || "Tidak dapat memuat dashboard. Silakan coba lagi."}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Coba Lagi</span>
            </button>
            <button
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors border"
            >
              <LogOut className="h-4 w-4" />
              <span>Masuk Ulang</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Normal Dashboard State
  return (
    <div
      className={cn(
        "flex flex-col flex-1 transition-all duration-300 ease-in-out",
        "md:pl-64"
      )}
    >
      <Sidebar user={user} isOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <Header user={user} isOnline={isOnline} onToggleSidebar={toggleSidebar} />
      {/* <UserSyncStatus /> */}
      <main className="p-4 md:p-6 flex-grow overflow-y-auto">
        {error ? <ErrorContent /> : children}
      </main>
    </div>
  );
};

export default DashboardLayout;