import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SubkegiatanDistributionProps {
  data: {
    subkegiatan: string;
    totalContracts: number;
    completedContracts: number;
    ongoingContracts: number;
    problemContracts: number;
    totalPaguAnggaran: number;
    totalNilaiKontrak: number;
    totalRealisasiKeuangan: number;
    avgProgressFisik: number;
    avgProgressKeuangan: number;
  }[];
}

export function SubkegiatanDistribution({ data }: SubkegiatanDistributionProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-xl font-bold mb-2">Rekapan Sub Kegiatan</h1>
      
      <Accordion type="single" collapsible >
          <Card className="mb-2 overflow-hidden">
        {data.map((item) => (
            <AccordionItem key={item.subkegiatan} value={item.subkegiatan} className="border-none">
              <AccordionTrigger className="px-4 py-3 bg-gray-100 hover:bg-gray-200 hover:no-underline">
                <div className="flex justify-between items-center w-full">
                  <div className="font-medium text-left">{item.subkegiatan}</div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-blue-400 text-white hover:bg-blue-500">
                      {item.totalContracts} Paket
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span>Progress : </span>
                      <span className="text-blue-600 font-medium">{item.avgProgressFisik.toFixed(2)}%</span>
                      <div className="w-32">
                        <Progress value={item.avgProgressFisik} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="bg-white p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="mb-2">
                      {item.completedContracts} / {item.totalContracts} Paket Selesai 
                      ( {item.ongoingContracts} ON PROGRESS | {item.problemContracts} NO PROGRESS )
                    </div>
                    <div className="flex flex-col">
                      <div>Pagu Anggaran : {formatRupiah(item.totalPaguAnggaran)}</div>
                      <div>Nilai Terkontrak : {formatRupiah(item.totalNilaiKontrak)}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="mb-2">Realisasi Keuangan : {formatRupiah(item.totalRealisasiKeuangan)}</div>
                    <div className="flex gap-8">
                      <div className="flex flex-col items-center">
                        <div>Progress Fisik</div>
                        <div className="text-xl font-bold">{item.avgProgressFisik.toFixed(2)}%</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div>Progress Keuangan</div>
                        <div className="text-xl font-bold">{item.avgProgressKeuangan.toFixed(2)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
        ))}
          </Card>
      </Accordion>
    </div>
  );
}