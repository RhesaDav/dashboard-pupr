"use client";

import React, { useState } from "react";
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

interface DateDayPickerProps {
  selectedDate: Date;
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
  label = "Tanggal:",
  placeholder = "Pilih tanggal",
  className,
  disabled = false,
  dateFormat = "EEEE, dd MMMM yyyy",
  minDate,
  maxDate,
}: DateDayPickerProps) {
  const [month, setMonth] = useState<Date>(selectedDate || new Date());
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from({ length: 11 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { value: year.toString(), label: year.toString() };
  });

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

  const handleDaySelect = (date: Date | undefined) => {
    onChange(date);
    if (date) {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const handleMonthChange = (value: string) => {
    const newDate = new Date(month);
    newDate.setMonth(parseInt(value));
    setMonth(newDate);
  };

  const handleYearChange = (value: string) => {
    const newDate = new Date(month);
    newDate.setFullYear(parseInt(value));
    setMonth(newDate);
  };

  const handlePrevMonth = () => {
    setMonth(subMonths(month, 1));
  };

  const handleNextMonth = () => {
    setMonth(addMonths(month, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = selectedDate?.toDateString() === today.toDateString();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* {label && (
        <Label
          htmlFor="day-picker"
          className="text-sm font-medium whitespace-nowrap"
        >
          {label}
        </Label>
      )} */}
      <Popover open={isOpen && !disabled} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="day-picker"
            variant="outline"
            size="sm"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal transition-colors relative",
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
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 shadow-lg rounded-md"
          align="start"
        >
          <div className="p-3 border-b flex items-center justify-between bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-muted"
              onClick={handlePrevMonth}
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
              >
                <SelectTrigger className="h-8 w-[80px] rounded-md focus:ring-1 focus:ring-primary">
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
              className="h-7 w-7 rounded-full hover:bg-muted"
              onClick={handleNextMonth}
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
              onSelect={handleDaySelect}
              month={month}
              onMonthChange={setMonth}
              modifiers={{
                today: today,
                selected: selectedDate,
              }}
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
              fromDate={minDate}
              toDate={maxDate}
              initialFocus
              locale={indonesiaLocale}
              showOutsideDays={false}
              className="rounded-md"
            />
          </div>

          <div className="flex items-center justify-between p-3 border-t bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDaySelect(new Date())}
              className="text-xs h-8"
            >
              Hari Ini
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs h-8"
            >
              Tutup
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* {selectedDate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          disabled={disabled}
          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Hapus pilihan"
        >
          <X className="h-4 w-4" />
        </Button>
      )} */}
    </div>
  );
}
