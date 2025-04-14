"use client";

import { Activity } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressTrendChartProps {
  data: any[];
}

export function ProgressTrendChart({ data }: ProgressTrendChartProps) {
  return (
    <ChartCard
      title="Tren Progress Fisik"
      icon={<Activity className="h-5 w-5 text-blue-500" />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis unit="%" />
          <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
          <Bar dataKey="value" fill="#3B82F6" name="Progress Fisik" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
