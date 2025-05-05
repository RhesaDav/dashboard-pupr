"use client";
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
import { FinancialProgressCreateSchema } from "@/schemas/financial-progress.schema";
import { upsertFinancialProgress } from "@/actions/financial-progress";
import { useQuery } from "@tanstack/react-query";
import { getContractById } from "@/actions/contract";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function FinancialProgressForm() {
  const params = useParams();
  const contractId = params.id as string;
  const {
    data: contract,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => getContractById(contractId),
  });

  const form = useForm<z.infer<typeof FinancialProgressCreateSchema>>({
    resolver: zodResolver(
      FinancialProgressCreateSchema.refine(
        (data) => {
          const total =
            (data.uangMuka || 0) +
            (data.termin1 || 0) +
            (data.termin2 || 0) +
            (data.termin3 || 0) +
            (data.termin4 || 0);

          return total <= 100;
        },
        {
          message: "Total uang muka dan termin tidak boleh lebih dari 100%",
          path: ["termin4"],
        }
      )
    ),
    defaultValues: {
      contractId: contractId,
      uangMuka: contract?.data.financialProgress?.uangMuka || 0,
      termin1: contract?.data.financialProgress?.termin1 || 0,
      termin2: contract?.data.financialProgress?.termin2 || 0,
      termin3: contract?.data.financialProgress?.termin3 || 0,
      termin4: contract?.data.financialProgress?.termin4 || 0,
    },
    mode: "onBlur"
  });

  const uangMuka = form.watch("uangMuka") || 0;
  const termin1 = form.watch("termin1") || 0;
  const termin2 = form.watch("termin2") || 0;
  const termin3 = form.watch("termin3") || 0;
  const termin4 = form.watch("termin4") || 0;

  const totalProgress = uangMuka + termin1 + termin2 + termin3 + termin4;
  const totalPayment =
    ((contract?.data.nilaiKontrak || 0) * totalProgress) / 100;

  const onSubmit = async (
    data: z.infer<typeof FinancialProgressCreateSchema>
  ) => {
    try {
      await upsertFinancialProgress({
        ...data,
        contractId: contractId,
      });
      toast.success("Progress finansial berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan progress");
    }
  };

  console.log(form.formState.errors);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              Gagal memuat data kontrak: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              {totalProgress > 100 && (
      <p className="text-sm text-destructive mt-1">
        Melebihi 100%
      </p>
    )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Total Pembayaran</Label>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalPayment)}
                </p>
              </div>
              <div>
                <Label>Nilai Kontrak</Label>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(contract?.data.nilaiKontrak || 0)}
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
                      currency: "IDR",
                    }).format(
                      ((contract?.data.nilaiKontrak || 0) *
                        (form.watch("uangMuka") || 0)) /
                        100
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

                return (
                  <div
                    key={termin}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                  >
                    <div className="space-y-2">
                      <Label>Termin {termin}</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          {...form.register(fieldName as any, {
                            valueAsNumber: true,
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
                          currency: "IDR",
                        }).format(
                          ((contract?.data.nilaiKontrak || 0) *
                            form.watch(fieldName as any)) /
                            100
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
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Simpan Progress</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
