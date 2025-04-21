"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Percent, CircleDollarSign } from "lucide-react";
import { FinancialProgress } from "@prisma/client";

// Schema validasi
const FinancialProgressSchema = z.object({
  uangMuka: z.number().min(0).max(100),
  termin1: z.number().min(0).max(100),
  termin2: z.number().min(0).max(100),
  termin3: z.number().min(0).max(100),
  termin4: z.number().min(0).max(100),
}).refine(data => {
  const total = data.uangMuka + data.termin1 + data.termin2 + data.termin3 + data.termin4;
  return total <= 100;
}, {
  message: "Total progress tidak boleh melebihi 100%",
  path: ["termin4"]
});

export function FinancialProgressForm({ 
  contract,
  onSave 
}: {
  contract: {
    id: string;
    nilaiKontrak: number;
    financialProgress?: FinancialProgress | null;
  };
  onSave: (data: z.infer<typeof FinancialProgressSchema>) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof FinancialProgressSchema>>({
    resolver: zodResolver(FinancialProgressSchema),
    defaultValues: {
      uangMuka: contract.financialProgress?.uangMuka || 0,
      termin1: contract.financialProgress?.termin1 || 0,
      termin2: contract.financialProgress?.termin2 || 0,
      termin3: contract.financialProgress?.termin3 || 0,
      termin4: contract.financialProgress?.termin4 || 0,
    }
  });

  const totalProgress = form.watch("uangMuka") + 
    form.watch("termin1") + 
    form.watch("termin2") + 
    form.watch("termin3") + 
    form.watch("termin4");

  const totalPayment = (contract.nilaiKontrak * totalProgress) / 100;

  const onSubmit = async (data: z.infer<typeof FinancialProgressSchema>) => {
    try {
      await onSave(data);
      toast.success("Progress finansial berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan progress");
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5" />
            Ringkasan Finansial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Total Progress</Label>
              <Progress value={totalProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                {totalProgress.toFixed(1)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Total Pembayaran</Label>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  }).format(totalPayment)}
                </p>
              </div>
              <div>
                <Label>Nilai Kontrak</Label>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  }).format(contract.nilaiKontrak)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Input Progress Finansial</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Uang Muka */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label>Uang Muka</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      {...form.register("uangMuka", { valueAsNumber: true })}
                    />
                    <div className="absolute right-3 top-2.5 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nilai</Label>
                  <p className="text-sm">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR"
                    }).format(
                      (contract.nilaiKontrak * form.watch("uangMuka")) / 100
                    )}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Progress</Label>
                  <Progress value={form.watch("uangMuka")} className="h-2" />
                </div>
              </div>

              {/* Termin 1-4 */}
              {[1, 2, 3, 4].map((termin) => {
                const fieldName = `termin${termin}` as const;

                return(
                <div key={termin} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Termin {termin}</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        {...form.register(fieldName as any, { 
                          valueAsNumber: true 
                        })}
                      />
                      <div className="absolute right-3 top-2.5 text-muted-foreground">
                        <Percent className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Nilai</Label>
                    <p className="text-sm">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR"
                      }).format(
                        (contract.nilaiKontrak * 
                         form.watch(fieldName as any)) / 100
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Progress</Label>
                    <Progress 
                      value={form.watch(fieldName as any)} 
                      className="h-2" 
                    />
                  </div>
                </div>
              )})}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Simpan Progress</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg divide-y">
            {[
              { label: "Uang Muka", value: form.watch("uangMuka") },
              { label: "Termin 1", value: form.watch("termin1") },
              { label: "Termin 2", value: form.watch("termin2") },
              { label: "Termin 3", value: form.watch("termin3") },
              { label: "Termin 4", value: form.watch("termin4") },
            ].map((item, index) => (
              <div key={index} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR"
                    }).format(
                      (contract.nilaiKontrak * item.value) / 100
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={item.value} 
                    className="h-2 w-24" 
                  />
                  <span className="text-sm font-medium">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}