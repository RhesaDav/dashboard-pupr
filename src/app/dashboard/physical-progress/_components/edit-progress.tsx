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
import { formatRupiah } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateContractProgress } from "@/actions/progress";
import { useForm, useFieldArray } from "react-hook-form";
import { AlertCircle, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

// Schema untuk validasi form
const progressSchema = z.object({
  months: z.array(
    z.object({
      month: z.string(),
      items: z.array(
        z.object({
          week: z.number(),
          rencana: z.number().min(0).max(100),
          realisasi: z.number().min(0).max(100),
          deviasi: z.number(),
          startDate: z.string(),
          endDate: z.string(),
          bermasalah: z.boolean(),
          deskripsiMasalah: z.string().nullable(),
          keterangan: z.string().nullable(),
        })
      ),
    })
  ),
});

type FormValues = z.infer<typeof progressSchema>;

interface ProgressItem {
  week: number;
  rencana: number;
  realisasi: number;
  deviasi: number;
  startDate?: string; 
  endDate?: string;
  bermasalah?: boolean;
  deskripsiMasalah?: string | null;
  keterangan?: string | null;
}

interface MonthProgress {
  month: string;
  items: ProgressItem[];
}

interface EditProgressProps {
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

// Fungsi untuk mengurutkan bulan secara kronologis
const sortMonthsChronologically = (months: MonthProgress[]) => {
  const monthOrder = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  return [...months].sort((a, b) => {
    const [monthA, yearA] = a.month.split(" ");
    const [monthB, yearB] = b.month.split(" ");

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    const indexA = monthOrder.indexOf(monthA);
    const indexB = monthOrder.indexOf(monthB);
    return indexA - indexB;
  });
};

export default function EditProgressPage({ contract }: EditProgressProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const params = useParams();
  const router = useRouter();
  const contractId = String(params.id);

  // Proses data progress awal dan urutkan secara kronologis
  const initialProgressData = useMemo(() => {
    if (contract.progress && contract.progress.length > 0) {
      return sortMonthsChronologically(contract.progress);
    }
    return [];
  }, [contract.progress]);
  
  // Setup form menggunakan react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      months: initialProgressData,
    },
  });

  const { fields: monthFields } = useFieldArray({
    control,
    name: "months",
  });

  // Fungsi untuk menghitung deviasi
  const calculateDeviasi = (rencana: number, realisasi: number) => {
    return realisasi - rencana;
  };

  // Fungsi untuk mendapatkan nilai progress dari semua entry sebelumnya
  const getAllProgressEntriesSorted = (formValues: FormValues) => {
    const allEntries: {
      monthIndex: number;
      weekIndex: number;
      week: number;
      month: string;
      rencana: number;
      realisasi: number;
    }[] = [];

    formValues.months.forEach((month, monthIdx) => {
      month.items.forEach((item, weekIdx) => {
        allEntries.push({
          monthIndex: monthIdx,
          weekIndex: weekIdx,
          week: item.week,
          month: month.month,
          rencana: Number(item.rencana) || 0,
          realisasi: Number(item.realisasi) || 0,
        });
      });
    });

    // Urutkan berdasarkan bulan dan minggu
    return allEntries.sort((a, b) => {
      if (a.monthIndex === b.monthIndex) {
        return a.weekIndex - b.weekIndex;
      }
      return a.monthIndex - b.monthIndex;
    });
  };

  // Fungsi untuk memvalidasi nilai progress (harus selalu meningkat)
  const validateProgressValue = (
    monthIndex: number,
    weekIndex: number,
    field: "rencana" | "realisasi",
    value: number
  ) => {
    const currentMonthName = formValues.months[monthIndex].month;
    const currentWeek = formValues.months[monthIndex].items[weekIndex].week;
    const key = `months.${monthIndex}.items.${weekIndex}.${field}`;
    
    // Dapatkan semua entry yang sudah diurutkan
    const allEntries = getAllProgressEntriesSorted(formValues);
    
    // Cari posisi entry saat ini
    const currentEntryIndex = allEntries.findIndex(
      entry => entry.monthIndex === monthIndex && entry.weekIndex === weekIndex
    );
    
    if (currentEntryIndex <= 0) {
      // Ini adalah entry pertama, tidak perlu validasi
      return value;
    }
    
    // Cari nilai tertinggi sebelum entry ini
    let highestPreviousValue = 0;
    for (let i = 0; i < currentEntryIndex; i++) {
      const prevValue = field === "rencana" ? allEntries[i].rencana : allEntries[i].realisasi;
      if (prevValue > highestPreviousValue) {
        highestPreviousValue = prevValue;
      }
    }
    
    // Jika nilai saat ini lebih rendah dari nilai tertinggi sebelumnya, tambahkan error
    if (value < highestPreviousValue) {
      setValidationErrors(prev => ({
        ...prev,
        [key]: `Nilai ${field} (${value}%) lebih rendah dari nilai tertinggi sebelumnya (${highestPreviousValue}%)`,
      }));
    } else {
      // Hapus error jika nilai valid
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
    
    return value;
  };

  // Hitung progress bulanan
  const calculateMonthProgress = (items: ProgressItem[]) => {
    if (items.length === 0) return 0;
    const lastItem = items[items.length - 1];
    return Number(lastItem.realisasi) || 0;
  };

  const calculateTotalProgress = () => {
    if (!formValues.months.length) return 0;

    let maxRealisasi = 0;
    let maxWeek = null;

    for (const month of formValues.months) {
      for (const week of month.items) {
        if (
          week &&
          typeof week.realisasi === "number" &&
          !isNaN(week.realisasi) &&
          week.realisasi > maxRealisasi
        ) {
          maxRealisasi = week.realisasi;
          maxWeek = week;
        }
      }
    }

    if (maxWeek) {
      console.log(
        "Max realisasi found in week:",
        maxWeek.week,
        "with value:",
        maxRealisasi
      );
    }

    return Math.min(maxRealisasi, 100);
  };

  const formValues = watch();

  // Fungsi untuk menyimpan data
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Flatten all entries from all months into a single array
      const allEntries = data.months.flatMap(month => 
        month.items.map(item => ({
          month: month.month,
          week: item.week,
          rencana: Number(item.rencana) || 0,
          realisasi: Number(item.realisasi) || 0,
          startDate: item.startDate,
          endDate: item.endDate,
          bermasalah: Boolean(item.bermasalah),
          deskripsiMasalah: item.deskripsiMasalah,
          keterangan: item.keterangan
        }))
      );
  
      // Process all entries in a single transaction
      await updateContractProgress(contractId, allEntries);
  
      toast.success("Progress berhasil disimpan");
      router.refresh();
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Gagal menyimpan progress");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const masaPelaksanaan = contract.masaPelaksanaan || 0;
  const hasNoExecutionPeriod = masaPelaksanaan <= 0;

  return (
    <div className="container mx-auto py-6 max-w-4xl">
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
                  <span>: {hasNoExecutionPeriod ? "Tidak ditentukan" : `${masaPelaksanaan} Hari`}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-36 font-medium">Volume</span>
                  <span>
                    : {contract.volumeKontrak} {contract.satuanKontrak}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-36 font-medium">Target Selesai</span>
                  <span>: {contract.endDate}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <h2 className="text-lg font-semibold mb-4">Progress Fisik</h2>

            {hasNoExecutionPeriod ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-700">
                  <AlertCircle className="h-5 w-5" />
                  <p>Tidak ada masa pelaksanaan yang ditentukan. Tidak dapat menampilkan progress.</p>
                </div>
              </div>
            ) : (
              <>
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

                {Object.keys(validationErrors).length > 0 && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex gap-2 text-yellow-700 font-medium">
                      <AlertCircle className="h-5 w-5" />
                      <span>
                        Ada {Object.keys(validationErrors).length} peringatan validasi:
                      </span>
                    </div>
                    <ul className="mt-2 ml-6 list-disc text-yellow-600 text-sm">
                      {Object.entries(validationErrors).map(
                        ([key, error], index) => (
                          <li key={index}>
                            <span>{error}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                <Accordion
                  type="multiple"
                  value={expandedMonths}
                  onValueChange={setExpandedMonths}
                  className="space-y-4"
                >
                  {monthFields.map((monthField, monthIndex) => (
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
                          {/* <span className="text-sm text-muted-foreground">
                            Progress: {calculateMonthProgress(formValues.months[monthIndex].items).toFixed(1)}%
                          </span> */}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4">
                        <div className="space-y-4">
                          {formValues.months[monthIndex].items.map(
                            (week, weekIndex) => {
                              const rencanaErrorKey = `months.${monthIndex}.items.${weekIndex}.rencana`;
                              const realisasiErrorKey = `months.${monthIndex}.items.${weekIndex}.realisasi`;

                              const hasRencanaError = !!validationErrors[rencanaErrorKey];
                              const hasRealisasiError = !!validationErrors[realisasiErrorKey];

                              return (
                                <div
                                  key={`${monthField.id}-week-${weekIndex}`}
                                  className="p-3 border rounded-lg"
                                >
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="font-medium flex items-center">
                                      Minggu {week.week}
                                      {week.startDate && week.endDate && (
                                        <div className="ml-2 flex items-center text-sm text-muted-foreground">
                                          <Calendar className="h-3.5 w-3.5 mr-1" />
                                          <span>
                                            {week.startDate} - {week.endDate}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium mb-1">
                                        Rencana (%)
                                      </label>
                                      <div className="relative">
                                        <Input
                                          type="number"
                                          step="0.01"
                                          className={hasRencanaError ? "border-red-500 pr-8" : ""}
                                          {...register(
                                            `months.${monthIndex}.items.${weekIndex}.rencana`,
                                            {
                                              valueAsNumber: true,
                                              onChange: (e) => {
                                                const inputValue = Math.min(
                                                  100,
                                                  Math.max(0, Number(e.target.value) || 0)
                                                );

                                                const validatedValue = validateProgressValue(
                                                  monthIndex,
                                                  weekIndex,
                                                  "rencana",
                                                  inputValue
                                                );

                                                setValue(
                                                  `months.${monthIndex}.items.${weekIndex}.rencana`,
                                                  validatedValue
                                                );
                                                
                                                // Update deviasi
                                                const realisasi = Number(formValues.months[monthIndex].items[weekIndex].realisasi) || 0;
                                                setValue(
                                                  `months.${monthIndex}.items.${weekIndex}.deviasi`,
                                                  calculateDeviasi(validatedValue, realisasi)
                                                );
                                              },
                                            }
                                          )}
                                        />
                                        {hasRencanaError && (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent side="right">
                                                <p className="text-xs max-w-xs">
                                                  {validationErrors[rencanaErrorKey]}
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                      </div>
                                      {errors.months?.[monthIndex]?.items?.[weekIndex]?.rencana && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {errors.months[monthIndex]?.items[weekIndex]?.rencana?.message}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium mb-1">
                                        Realisasi (%)
                                      </label>
                                      <div className="relative">
                                        <Input
                                          type="number"
                                          step="0.1"
                                          className={hasRealisasiError ? "border-red-500 pr-8" : ""}
                                          {...register(
                                            `months.${monthIndex}.items.${weekIndex}.realisasi`,
                                            {
                                              valueAsNumber: true,
                                              onChange: (e) => {
                                                const inputValue = Math.min(
                                                  100,
                                                  Math.max(0, Number(e.target.value) || 0)
                                                );

                                                const validatedValue = validateProgressValue(
                                                  monthIndex,
                                                  weekIndex,
                                                  "realisasi",
                                                  inputValue
                                                );

                                                setValue(
                                                  `months.${monthIndex}.items.${weekIndex}.realisasi`,
                                                  validatedValue
                                                );
                                                
                                                // Update deviasi
                                                const rencana = Number(formValues.months[monthIndex].items[weekIndex].rencana) || 0;
                                                setValue(
                                                  `months.${monthIndex}.items.${weekIndex}.deviasi`,
                                                  calculateDeviasi(rencana, validatedValue)
                                                );
                                              },
                                            }
                                          )}
                                        />
                                        {hasRealisasiError && (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent side="right">
                                                <p className="text-xs max-w-xs">
                                                  {validationErrors[realisasiErrorKey]}
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                      </div>
                                      {errors.months?.[monthIndex]?.items?.[weekIndex]?.realisasi && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {errors.months[monthIndex]?.items[weekIndex]?.realisasi?.message}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium mb-1">
                                        Deviasi (%)
                                      </label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={(Number(week.deviasi) || 0).toFixed(1)}
                                        readOnly
                                        className="bg-muted"
                                        style={{
                                          color:
                                            Number(week.deviasi) < 0
                                              ? "#ef4444"
                                              : Number(week.deviasi) > 0
                                              ? "#22c55e"
                                              : "#64748b",
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Bagian Bermasalah & Deskripsi */}
                                  <div className="mt-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`bermasalah-${monthIndex}-${weekIndex}`}
                                        checked={week.bermasalah || false}
                                        onCheckedChange={(checked) => {
                                          setValue(
                                            `months.${monthIndex}.items.${weekIndex}.bermasalah`,
                                            checked === true
                                          );
                                          if (checked !== true) {
                                            setValue(
                                              `months.${monthIndex}.items.${weekIndex}.deskripsiMasalah`,
                                              ""
                                            );
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`bermasalah-${monthIndex}-${weekIndex}`}
                                        className="text-sm font-medium leading-none"
                                      >
                                        Bermasalah
                                      </label>
                                    </div>

                                    {week.bermasalah && (
                                      <div>
                                        <label
                                          htmlFor={`masalah-${monthIndex}-${weekIndex}`}
                                          className="block text-sm font-medium mb-1"
                                        >
                                          Deskripsi Masalah
                                        </label>
                                        <Textarea
                                          id={`masalah-${monthIndex}-${weekIndex}`}
                                          {...register(
                                            `months.${monthIndex}.items.${weekIndex}.deskripsiMasalah`
                                          )}
                                          placeholder="Jelaskan masalah yang terjadi..."
                                          className="min-h-[80px]"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}
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
              disabled={isSubmitting || hasNoExecutionPeriod || Object.keys(validationErrors).length > 0}
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
    </div>
  );
}