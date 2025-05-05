"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Percent, CircleDollarSign } from "lucide-react";
import { FinancialProgress } from "@prisma/client";
import { Label } from "@/components/ui/label";

export function FinancialProgressDetail({
  contract,
}: {
  contract: {
    id: string;
    nilaiKontrak: number;
    financialProgress?: FinancialProgress | null;
  };
}) {
  const defaultProgress = {
    uangMuka: 0,
    termin1: 0,
    termin2: 0,
    termin3: 0,
    termin4: 0,
  };

  const progress = contract.financialProgress || defaultProgress;

  const totalProgress =
    (progress.uangMuka ?? 0) +
    (progress.termin1 ?? 0) +
    (progress.termin2 ?? 0) +
    (progress.termin3 ?? 0) +
    (progress.termin4 ?? 0);

  const totalPayment = (contract.nilaiKontrak * totalProgress) / 100;

  const getProgressValue = (value: number | null | undefined): number => {
    return value ?? 0;
  };

  const paymentItems = [
    { label: "Uang Muka", value: getProgressValue(progress.uangMuka) },
    { label: "Termin 1", value: getProgressValue(progress.termin1) },
    { label: "Termin 2", value: getProgressValue(progress.termin2) },
    { label: "Termin 3", value: getProgressValue(progress.termin3) },
    { label: "Termin 4", value: getProgressValue(progress.termin4) },
  ];

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
                  }).format(contract.nilaiKontrak)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Progress Finansial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Uang Muka */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <Label>Uang Muka</Label>
                <p className="text-sm text-muted-foreground">
                  {getProgressValue(progress.uangMuka)}%
                </p>
              </div>
              <div className="space-y-1">
                <Label>Nilai</Label>
                <p className="text-sm">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(
                    (contract.nilaiKontrak *
                      getProgressValue(progress.uangMuka)) /
                      100
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <Label>Progress</Label>
                <Progress
                  value={getProgressValue(progress.uangMuka)}
                  className="h-2"
                />
              </div>
            </div>

            {/* Termin 1-4 */}
            {[1, 2, 3, 4].map((termin) => {
              const fieldName = `termin${termin}` as keyof typeof progress;
              const progressValue = getProgressValue(progress[fieldName]);

              return (
                <div
                  key={termin}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                >
                  <div className="space-y-1">
                    <Label>Termin {termin}</Label>
                    <p className="text-sm text-muted-foreground">
                      {progressValue}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label>Nilai</Label>
                    <p className="text-sm">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format((contract.nilaiKontrak * progressValue) / 100)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label>Progress</Label>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
