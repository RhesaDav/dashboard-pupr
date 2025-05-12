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
  Text,
} from "recharts";

interface ProgressTrendChartProps {
  data: any[];
  budgetYear: number | null;
}

export function ProgressTrendChart({ data, budgetYear }: ProgressTrendChartProps) {
  // Daftar bulan lengkap dengan singkatan 3 huruf
  const monthData = [
    { full: "Januari", short: "Jan" },
    { full: "Februari", short: "Feb" },
    { full: "Maret", short: "Mar" },
    { full: "April", short: "Apr" },
    { full: "Mei", short: "Mei" },
    { full: "Juni", short: "Jun" },
    { full: "Juli", short: "Jul" },
    { full: "Agustus", short: "Agu" },
    { full: "September", short: "Sep" },
    { full: "Oktober", short: "Okt" },
    { full: "November", short: "Nov" },
    { full: "Desember", short: "Des" },
  ];

  // Filter data untuk hanya menampilkan data dari tahun anggaran yang dipilih
  const filterDataByYear = (data: any[]) => {
    if (!budgetYear) return [];
    
    return data.filter(item => {
      const itemYear = parseInt(item.month.split(" ")[1]);
      return itemYear === budgetYear;
    });
  };

  const sortMonths = (data: any[]) => {
    return [...data].sort((a, b) => {
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");

      if (aYear !== bYear) {
        return parseInt(aYear) - parseInt(bYear);
      }
      return monthData.findIndex(m => m.full === aMonth) - 
             monthData.findIndex(m => m.full === bMonth);
    });
  };

  const completeMissingMonths = (data: any[]) => {
    if (!budgetYear || data.length === 0) return [];

    const sortedData = sortMonths(data);
    const result = [];
    
    // Hanya buat data untuk bulan-bulan dalam tahun anggaran yang dipilih
    for (const month of monthData) {
      const monthKey = `${month.full} ${budgetYear}`;
      const exists = sortedData.some(item => item.month === monthKey);
      result.push(exists 
        ? sortedData.find(item => item.month === monthKey)
        : { month: monthKey, value: 0 }
      );
    }

    return result;
  };

  // Filter data berdasarkan tahun anggaran terlebih dahulu, kemudian proses
  const filteredData = filterDataByYear(data);
  const processedData = completeMissingMonths(filteredData);

  // Komponen untuk menampilkan bulan singkat
  const renderShortMonthTick = ({ x, y, payload }: any) => {
    const monthFull = payload.value.split(" ")[0];
    const monthShort = monthData.find(m => m.full === monthFull)?.short || monthFull.substring(0, 3);
    
    return (
      <Text 
        x={x} 
        y={y} 
        textAnchor="middle" 
        verticalAnchor="start"
        fontSize={12}
        fill="#666"
      >
        {monthShort}
      </Text>
    );
  };

  // Komponen untuk menampilkan ketika tidak ada data
  const renderNoData = () => (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <p className="text-gray-500 text-lg">Tidak ada data tersedia</p>
      <p className="text-gray-400 text-sm">
        {budgetYear 
          ? `Tidak ada data untuk tahun ${budgetYear}` 
          : "Silakan pilih periode atau kontrak lain"}
      </p>
    </div>
  );

  return (
    <ChartCard
      title={`Tren Progress Fisik ${budgetYear ? `Tahun ${budgetYear}` : ""}`}
      icon={<Activity className="h-5 w-5 text-blue-500" />}
    >
      {!budgetYear || processedData.length === 0 ? (
        renderNoData()
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={processedData}
            margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={renderShortMonthTick}
              interval={0}
              height={40}
            />
            <YAxis 
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              width={40}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Progress"]}
              labelFormatter={(label) => {
                const [month, year] = label.split(" ");
                const monthShort = monthData.find(m => m.full === month)?.short || month.substring(0, 3);
                return `${monthShort} ${year}`;
              }}
              contentStyle={{
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6" 
              name="Progress Fisik"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}