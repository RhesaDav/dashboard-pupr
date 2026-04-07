"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export function useCurrentUser() {
  const { data, isPending, error } = useSession();
  const [budgetYear, setBudgetYear] = useState<number | null>(null);

  const getBudgetYearFromCookie = (): number | null => {
    if (typeof document === "undefined") return null;

    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith("budgetYear="))
      ?.split("=")[1];

    return value ? parseInt(value, 10) : null;
  };

  useEffect(() => {
    setBudgetYear(getBudgetYearFromCookie());
  }, []);

  return { 
    user: data?.user || null, 
    budgetYear, 
    loading: isPending, 
    error: error?.message || null 
  };
}
