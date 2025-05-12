"use client";

import { MapPin } from "lucide-react";
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

interface LocationDistributionChartProps {
  data: any[];
}

export function LocationDistributionChart({ data }: LocationDistributionChartProps) {
  // Komponen untuk menampilkan ketika tidak ada data
  const renderNoData = () => (
    <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
      <MapPin className="h-12 w-12 text-gray-400 mb-2" />
      <p className="text-gray-500 text-lg font-medium">Tidak ada data lokasi</p>
      <p className="text-gray-400 text-sm">
        Data distribusi lokasi kontrak tidak tersedia
      </p>
    </div>
  );

  return (
    <ChartCard
      title="Distribusi Lokasi"
      icon={<MapPin className="h-5 w-5 text-orange-500" />}
    >
      {data.length === 0 ? (
        renderNoData()
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            layout="vertical"
            data={data.slice(0, 5)}
            margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tickFormatter={(value) => `${value}`}
            />
            <YAxis 
              dataKey="location" 
              type="category" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, 'Kontrak']}
              contentStyle={{
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#F59E0B" 
              name="Jumlah Kontrak"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}