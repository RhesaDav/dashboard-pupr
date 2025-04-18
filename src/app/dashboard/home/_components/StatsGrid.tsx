"use client";

import { Activity, DollarSign, FileCheck, TrendingUp } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { formatRupiah } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { DashboardReport } from "../../../../actions/dashboard";

interface StatsGridProps {
  data: DashboardReport;
}

export function StatsGrid({ data }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Kontrak"
        value={data.totalContracts}
        icon={<FileCheck className="h-4 w-4 text-muted-foreground" />}
        footer={
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Aktif: {data.activeContracts}</span>
            <span>Selesai: {data.completedContracts}</span>
            <span className="text-red-500">Masalah: {data.problemContracts.length}</span>
          </div>
        }
      />

      <StatsCard
        title="Nilai Kontrak"
        value={formatRupiah(data.totalContractValue)}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        footer={<p className="text-xs text-muted-foreground mt-2">Total nilai semua kontrak</p>}
      />

      <StatsCard
        title="Progress Fisik"
        value={`${data.avgPhysicalProgress}%`}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        footer={
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${data.avgPhysicalProgress}%` }}
            />
          </div>
        }
      />

      <StatsCard
        title="Progress Keuangan"
        value={`${data.avgFinancialProgress}%`}
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        footer={
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <Progress value={data.avgFinancialProgress} />
          </div>
        }
      />
    </div>
  );
}