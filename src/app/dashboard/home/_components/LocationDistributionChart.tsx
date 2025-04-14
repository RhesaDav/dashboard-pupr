"use client";

import { MapPin } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LocationDistributionChartProps {
  data: any[];
}

export function LocationDistributionChart({ data }: LocationDistributionChartProps) {
  return (
    <ChartCard
      title="Distribusi Lokasi"
      icon={<MapPin className="h-5 w-5 text-orange-500" />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data.slice(0, 5)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="location" type="category" width={80} />
          <Tooltip formatter={(value) => [value, 'Kontrak']} />
          <Bar dataKey="count" fill="#F59E0B" name="Jumlah Kontrak" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}