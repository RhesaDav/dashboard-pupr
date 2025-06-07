"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addMonths, subMonths } from "date-fns";
import { id as indonesiaLocale } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/actions/auth";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

interface DateDayPickerProps {
  selectedDate: Date | null | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DateDayPicker({
  selectedDate,
  onChange,
  placeholder = "Pilih tanggal",
  className,
  disabled = false,
  dateFormat = "EEEE, dd MMMM yyyy",
  minDate,
  maxDate,
}: DateDayPickerProps) {
  const user = useCurrentUser();

  const budgetYear = user?.budgetYear || new Date().getFullYear();

  const [month, setMonth] = useState<Date>(() => {
    if (selectedDate) {
      return selectedDate;
    }

    if (user?.budgetYear) {
      return new Date(user.budgetYear, new Date().getMonth(), 1);
    }

    return new Date();
  });
  const [isOpen, setIsOpen] = useState(false);

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
        minDate: new Date(user.budgetYear, 0, 1),
        maxDate: new Date(user.budgetYear, 11, 31),
      };
    }
    return { minDate, maxDate };
  }, [user?.budgetYear, minDate, maxDate]);

  const handleDaySelect = (date: Date | undefined) => {
    onChange(date);
    if (date) setIsOpen(false);
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isToday =
    selectedDate && selectedDate.toDateString() === today.toDateString();

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
    <div className={cn("w-full", className)}>
      <Popover
        open={isOpen && !disabled}
        onOpenChange={(open) => {
          setIsOpen(open);

          if (open && user?.budgetYear) {
            const currentMonth = selectedDate
              ? selectedDate.getMonth()
              : new Date().getMonth();
            setMonth(new Date(user.budgetYear, currentMonth, 1));
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
            {selectedDate ? (
              <div className="flex items-center gap-2">
                <span className="text-sm truncate">
                  {format(selectedDate, dateFormat, {
                    locale: indonesiaLocale,
                  })}
                </span>
                {isToday && (
                  <Badge
                    variant="secondary"
                    className="h-5 px-1.5 ml-auto text-xs"
                  >
                    Hari ini
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Tidak ada tanggal yang dipilih
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 shadow-lg rounded-md"
          align="start"
        >
          <div className="p-2 border-b flex items-center justify-between bg-muted/30">
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
            </Button>

            <div className="flex items-center gap-1">
              <Select
                value={month.getMonth().toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="h-8 w-[100px] rounded-md">
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
                    "h-8 w-[80px] rounded-md",
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
            </Button>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDaySelect}
            month={month}
            onMonthChange={setMonth}
            modifiers={{ today }}
            modifiersStyles={{
              today: {
                fontWeight: "bold",
                color: "hsl(var(--primary))",
                borderBottom: "2px solid hsl(var(--primary) / 0.5)",
              },
              selected: {
                color: "white",
                backgroundColor: "hsl(var(--primary))",
                borderRadius: "4px",
                fontWeight: "bold",
              },
            }}
            fromDate={dateConstraints.minDate}
            toDate={dateConstraints.maxDate}
            initialFocus
            locale={indonesiaLocale}
            className="border-0"
          />

          <div className="flex items-center justify-between p-2 border-t bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const today = new Date();
                if (user?.budgetYear) {
                  const budgetYearDate = new Date(user.budgetYear, 0, 1);
                  handleDaySelect(budgetYearDate);
                } else {
                  handleDaySelect(today);
                }
              }}
            >
              {user?.budgetYear ? `1 Jan ${user.budgetYear}` : "Hari Ini"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDaySelect(undefined)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Hapus
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Tutup
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
