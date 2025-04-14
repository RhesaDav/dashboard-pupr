"use client";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, LineChart, Pencil } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Legend,
} from "recharts";

interface ProgressItem {
  week: number;
  rencana: number;
  realisasi: number;
  deviasi: number;
  startDate: string | null;
  endDate: string | null;
}

interface MonthProgress {
  month: string;
  items: ProgressItem[];
}

interface ViewProgressProps {
  contract: {
    id: string;
    namaPaket: string;
    nilaiKontrak: number;
    tanggalKontrak: string;
    masaPelaksanaan: number;
    volumeKontrak: number | string;
    satuanKontrak: string;
    endDate: string;
    progress: MonthProgress[];
  };
}

const sortMonthsChronologically = (months: MonthProgress[]) => {
  const monthOrder = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  return [...months].sort((a, b) => {
    const [monthA, yearA] = a.month.split(" ");
    const [monthB, yearB] = b.month.split(" ");
    
    if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  });
};

export default function ViewProgressPage({ contract }: ViewProgressProps) {
  const [expandedMonths, setExpandedMonths] = React.useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const contractId = String(params.id);

  const sortedProgressData = useMemo(() => {
    return contract.progress?.length ? sortMonthsChronologically(contract.progress) : [];
  }, [contract.progress]);

  const calculateDeviasi = (rencana: number, realisasi: number) => realisasi - rencana;

  const calculateMonthProgress = (items: ProgressItem[]) => {
    const totalRealisasi = items.reduce((sum, item) => sum + item.realisasi, 0);
    const totalRencana = items.reduce((sum, item) => sum + item.rencana, 0);
    return totalRencana > 0 ? (totalRealisasi / totalRencana) * 100 : 0;
  };

  const calculateTotalProgress = () => {
    if (!sortedProgressData.length) return 0;
    const lastMonth = sortedProgressData[sortedProgressData.length - 1];
    if (!lastMonth.items.length) return 0;
    return Math.min(lastMonth.items[lastMonth.items.length - 1].realisasi, 100);
  };

  const chartData = useMemo(() => {
    return sortedProgressData.flatMap(month => 
      month.items.map(item => ({
        name: `Minggu ${item.week}`,
        rencana: item.rencana,
        realisasi: item.realisasi,
        deviasi: item.deviasi,
        dateRange: `${item.startDate} - ${item.endDate}`
      }))
    );
  }, [sortedProgressData]);

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                Detail Progress Pelaksanaan
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {contract.namaPaket}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/dashboard/progress/${contractId}/edit`)}
              className="flex items-center gap-1"
            >
              <Pencil className="h-4 w-4" />
              Edit Progress
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Contract Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <div className="flex">
                <span className="w-36 font-medium">Nilai Kontrak</span>
                <span>: {formatRupiah(contract.nilaiKontrak)}</span>
              </div>
              <div className="flex">
                <span className="w-36 font-medium">Tanggal Kontrak</span>
                <span>: {contract.tanggalKontrak}</span>
              </div>
              <div className="flex">
                <span className="w-36 font-medium">Masa Pelaksanaan</span>
                <span>: {contract.masaPelaksanaan} Hari</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <span className="w-36 font-medium">Volume</span>
                <span>: {contract.volumeKontrak} {contract.satuanKontrak}</span>
              </div>
              <div className="flex">
                <span className="w-36 font-medium">Target Selesai</span>
                <span>: {contract.endDate}</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <h2 className="text-lg font-semibold mb-4">Progress Fisik</h2>

          {/* Total Progress */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-blue-900">
                Total Progress Keseluruhan:
              </div>
              <div className="flex items-center gap-4">
                <span className="text-blue-700 font-medium">
                  {calculateTotalProgress().toFixed(1)}%
                </span>
                <Progress
                  value={calculateTotalProgress()}
                  className="w-48 h-2 bg-blue-100"
                />
              </div>
            </div>
          </div>
          
          {/* Progress Chart */}
          {chartData.length > 0 && (
            <div className="mb-8 p-4 bg-white border rounded-lg">
              <h3 className="text-md font-medium mb-4 flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Grafik Progress
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tickCount={6}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rencana"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="realisasi"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Tooltip using shadcn */}
              <TooltipProvider>
                <div className="flex justify-center mt-4 gap-6">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">Rencana</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Progress yang direncanakan</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                      <span className="text-sm">Realisasi</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Progress aktual yang dicapai</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          )}

          {/* Monthly Progress */}
          <Accordion
            type="multiple"
            value={expandedMonths}
            onValueChange={setExpandedMonths}
            className="space-y-4"
          >
            {sortedProgressData.map((month, monthIndex) => (
              <AccordionItem
                key={monthIndex}
                value={month.month}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted/70">
                  <div className="flex items-center w-full">
                    <span className="font-medium flex-1 text-left">
                      {month.month}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <div className="space-y-4">
                    {month.items.map((week, weekIndex) => {
                      const deviasi = calculateDeviasi(week.rencana, week.realisasi);
                      return (
                        <div key={`week-${weekIndex}`} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <div className="font-medium flex items-center">
                              Minggu {week.week}
                              {week.startDate && week.endDate && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="ml-2 flex items-center text-sm text-muted-foreground">
                                      <Calendar className="h-3.5 w-3.5 mr-1" />
                                      <span>{week.startDate} - {week.endDate}</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Periode pelaksanaan minggu ini</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Rencana (%)
                              </label>
                              <div className="bg-muted p-2 rounded border">
                                {week.rencana.toFixed(1)}%
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Realisasi (%)
                              </label>
                              <div className="bg-muted p-2 rounded border">
                                {week.realisasi.toFixed(1)}%
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Deviasi (%)
                              </label>
                              <div 
                                className="bg-muted p-2 rounded border"
                                style={{
                                  color: deviasi < 0 ? "#ef4444" : deviasi > 0 ? "#22c55e" : "#64748b",
                                }}
                              >
                                {deviasi.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 bg-muted/50 px-6 py-4">
          <Button variant="outline" onClick={() => router.back()}>
            Kembali
          </Button>
          <Button onClick={() => router.push(`/dashboard/progress/${contractId}/edit`)}>
            Edit Progress
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}