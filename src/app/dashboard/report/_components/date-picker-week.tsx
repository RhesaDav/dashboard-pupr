"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

export default function WeekPicker() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const startDate = selectedDate
    ? startOfWeek(selectedDate, { weekStartsOn: 0 })
    : undefined;
  const endDate = selectedDate
    ? endOfWeek(selectedDate, { weekStartsOn: 0 })
    : undefined;

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const formatWeekDisplay = () => {
    if (!startDate || !endDate) return <span>Select a week</span>;

    return (
      <span>
        {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
      </span>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatWeekDisplay()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
            className="week-picker-calendar"
          />
        </div>
        <style jsx global>{`
          .week-picker-calendar .rdp-day_selected,
          .week-picker-calendar .rdp-day_selected:focus-visible,
          .week-picker-calendar .rdp-day_selected:hover {
            background-color: var(--primary);
            color: var(--primary-foreground);
          }

          .week-picker-calendar .rdp-day.rdp-day_selected {
            opacity: 1;
          }

          .week-picker-calendar .rdp-day.rdp-day_range_start,
          .week-picker-calendar .rdp-day.rdp-day_range_middle,
          .week-picker-calendar .rdp-day.rdp-day_range_end {
            background-color: var(--primary);
            color: var(--primary-foreground);
          }
        `}</style>
      </PopoverContent>
    </Popover>
  );
}
