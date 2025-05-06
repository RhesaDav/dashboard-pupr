"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { id as indonesiaLocale } from "date-fns/locale";

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
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    selectedDate || new Date()
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setCalendarMonth(selectedDate);
    }
  }, [selectedDate]);

  const handleWeekSelect = (date: Date | undefined) => {
    onChange(date);
    if (date) {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const end = endOfWeek(date, { weekStartsOn: 1 });
      onWeekRangeChange({ start, end });

      setOpen(false);
    } else {
      onWeekRangeChange(undefined);
    }
  };

  const handleClear = () => {
    onChange(undefined);
    onWeekRangeChange(undefined);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Label htmlFor="week-picker" className="text-sm whitespace-nowrap">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="week-picker"
            variant="outline"
            size="sm"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !weekRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {weekRange ? (
              `${format(weekRange.start, "dd MMM")} - ${format(
                weekRange.end,
                "dd MMM yy"
              )}`
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleWeekSelect}
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
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
              },
              today: {
                fontWeight: "bold",
                color: "hsl(var(--primary))",
              },
            }}
            initialFocus
            locale={indonesiaLocale}
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>
      {weekRange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
