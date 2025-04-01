"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatRupiah, generateWeeks } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateMonthlyProgress } from "@/actions/progress";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

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

interface ProgressDetailProps {
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

interface FormValues {
  months: {
    month: string;
    items: {
      week: number;
      rencana: number;
      realisasi: number;
      deviasi: number;
    }[];
  }[];
}

export default function ProgressDetailPage({ contract }: ProgressDetailProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const contractId = String(params.id);

  const initialProgressData = useMemo(() => {
    if (contract.progress && contract.progress.length > 0) {
      // Initialize expanded months with the current month
      const currentMonth = new Date().toLocaleString('id-ID', { month: 'long' });
      setExpandedMonths([currentMonth]);
      return contract.progress;
    }
    return generateWeeks(contract.tanggalKontrak, contract.masaPelaksanaan);
  }, [contract.tanggalKontrak, contract.masaPelaksanaan, contract.progress]);

  const methods = useForm<FormValues>({
    defaultValues: {
      months: initialProgressData,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const { fields: monthFields } = useFieldArray({
    control,
    name: "months",
  });

  const calculateDeviasi = (rencana: number, realisasi: number) => {
    return realisasi - rencana;
  };

  const calculateMonthProgress = (items: ProgressItem[]) => {
    const totalRealisasi = items.reduce((sum, item) => sum + item.realisasi, 0);
    const totalRencana = items.reduce((sum, item) => sum + item.rencana, 0);
    return totalRencana > 0 ? (totalRealisasi / totalRencana) * 100 : 0;
  };

  const formValues = watch();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      for (const month of data.months) {
        const monthEntries = month.items.map(item => ({
          week: item.week,
          rencana: Number(item.rencana),
          realisasi: Number(item.realisasi),
        }));

        await updateMonthlyProgress(
          contractId,
          month.month,
          monthEntries
        );
      }
      
      toast.success("Progress berhasil disimpan");
      router.refresh();
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Gagal menyimpan progress");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="shadow-md">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-xl font-semibold">
                Progress Pelaksanaan Kontrak
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {contract.namaPaket}
              </p>
            </CardHeader>
            
            <CardContent className="pt-6">
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

              <Accordion
                type="multiple"
                value={expandedMonths}
                onValueChange={setExpandedMonths}
                className="space-y-4"
              >
                {monthFields.map((monthField, monthIndex) => {
                  const monthProgress = calculateMonthProgress(formValues.months[monthIndex].items);
                  
                  return (
                    <AccordionItem
                      key={monthField.id}
                      value={monthField.month}
                      className="border rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted/70">
                        <div className="flex items-center w-full">
                          <span className="font-medium flex-1 text-left">
                            {formValues.months[monthIndex].month}
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
                          {formValues.months[monthIndex].items.map((week, weekIndex) => {
                            const deviasi = calculateDeviasi(
                              Number(week.rencana) || 0,
                              Number(week.realisasi) || 0
                            );

                            return (
                              <div 
                                key={`${monthField.id}-week-${weekIndex}`}
                                className="p-3 border rounded-lg"
                              >
                                <div className="font-medium mb-3">Minggu {week.week}</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-1">
                                      Rencana (%)
                                    </label>
                                    <Controller
                                      name={`months.${monthIndex}.items.${weekIndex}.rencana`}
                                      control={control}
                                      render={({ field }) => (
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          {...field}
                                          onChange={(e) => {
                                            const value = Math.min(100, Math.max(0, Number(e.target.value)));
                                            field.onChange(value);
                                            methods.setValue(
                                              `months.${monthIndex}.items.${weekIndex}.deviasi`,
                                              calculateDeviasi(
                                                value,
                                                Number(week.realisasi) || 0
                                              )
                                            );
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">
                                      Realisasi (%)
                                    </label>
                                    <Controller
                                      name={`months.${monthIndex}.items.${weekIndex}.realisasi`}
                                      control={control}
                                      render={({ field }) => (
                                        <Input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          {...field}
                                          onChange={(e) => {
                                            const value = Math.min(100, Math.max(0, Number(e.target.value)));
                                            field.onChange(value);
                                            methods.setValue(
                                              `months.${monthIndex}.items.${weekIndex}.deviasi`,
                                              calculateDeviasi(
                                                Number(week.rencana) || 0,
                                                value
                                              )
                                            );
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">
                                      Deviasi (%)
                                    </label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      value={deviasi}
                                      readOnly
                                      className="bg-muted"
                                      style={{
                                        color: deviasi < 0 ? '#ef4444' : deviasi > 0 ? '#22c55e' : '#64748b'
                                      }}
                                    />
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
            
            <CardFooter className="flex justify-end space-x-2 bg-muted/50 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Kembali
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Progress"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}