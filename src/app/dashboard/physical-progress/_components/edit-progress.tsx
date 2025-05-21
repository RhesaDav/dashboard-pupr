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
import { useForm, useFieldArray, Path } from "react-hook-form";
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

// Schema for form validation
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
    totalAddendumWaktu: number;
    volumeKontrak: number | string;
    satuanKontrak: string;
    endDate: string;
    progress: MonthProgress[];
  };
}

// Helper to sort months chronologically
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

  // Sort months chronologically
  const initialProgressData = useMemo(() => {
    if (contract.progress && contract.progress.length > 0) {
      return sortMonthsChronologically(contract.progress);
    }
    return [];
  }, [contract.progress]);

  // Form setup with zod validation
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

  // Calculate deviation between planned and actual progress
  const calculateDeviasi = (rencana: number, realisasi: number) => {
    return realisasi - rencana;
  };

  // Get all progress entries sorted by month and week
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

    return allEntries.sort((a, b) => {
      if (a.monthIndex === b.monthIndex) {
        return a.weekIndex - b.weekIndex;
      }
      return a.monthIndex - b.monthIndex;
    });
  };

  // Validate that progress values never decrease from previous values
  const validateProgressValue = (
    monthIndex: number,
    weekIndex: number,
    field: "rencana" | "realisasi",
    value: number
  ) => {
    const allEntries = getAllProgressEntriesSorted(formValues);
    const currentEntryIndex = allEntries.findIndex(
      (entry) => entry.monthIndex === monthIndex && entry.weekIndex === weekIndex
    );

    if (currentEntryIndex <= 0) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`months.${monthIndex}.items.${weekIndex}.${field}`];
        return newErrors;
      });
      return value;
    }

    // Find highest previous value
    let highestPreviousValue = 0;
    for (let i = 0; i < currentEntryIndex; i++) {
      const prevValue = field === "rencana" ? allEntries[i].rencana : allEntries[i].realisasi;
      if (prevValue > highestPreviousValue) {
        highestPreviousValue = prevValue;
      }
    }

    if (value < highestPreviousValue && value !== 0) {
      setValidationErrors((prev) => ({
        ...prev,
        [`months.${monthIndex}.items.${weekIndex}.${field}`]: 
          `Nilai ${field} pada ${weekIndex} (${value}%) tidak boleh lebih rendah dari nilai tertinggi sebelumnya (${highestPreviousValue}%)`,
      }));
      return highestPreviousValue;
    }

    // Clear validation error if value is valid
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`months.${monthIndex}.items.${weekIndex}.${field}`];
      return newErrors;
    });

    return value;
  };

  // Calculate total progress from the latest realization value
  const calculateTotalProgress = () => {
    if (!formValues.months.length) return 0;

    let maxRealisasi = 0;

    for (const month of formValues.months) {
      for (const week of month.items) {
        if (
          week &&
          typeof week.realisasi === "number" &&
          !isNaN(week.realisasi) &&
          week.realisasi > maxRealisasi
        ) {
          maxRealisasi = week.realisasi;
        }
      }
    }

    return Math.min(maxRealisasi, 100);
  };

  // Form values from watch
  const formValues = watch();

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const allEntries = data.months.flatMap((month) =>
        month.items.map((item) => ({
          month: month.month,
          week: item.week,
          rencana: Number(item.rencana) || 0,
          realisasi: Number(item.realisasi) || 0,
          startDate: item.startDate,
          endDate: item.endDate,
          bermasalah: Boolean(item.bermasalah),
          deskripsiMasalah: item.deskripsiMasalah,
          keterangan: item.keterangan,
        }))
      );

      await updateContractProgress(contractId, allEntries);

      toast.success("Progress berhasil disimpan");
      router.push("/dashboard/physical-progress");
      router.refresh();
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Gagal menyimpan progress");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to format numeric inputs
  const formatNumericInput = (value: string) => {
    if (value === "" || value === ".") return "0";
    if (value.endsWith(".")) value = value.slice(0, -1);
    
    const numValue = Math.min(100, Math.max(0, parseFloat(value) || 0));
    
    if (numValue % 1 === 0) {
      return numValue.toString();
    }
    
    return numValue.toFixed(2).replace(/\.?0+$/, "");
  };

  // Handle numeric input changes
  const handleNumericInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    path: Path<FormValues>
  ) => {
    const rawValue = e.target.value;
    const prevValue = watch(path);

    const sanitizedValue = rawValue.replace(/[^0-9.]/g, "");
    const numericValue = parseFloat(sanitizedValue);
    
    if (!isNaN(numericValue) && numericValue > 100) {
      e.target.value = "100";
      return;
    }

    const parts = sanitizedValue.split(".");
    let validValue = parts[0];
    if (parts.length > 1) {
      validValue += "." + parts[1].slice(0, 2);
    }

    if (parts.length > 2 || rawValue !== validValue) {
      e.target.value = prevValue?.toString() || "";
      return;
    }

    setValue(path, validValue);
  };

  // Handle blur events for numeric inputs
  const handleNumericInputBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    monthIndex: number,
    weekIndex: number,
    field: "rencana" | "realisasi"
  ) => {
    const formattedValue = formatNumericInput(e.target.value);
    const numValue = parseFloat(formattedValue);
    
    e.target.value = formattedValue;
    setValue(`months.${monthIndex}.items.${weekIndex}.${field}`, numValue);
    
    // Validate against previous values
    validateProgressValue(monthIndex, weekIndex, field, numValue);
    
    // Calculate and update deviation
    const oppositeField = field === "rencana" ? "realisasi" : "rencana";
    const oppositeValue = Number(
      formValues.months[monthIndex].items[weekIndex][oppositeField]
    ) || 0;
    
    const deviasi = field === "rencana" 
      ? calculateDeviasi(numValue, oppositeValue)
      : calculateDeviasi(oppositeValue, numValue);
    
    setValue(`months.${monthIndex}.items.${weekIndex}.deviasi`, deviasi);
  };

  const totalAddendumWaktu = contract.totalAddendumWaktu || 0;
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
            {/* Contract info section */}
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
                  <span>
                    :{" "}
                    {hasNoExecutionPeriod
                      ? "Tidak ditentukan"
                      : `${masaPelaksanaan + totalAddendumWaktu} Hari`}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-36 font-medium">Volume</span>
                  <span>
                    : {contract.volumeKontrak || "-"} {contract.satuanKontrak}
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
                  <p>
                    Tidak ada masa pelaksanaan yang ditentukan. Tidak dapat
                    menampilkan progress.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Total progress indicator */}
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

                {/* Validation warnings */}
                {Object.keys(validationErrors).length > 0 && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex gap-2 text-yellow-700 font-medium">
                      <AlertCircle className="h-5 w-5" />
                      <span>
                        Ada {Object.keys(validationErrors).length} peringatan
                        validasi:
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

                {/* Months accordion */}
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
                                  {/* Week header */}
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
                                  
                                  {/* Progress inputs */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Rencana input */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1">
                                        Rencana (%)
                                      </label>
                                      <div className="relative">
                                        <Input
                                          type="text"
                                          inputMode="decimal"
                                          className={hasRencanaError ? "border-red-500 pr-8" : ""}
                                          {...register(
                                            `months.${monthIndex}.items.${weekIndex}.rencana`,
                                            {
                                              onChange: (e) => handleNumericInputChange(
                                                e, 
                                                `months.${monthIndex}.items.${weekIndex}.rencana`
                                              ),
                                              onBlur: (e) => handleNumericInputBlur(
                                                e, 
                                                monthIndex, 
                                                weekIndex, 
                                                "rencana"
                                              ),
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
                                    
                                    {/* Realisasi input */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1">
                                        Realisasi (%)
                                      </label>
                                      <div className="relative">
                                        <Input
                                          type="text"
                                          inputMode="decimal"
                                          className={hasRealisasiError ? "border-red-500 pr-8" : ""}
                                          {...register(
                                            `months.${monthIndex}.items.${weekIndex}.realisasi`,
                                            {
                                              onChange: (e) => handleNumericInputChange(
                                                e, 
                                                `months.${monthIndex}.items.${weekIndex}.realisasi`
                                              ),
                                              onBlur: (e) => handleNumericInputBlur(
                                                e, 
                                                monthIndex, 
                                                weekIndex, 
                                                "realisasi"
                                              ),
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
                                    
                                    {/* Deviasi display */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1">
                                        Deviasi (%)
                                      </label>
                                      <Input
                                        type="number"
                                        step="0.01"
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

                                  {/* Problem section */}
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
              disabled={
                isSubmitting ||
                hasNoExecutionPeriod ||
                Object.keys(validationErrors).length > 0
              }
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