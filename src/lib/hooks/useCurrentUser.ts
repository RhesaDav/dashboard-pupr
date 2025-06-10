"use client";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/actions/auth";
import { OfflineUserData, offlineUserStorage } from "../offline-user-storage";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [budgetYear, setBudgetYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState<"SYNCED" | "PENDING" | "ERROR">(
    "SYNCED"
  );

  const getBudgetYearFromCookie = (): number | null => {
    if (typeof document === "undefined") return null;

    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith("budgetYear="))
      ?.split("=")[1];

    return value ? parseInt(value, 10) : null;
  };

  const loadFromOfflineStorage = async (): Promise<boolean> => {
    try {
      const offlineData = await offlineUserStorage.getUserData();

      if (offlineData) {
        setUser(offlineData.user);
        setBudgetYear(offlineData.budgetYear);
        setSyncStatus(offlineData.syncStatus);
        console.log("📱 Loaded user data from offline storage");
        return true;
      }

      return false;
    } catch (error) {
      console.error("❌ Failed to load from offline storage:", error);
      return false;
    }
  };

  const fetchUserFromServer = async (): Promise<void> => {
    if (!navigator.onLine) {
      console.log("📴 Offline: Cannot fetch user data");
      return;
    }

    try {
      console.log("🌐 Fetching user data from server...");
      const response = await getCurrentUser();

      if (!response) {
        throw new Error("Failed to fetch user");
      }

      const budgetYear = getBudgetYearFromCookie();

      if (!budgetYear) {
        throw new Error("Budget year not found");
      }

      const userData: OfflineUserData = {
        user: response,
        budgetYear,
        lastSynced: new Date().toISOString(),
        syncStatus: "SYNCED",
      };

      await offlineUserStorage.saveUserData(userData);

      setUser(response);
      setBudgetYear(budgetYear);
      setSyncStatus("SYNCED");
      setError(null);

      console.log("✅ User data fetched and cached");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setSyncStatus("ERROR");

      await offlineUserStorage.updateSyncStatus("ERROR");

      console.error("❌ Failed to fetch user data:", errorMessage);
    }
  };

  const refreshUserData = async (): Promise<void> => {
    if (!navigator.onLine) {
      console.log("📴 Offline: Cannot refresh user data");
      return;
    }

    try {
      setLoading(true);
      await fetchUserFromServer();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);

        const hasOfflineData = await loadFromOfflineStorage();

        if (hasOfflineData) {
          setLoading(false);

          if (navigator.onLine) {
            try {
              await fetchUserFromServer();
            } catch (error) {
              console.log("🔄 Using offline data, server sync failed");
            }
          }
        } else {
          if (navigator.onLine) {
            await fetchUserFromServer();
          } else {
            throw new Error("No cached data available and device is offline");
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        setSyncStatus("ERROR");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();

    const handleOnline = () => {
      setIsOnline(true);
      console.log("📡 Device is online");

      if (syncStatus === "PENDING" || syncStatus === "ERROR") {
        refreshUserData();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("📴 Device is offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [syncStatus]);  // Add syncStatus to dependency array to re-check sync on status change

  const logout = async (): Promise<void> => {
    try {
      await offlineUserStorage.clearUserData();

      setUser(null);
      setBudgetYear(null);
      setSyncStatus("SYNCED");
      setError(null);

      console.log("👋 User logged out and data cleared");
    } catch (error) {
      console.error("❌ Failed to logout:", error);
    }
  };

  return {
    user,
    budgetYear,
    loading,
    error,
    isOnline,
    syncStatus,
    refreshUserData,
    logout,
  };
}
