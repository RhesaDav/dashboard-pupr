"use client";

import { Activity } from "lucide-react";
import { ChartCard } from "./ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressTrendChartProps {
  data: any[];
}

export function ProgressTrendChart({ data }: ProgressTrendChartProps) {
  const sortMonths = (data: any[]) => {
    const monthOrder = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return [...data].sort((a, b) => {
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");

      if (aYear !== bYear) {
        return parseInt(aYear) - parseInt(bYear);
      }

      return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
    });
  };

  const completeMissingMonths = (data: any[]) => {
    if (data.length === 0) return [];

    const sortedData = sortMonths(data);
    const result = [];
    const monthOrder = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const firstYear = parseInt(sortedData[0].month.split(" ")[1]);
    const lastYear = parseInt(
      sortedData[sortedData.length - 1].month.split(" ")[1]
    );

    for (let year = firstYear; year <= lastYear; year++) {
      for (const month of monthOrder) {
        const exists = sortedData.some(
          (item) => item.month === `${month} ${year}`
        );

        if (!exists) {
          result.push({
            month: `${month} ${year}`,
            value: 0,
          });
        } else {
          const existingData = sortedData.find(
            (item) => item.month === `${month} ${year}`
          );
          result.push(existingData);
        }
      }
    }

    return result;
  };

  const processedData = completeMissingMonths(data);

  return (
    <ChartCard
      title="Tren Progress Fisik"
      icon={<Activity className="h-5 w-5 text-blue-500" />}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => {
              return value.split(" ")[0];
            }}
          />
          <YAxis unit="%" />
          <Tooltip
            formatter={(value) => [`${value}%`, "Progress"]}
            labelFormatter={(label) => label}
          />
          <Bar dataKey="value" fill="#3B82F6" name="Progress Fisik" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
