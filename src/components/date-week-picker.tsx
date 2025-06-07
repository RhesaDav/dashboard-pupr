"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  format,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { id as indonesiaLocale } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

interface DateWeekPickerProps {
  selectedDate?: Date;
  onChange: (date: Date | undefined) => void;
  weekRange?: { start: Date; end: Date };
  onWeekRangeChange: (range: { start: Date; end: Date } | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function DateWeekPicker({
  selectedDate,
  onChange,
  weekRange,
  onWeekRangeChange,
  label = "Periode Minggu:",
  placeholder = "Pilih minggu",
  className,
}: DateWeekPickerProps) {
  const user = useCurrentUser();

  const budgetYear = user?.budgetYear || new Date().getFullYear();

  const currentDate = selectedDate || new Date();

  const [month, setMonth] = useState<Date>(() => {
    if (selectedDate) {
      return selectedDate;
    }

    if (user?.budgetYear) {
      return new Date(user.budgetYear, new Date().getMonth(), 1);
    }

    return new Date();
  });

  useEffect(() => {
    if (user?.budgetYear && !selectedDate) {
      setMonth(new Date(user.budgetYear, new Date().getMonth(), 1));
    }
  }, [user?.budgetYear, selectedDate]);

  const years = useMemo(() => {
    if (user?.budgetYear) {
      return [
        {
          value: user.budgetYear.toString(),
          label: user.budgetYear.toString(),
        },
      ];
    }

    return Array.from({ length: 11 }, (_, i) => {
      const year = new Date().getFullYear() - 5 + i;
      return { value: year.toString(), label: year.toString() };
    });
  }, [user?.budgetYear]);

  const months = [
    { value: "0", label: "Januari" },
    { value: "1", label: "Februari" },
    { value: "2", label: "Maret" },
    { value: "3", label: "April" },
    { value: "4", label: "Mei" },
    { value: "5", label: "Juni" },
    { value: "6", label: "Juli" },
    { value: "7", label: "Agustus" },
    { value: "8", label: "September" },
    { value: "9", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Desember" },
  ];

  const dateConstraints = useMemo(() => {
    if (user?.budgetYear) {
      return {
        fromDate: new Date(user.budgetYear, 0, 1),
        toDate: new Date(user.budgetYear, 11, 31),
      };
    }
    return {};
  }, [user?.budgetYear]);

  const handleWeekSelect = (date: Date | undefined) => {
    onChange(date);
    if (date) {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const end = endOfWeek(date, { weekStartsOn: 1 });
      onWeekRangeChange({ start, end });
    } else {
      onWeekRangeChange(undefined);
    }
  };

  const handleClear = () => {
    onChange(undefined);
    onWeekRangeChange(undefined);
  };

  const handleMonthChange = (value: string) => {
    const newDate = new Date(budgetYear, parseInt(value), 1);
    setMonth(newDate);
  };

  const handleYearChange = (value: string) => {
    if (user?.budgetYear) return;

    const newDate = new Date(month);
    newDate.setFullYear(parseInt(value));
    setMonth(newDate);
  };

  const handlePrevMonth = () => {
    const newMonth = subMonths(month, 1);

    if (user?.budgetYear && newMonth.getFullYear() !== user.budgetYear) {
      return;
    }
    setMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(month, 1);

    if (user?.budgetYear && newMonth.getFullYear() !== user.budgetYear) {
      return;
    }
    setMonth(newMonth);
  };

  const handleSelectMonth = (monthIndex: number) => {
    const targetYear = user?.budgetYear || currentDate.getFullYear();
    const newDate = new Date(targetYear, monthIndex, 1);
    const start = startOfMonth(newDate);
    const end = endOfMonth(newDate);
    onWeekRangeChange({ start, end });
    onChange(newDate);
  };

  const canNavigatePrev = useMemo(() => {
    if (!user?.budgetYear) return true;
    const prevMonth = subMonths(month, 1);
    return prevMonth.getFullYear() === user.budgetYear;
  }, [month, user?.budgetYear]);

  const canNavigateNext = useMemo(() => {
    if (!user?.budgetYear) return true;
    const nextMonth = addMonths(month, 1);
    return nextMonth.getFullYear() === user.budgetYear;
  }, [month, user?.budgetYear]);

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Label
        htmlFor="week-picker"
        className="text-sm font-medium whitespace-nowrap"
      >
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="week-picker"
            variant="outline"
            size="sm"
            className={cn(
              "w-[240px] justify-start text-left font-normal transition-colors",
              !weekRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
            {weekRange ? (
              <span className="text-sm">
                {`${format(weekRange.start, "dd MMM")} - ${format(
                  weekRange.end,
                  "dd MMM yy"
                )}`}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-md rounded-md" align="end">
          <div className="p-3 border-b flex items-center justify-between bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 rounded-full hover:bg-muted",
                !canNavigatePrev && "opacity-50 cursor-not-allowed"
              )}
              onClick={handlePrevMonth}
              disabled={!canNavigatePrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Bulan sebelumnya</span>
            </Button>

            <div className="flex items-center gap-2">
              <Select
                value={month.getMonth().toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="h-8 w-[100px] rounded-md focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Bulan" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={month.getFullYear().toString()}
                onValueChange={handleYearChange}
                disabled={!!user?.budgetYear}
              >
                <SelectTrigger
                  className={cn(
                    "h-8 w-[80px] rounded-md focus:ring-1 focus:ring-primary",
                    user?.budgetYear && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y.value} value={y.value}>
                      {y.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 rounded-full hover:bg-muted",
                !canNavigateNext && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleNextMonth}
              disabled={!canNavigateNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Bulan berikutnya</span>
            </Button>
          </div>

          <div className="p-1">
            <Calendar
              disableNavigation
              mode="single"
              selected={selectedDate}
              onSelect={handleWeekSelect}
              month={month}
              onMonthChange={setMonth}
              modifiers={{
                ...(weekRange && {
                  selectedWeek: {
                    from: weekRange.start,
                    to: weekRange.end,
                  },
                }),
                today: new Date(),
              }}
              modifiersStyles={{
                selectedWeek: {
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  borderRadius: "4px",
                },
                today: {
                  fontWeight: "bold",
                  color: "hsl(var(--primary))",
                  border: "1px solid hsl(var(--primary) / 0.5)",
                  borderRadius: "4px",
                },
              }}
              fromDate={dateConstraints.fromDate}
              toDate={dateConstraints.toDate}
              initialFocus
              locale={indonesiaLocale}
              showOutsideDays={false}
              className="rounded-md"
            />
          </div>
        </PopoverContent>
      </Popover>

      {weekRange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Hapus pilihan"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
