"use client"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DashboardReport, getDashboardReport } from "../../../../actions/dashboard";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardError } from "./DashboardError";
import { DashboardHeader } from "./DashboardHeader";
import { LocationCombobox } from "../../../../components/location-combobox";
import { StatsGrid } from "./StatsGrid";
import { ProgressTrendChart } from "./ProgressTrendChart";
import { LocationDistributionChart } from "./LocationDistributionChart";
import { RecentContractsTable } from "./RecentContractsTable";
import { ProblemContractsList } from "./ProblemContractsList";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { getDistrik, getDistrikDetail } from "@/actions/wilayah";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardReport | null>(null);
  const {user, loading: userLoading} = useCurrentUser()
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({
    greeting: '',
    currentTime: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const report = await getDashboardReport();
        setData(report);
        
        const now = new Date();
        const hour = now.getHours();
        const greeting = 
          hour < 12 ? 'Pagi' : 
          hour < 15 ? 'Siang' : 
          hour < 19 ? 'Sore' : 'Malam';
        
        const currentTime = format(now, 'EEEE, d MMMM yyyy HH:mm');
        
        setTime({ greeting, currentTime });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return <DashboardError />;
  }

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader 
        greeting={time.greeting}
        currentTime={time.currentTime}
        user={user}
      />

      {/* <LocationCombobox onSelectionChange={(data) => console.log(data)}/> */}

      <StatsGrid data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressTrendChart data={data.physicalProgressTrend} />
        <LocationDistributionChart data={data.locationDistribution} />
      </div>

      <RecentContractsTable contracts={data.recentContracts} />

      <ProblemContractsList contracts={data.problemContracts} />
    </div>
  );
}
