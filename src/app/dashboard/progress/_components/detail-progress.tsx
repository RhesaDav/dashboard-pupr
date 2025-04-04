"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatRupiah, generateWeeks } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Eye, Printer, Download } from "lucide-react";

interface ProgressItem {
  week: number;
  rencana: number;
  realisasi: number;
  deviasi: number;
}

interface MonthProgress {
  month: string;
  items: ProgressItem[];
}

interface ProgressDetailViewProps {
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

export default function ProgressDetailView({ contract }: ProgressDetailViewProps) {
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const contractId = String(params.id);

  const initialProgressData = useMemo(() => {
    if (contract.progress && contract.progress.length > 0) {
      const currentMonth = new Date().toLocaleString('id-ID', { month: 'long' });
      setExpandedMonths([currentMonth]);
      return contract.progress;
    }
    return generateWeeks(contract.tanggalKontrak, contract.masaPelaksanaan);
  }, [contract.tanggalKontrak, contract.masaPelaksanaan, contract.progress]);

  const calculateDeviasi = (rencana: number, realisasi: number) => {
    return realisasi - rencana;
  };

  const calculateMonthProgress = (items: ProgressItem[]) => {
    const totalRealisasi = items.reduce((sum, item) => sum + item.realisasi, 0);
    const totalRencana = items.reduce((sum, item) => sum + item.rencana, 0);
    return totalRencana > 0 ? (totalRealisasi / totalRencana) * 100 : 0;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implementasi download PDF
    console.log("Download PDF progress");
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl print:p-0 print:max-w-none">
      <Card className="shadow-md print:shadow-none">
        <CardHeader className="bg-primary/5 print:bg-white">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold">
                Progress Pelaksanaan Kontrak
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {contract.namaPaket}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrint}
                className="print:hidden"
              >
                <Printer className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleDownload}
                className="print:hidden"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="print:hidden"
              >
                Kembali
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg print:bg-white print:border">
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

          <Accordion
            type="multiple"
            value={expandedMonths}
            onValueChange={setExpandedMonths}
            className="space-y-4"
          >
            {initialProgressData.map((month, monthIndex) => {
              const monthProgress = calculateMonthProgress(month.items);
              
              return (
                <AccordionItem
                  key={`${month.month}-${monthIndex}`}
                  value={month.month}
                  className="border rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted/70">
                    <div className="flex items-center w-full">
                      <span className="font-medium flex-1 text-left">
                        {month.month}
                      </span>
                      <div className="flex items-center gap-4 mr-4">
                        <span className="text-sm text-muted-foreground">
                          Progress: {monthProgress.toFixed(1)}%
                        </span>
                        <Progress 
                          value={monthProgress} 
                          className="w-24 h-2" 
                        />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    <div className="space-y-4">
                      {month.items.map((week, weekIndex) => {
                        const deviasi = calculateDeviasi(
                          Number(week.rencana) || 0,
                          Number(week.realisasi) || 0
                        );

                        return (
                          <div 
                            key={`${month.month}-week-${week.week}`}
                            className="p-3 border rounded-lg"
                          >
                            <div className="font-medium mb-3">Minggu {week.week}</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Rencana (%)
                                </label>
                                <div className="p-2 rounded bg-muted/50">
                                  {week.rencana.toFixed(1)}%
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Realisasi (%)
                                </label>
                                <div className="p-2 rounded bg-muted/50">
                                  {week.realisasi.toFixed(1)}%
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Deviasi (%)
                                </label>
                                <div 
                                  className="p-2 rounded"
                                  style={{
                                    backgroundColor: deviasi < 0 ? '#fef2f2' : deviasi > 0 ? '#f0fdf4' : '#f8fafc',
                                    color: deviasi < 0 ? '#ef4444' : deviasi > 0 ? '#22c55e' : '#64748b'
                                  }}
                                >
                                  <Badge 
                                    variant={deviasi < 0 ? 'destructive' : deviasi > 0 ? 'default' : 'secondary'}
                                    className="w-full justify-center"
                                  >
                                    {deviasi.toFixed(1)}%
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}