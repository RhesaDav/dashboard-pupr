"use client"
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { formatRupiah, generateWeeks } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

interface ProgressItem {
  week: number;
  rencana: number;
  realisasi: number;
  deviasi: number;
}

interface ProgressDetailProps {
  contract: {
    namaPaket: string;
    nilaiKontrak: number;
    tanggalKontrak: string;
    masaPelaksanaan: number;
    volumeKontrak: number;
    satuanKontrak: string;
    endDate: string;
    progress: {
      month: string;
      items: ProgressItem[];
    }[];
  };
}

export default function ProgressDetailPage ({ contract }:ProgressDetailProps) {
  const params = useParams()
  console.log(params)
  const progressData = useMemo(
    () => generateWeeks(contract.tanggalKontrak, contract.masaPelaksanaan),
    [contract.tanggalKontrak, contract.masaPelaksanaan]
  );

  const updateProgress = async (contractId: string, month: string, week: number, field: string, value: any) => {
    try {
      await fetch(`/api/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId, month, week, field, value }),
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }  

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <Card className="shadow-md">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl font-semibold">Detail Kontrak</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Nama Paket</div>
            <div>: {contract.namaPaket}</div>
            
            <div className="font-medium">Nilai Kontrak</div>
            <div>: {formatRupiah(contract.nilaiKontrak)}</div>
            
            <div className="font-medium">Tanggal Kontrak</div>
            <div>: {contract.tanggalKontrak}</div>
            
            <div className="font-medium">Masa Pelaksanaan</div>
            <div>: {contract.masaPelaksanaan} Hari</div>
            
            <div className="font-medium">Volume Kontrak</div>
            <div>: {contract.volumeKontrak}</div>
            
            <div className="font-medium">Satuan Kontrak</div>
            <div>: {contract.satuanKontrak}</div>
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="text-lg font-semibold mb-4">Progress Kemajuan</h2>
          
          {progressData.map((month, monthIndex) => (
            <div key={monthIndex} className="mb-6">
              <Card className="bg-green-100/70">
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Progress Fisik (%)</h3>
                  <h4 className="font-medium mb-3">{month.month}</h4>
                  
                  {month.items.map((week, weekIndex) => (
                  <div key={weekIndex} className="mb-4">
                    <div className="font-medium mb-1">Minggu {week.week}</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-sm mb-1">Rencana</div>
                        <Input
                          type="number"
                          value={week.rencana}
                          onChange={(e) =>
                            updateProgress(String(params.id), month.month, week.week, "rencana", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <div className="text-sm mb-1">Realisasi</div>
                        <Input
                          type="number"
                          value={week.realisasi}
                          onChange={(e) =>
                            updateProgress(String(params.id), month.month, week.week, "realisasi", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <div className="text-sm mb-1">Deviasi</div>
                        <Input type="number" value={week.deviasi} readOnly />
                      </div>
                    </div>
                  </div>
                ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};