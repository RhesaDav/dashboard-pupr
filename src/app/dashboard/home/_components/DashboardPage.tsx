"use client";
import { format } from "date-fns";
import { id as indonesianLocale } from 'date-fns/locale';
import { useEffect, useState } from "react";
import {
  DashboardReport,
  getDashboardReport,
} from "../../../../actions/dashboard";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardError } from "./DashboardError";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { ProgressTrendChart } from "./ProgressTrendChart";
import { LocationDistributionChart } from "./LocationDistributionChart";
import { RecentContractsTable } from "./RecentContractsTable";
import { ProblemContractsList } from "./ProblemContractsList";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { getDistrik } from "@/actions/wilayah";
import { SubkegiatanDistribution } from "./SubkegiatanDistribution";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { user, loading: userLoading, budgetYear } = useCurrentUser();
  const [time, setTime] = useState({
    greeting: "",
    currentTime: "",
  });

  const {
    data: dashboardData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const report = await getDashboardReport();
      return report;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const greeting =
      hour < 12 ? "Pagi" : hour < 15 ? "Siang" : hour < 19 ? "Sore" : "Malam";

    const currentTime = format(now, "EEEE, d MMMM yyyy HH:mm", { locale: indonesianLocale });

    setTime({ greeting, currentTime });

    refetch();
  }, [refetch]);

  const loading = isLoading || userLoading;

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (isError || !dashboardData) {
    return <DashboardError />;
  }

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        greeting={time.greeting}
        currentTime={time.currentTime}
        user={user}
      />

      <StatsGrid data={dashboardData} />

      <SubkegiatanDistribution data={dashboardData.subkegiatanDistribution} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressTrendChart budgetYear={budgetYear} data={dashboardData.physicalProgressTrend} />
        <LocationDistributionChart data={dashboardData.locationDistribution} />
      </div>

      <RecentContractsTable contracts={dashboardData.recentContracts} />

      {dashboardData.problemContracts.length >= 1 && (
        <ProblemContractsList contracts={dashboardData.problemContracts} />
      )}
    </div>
  );
}
