"use client";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/actions/auth";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [budgetYear, setBudgetYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBudgetYearFromCookie = (): number | null => {
    if (typeof document === "undefined") return null;

    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith("budgetYear="))
      ?.split("=")[1];

    return value ? parseInt(value, 10) : null;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();

        if (!response) {
          throw new Error("Failed to fetch user");
        }

        const budgetYear = getBudgetYearFromCookie();

        if (!budgetYear) {
          throw new Error("Budget year not found")
        }

        setUser(response);
        setBudgetYear(budgetYear);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, budgetYear, loading, error };
}
