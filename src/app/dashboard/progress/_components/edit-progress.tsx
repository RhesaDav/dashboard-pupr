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


const sortMonthsChronologically = (months: MonthProgress[]) => {
  const monthOrder = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
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

const findPreviousWeekValues = (
  months: MonthProgress[],
  currentMonthIndex: number,
  currentWeekIndex: number
) => {
  type WeekReference = {
    monthIndex: number;
    weekIndex: number;
    rencana: number;
    realisasi: number;
  };

  const allWeeksSorted: WeekReference[] = [];

  months.forEach((month, monthIdx) => {
    month.items.forEach((week, weekIdx) => {
      allWeeksSorted.push({
        monthIndex: monthIdx,
        weekIndex: weekIdx,
        rencana: week.rencana,
        realisasi: week.realisasi,
      });
    });
  });

  allWeeksSorted.sort((a, b) => {
    if (a.monthIndex === b.monthIndex) {
      return a.weekIndex - b.weekIndex;
    }
    return a.monthIndex - b.monthIndex;
  });

  
  const currentPosition = allWeeksSorted.findIndex(
    (week) =>
      week.monthIndex === currentMonthIndex &&
      week.weekIndex === currentWeekIndex
  );

  
  if (currentPosition <= 0) {
    return null;
  }

  
  return {
    rencana: allWeeksSorted[currentPosition - 1].rencana,
    realisasi: allWeeksSorted[currentPosition - 1].realisasi,
  };
};

export default function EditProgressPage({ contract }: EditProgressProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const [autoCopyEnabled, setAutoCopyEnabled] = useState(true);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [ignoreWarnings, setIgnoreWarnings] = useState<{
    [key: string]: boolean;
  }>({});
  const params = useParams();
  const router = useRouter();
  const contractId = String(params.id);

  const initialProgressData = useMemo(() => {
    if (contract.progress && contract.progress.length > 0) {
      const currentMonth = new Date().toLocaleString("id-ID", {
        month: "long",
      });

      return sortMonthsChronologically(contract.progress);
    }
    return generateWeeks(contract.tanggalKontrak, contract.masaPelaksanaan);
  }, [contract.tanggalKontrak, contract.masaPelaksanaan, contract.progress]);

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

  const calculateDeviasi = (rencana: number, realisasi: number) => {
    return realisasi - rencana;
  };

  const calculateMonthProgress = (items: ProgressItem[]) => {
    const totalRealisasi = items.reduce((sum, item) => sum + item.realisasi, 0);
    const totalRencana = items.reduce((sum, item) => sum + item.rencana, 0);
    return totalRencana > 0 ? (totalRealisasi / totalRencana) * 100 : 0;
  };

  const calculateTotalProgress = () => {
    if (formValues.months.length === 0) return 0;
    
    const lastMonth = formValues.months[formValues.months.length - 1];
    
    if (lastMonth.items.length === 0) return 0;
    
    const lastWeek = lastMonth.items[lastMonth.items.length - 1];
    
    return Math.min(lastWeek.realisasi, 100);
  };

  
  const validateProgressiveValue = (
    monthIndex: number,
    weekIndex: number,
    field: "rencana" | "realisasi",
    value: number
  ) => {
    const key = `months.${monthIndex}.items.${weekIndex}.${field}`;

    
    if (ignoreWarnings[key]) {
      const newErrors = { ...validationErrors };
      delete newErrors[key];
      setValidationErrors(newErrors);
      return value;
    }

    const previousValues = findPreviousWeekValues(
      formValues.months,
      monthIndex,
      weekIndex
    );

    if (previousValues) {
      const previousValue =
        field === "rencana" ? previousValues.rencana : previousValues.realisasi;

      if (value < previousValue) {
        const errorKey = key;
        setValidationErrors({
          ...validationErrors,
          [errorKey]: `Nilai ${field} lebih rendah dari minggu sebelumnya (${previousValue}%)`,
        });
      } else {
        
        const newErrors = { ...validationErrors };
        delete newErrors[key];
        setValidationErrors(newErrors);
      }
    }

    return value;
  };

  
  const ignoreWarning = (key: string) => {
    setIgnoreWarnings({
      ...ignoreWarnings,
      [key]: true,
    });

    
    const newErrors = { ...validationErrors };
    delete newErrors[key];
    setValidationErrors(newErrors);
  };

  
  const applyToFollowingWeeks = (
    currentMonthIndex: number,
    currentWeekIndex: number,
    field: "rencana" | "realisasi",
    value: number
  ) => {
    if (!autoCopyEnabled) return;

    
    type WeekReference = { monthIndex: number; weekIndex: number };
    const weeksToUpdate: WeekReference[] = [];

    
    let foundCurrent = false;

    
    formValues.months.forEach((month, monthIdx) => {
      
      month.items.forEach((_, weekIdx) => {
        
        if (monthIdx === currentMonthIndex && weekIdx === currentWeekIndex) {
          foundCurrent = true;
          return; 
        }

        
        if (foundCurrent) {
          weeksToUpdate.push({ monthIndex: monthIdx, weekIndex: weekIdx });
        }
      });
    });

    
    weeksToUpdate.forEach(({ monthIndex, weekIndex }) => {
      if (field === "rencana") {
        setValue(`months.${monthIndex}.items.${weekIndex}.rencana`, value);
        setValue(
          `months.${monthIndex}.items.${weekIndex}.deviasi`,
          calculateDeviasi(
            value,
            Number(formValues.months[monthIndex].items[weekIndex].realisasi) ||
              0
          )
        );
      } else if (field === "realisasi") {
        setValue(`months.${monthIndex}.items.${weekIndex}.realisasi`, value);
        setValue(
          `months.${monthIndex}.items.${weekIndex}.deviasi`,
          calculateDeviasi(
            Number(formValues.months[monthIndex].items[weekIndex].rencana) || 0,
            value
          )
        );
      }

      
      const errorKey = `months.${monthIndex}.items.${weekIndex}.${field}`;
      if (validationErrors[errorKey]) {
        const newErrors = { ...validationErrors };
        delete newErrors[errorKey];
        setValidationErrors(newErrors);
      }
    });
  };

  const formValues = watch();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      for (const month of data.months) {
        const monthEntries = month.items.map((item) => ({
          week: item.week,
          rencana: Number(item.rencana),
          realisasi: Number(item.realisasi),
          deviasi: item.deviasi,
          startDate: item.startDate,
          endDate: item.endDate,
        }));

        await updateMonthlyProgress(contractId, month.month, monthEntries);
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

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-copy"
                  checked={autoCopyEnabled}
                  onCheckedChange={(checked) =>
                    setAutoCopyEnabled(checked === true)
                  }
                />
                <label
                  htmlFor="auto-copy"
                  className="text-sm font-medium cursor-pointer"
                >
                  Terapkan nilai ke minggu berikutnya secara otomatis
                </label>
              </div>
            </div>

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
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>{error}</span>
                        {/* <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-yellow-700 hover:text-yellow-800"
                          onClick={() => ignoreWarning(key)}
                        >
                          Abaikan
                        </Button> */}
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
              {monthFields.map((monthField, monthIndex) => {
                const monthProgress = calculateMonthProgress(
                  formValues.months[monthIndex].items
                );

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
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <div className="space-y-4">
                        {formValues.months[monthIndex].items.map(
                          (week, weekIndex) => {
                            const deviasi = calculateDeviasi(
                              Number(week.rencana) || 0,
                              Number(week.realisasi) || 0
                            );

                            
                            const rencanaErrorKey = `months.${monthIndex}.items.${weekIndex}.rencana`;
                            const realisasiErrorKey = `months.${monthIndex}.items.${weekIndex}.realisasi`;

                            
                            const hasRencanaError =
                              !!validationErrors[rencanaErrorKey];
                            const hasRealisasiError =
                              !!validationErrors[realisasiErrorKey];

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
                                        step="0.1"
                                        className={
                                          hasRencanaError
                                            ? "border-red-500 pr-8"
                                            : ""
                                        }
                                        {...register(
                                          `months.${monthIndex}.items.${weekIndex}.rencana`,
                                          {
                                            valueAsNumber: true,
                                            onChange: (e) => {
                                              const inputValue = Math.min(
                                                100,
                                                Math.max(
                                                  0,
                                                  Number(e.target.value)
                                                )
                                              );

                                              
                                              const validatedValue =
                                                validateProgressiveValue(
                                                  monthIndex,
                                                  weekIndex,
                                                  "rencana",
                                                  inputValue
                                                );

                                              
                                              setValue(
                                                `months.${monthIndex}.items.${weekIndex}.rencana`,
                                                validatedValue
                                              );
                                              setValue(
                                                `months.${monthIndex}.items.${weekIndex}.deviasi`,
                                                calculateDeviasi(
                                                  validatedValue,
                                                  Number(week.realisasi) || 0
                                                )
                                              );

                                              
                                              if (
                                                validatedValue === inputValue
                                              ) {
                                                
                                                applyToFollowingWeeks(
                                                  monthIndex,
                                                  weekIndex,
                                                  "rencana",
                                                  validatedValue
                                                );
                                              }
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
                                                {
                                                  validationErrors[
                                                    rencanaErrorKey
                                                  ]
                                                }
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )}
                                    </div>
                                    {errors.months?.[monthIndex]?.items?.[
                                      weekIndex
                                    ]?.rencana && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          errors.months[monthIndex]?.items[
                                            weekIndex
                                          ]?.rencana?.message
                                        }
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
                                        className={
                                          hasRealisasiError
                                            ? "border-red-500 pr-8"
                                            : ""
                                        }
                                        {...register(
                                          `months.${monthIndex}.items.${weekIndex}.realisasi`,
                                          {
                                            valueAsNumber: true,
                                            onChange: (e) => {
                                              const inputValue = Math.min(
                                                100,
                                                Math.max(
                                                  0,
                                                  Number(e.target.value)
                                                )
                                              );

                                              
                                              const validatedValue =
                                                validateProgressiveValue(
                                                  monthIndex,
                                                  weekIndex,
                                                  "realisasi",
                                                  inputValue
                                                );

                                              
                                              setValue(
                                                `months.${monthIndex}.items.${weekIndex}.realisasi`,
                                                validatedValue
                                              );
                                              setValue(
                                                `months.${monthIndex}.items.${weekIndex}.deviasi`,
                                                calculateDeviasi(
                                                  Number(week.rencana) || 0,
                                                  validatedValue
                                                )
                                              );

                                              
                                              if (
                                                validatedValue === inputValue
                                              ) {
                                                
                                                applyToFollowingWeeks(
                                                  monthIndex,
                                                  weekIndex,
                                                  "realisasi",
                                                  validatedValue
                                                );
                                              }
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
                                                {
                                                  validationErrors[
                                                    realisasiErrorKey
                                                  ]
                                                }
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )}
                                    </div>
                                    {errors.months?.[monthIndex]?.items?.[
                                      weekIndex
                                    ]?.realisasi && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          errors.months[monthIndex]?.items[
                                            weekIndex
                                          ]?.realisasi?.message
                                        }
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
                                      value={deviasi.toFixed(1)}
                                      readOnly
                                      className="bg-muted"
                                      style={{
                                        color:
                                          deviasi < 0
                                            ? "#ef4444"
                                            : deviasi > 0
                                            ? "#22c55e"
                                            : "#64748b",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
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
            <Button type="submit" disabled={isSubmitting || Object.keys(validationErrors).length > 0} className="min-w-32">
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
