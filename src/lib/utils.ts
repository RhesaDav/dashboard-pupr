import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, endOfMonth, format, isSameMonth, parse, startOfWeek } from "date-fns";
import {id} from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function romanize(num:number) {
  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

type WeekItem = {
  week: number;
  rencana: number;
  realisasi: number;
  deviasi: number;
};

type MonthData = {
  month: string;
  items: WeekItem[];
};

export const generateWeeks = (startDateStr: string, durationDays: number): MonthData[] => {
  const startDate = parse(startDateStr,"dd-MM-yyyy", new Date);
  const endDate = addDays(startDate, durationDays - 1);

  let currentDate = startDate;
  const result: MonthData[] = [];
  let currentMonth: string | null = null;
  let itemsInMonth: WeekItem[] = [];
  let weekCounter = 1;

  while (currentDate <= endDate) {
    const monthName = format(currentDate, "MMMM yyyy", { locale: id });

    if (currentMonth !== monthName) {
      if (currentMonth) {
        result.push({ month: currentMonth, items: itemsInMonth });
      }
      currentMonth = monthName;
      itemsInMonth = [];
      weekCounter = 1;
    }

    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfWeekDate = addDays(startOfWeekDate, 6);
    const endOfMonthDate = endOfMonth(currentDate);

    const lastDateInWeek = endOfWeekDate <= endOfMonthDate ? endOfWeekDate : endOfMonthDate;

    itemsInMonth.push({
      week: weekCounter,
      rencana: 0,
      realisasi: 0,
      deviasi: 0,
    });
    weekCounter++;

    currentDate = addDays(lastDateInWeek, 1);
  }

  if (currentMonth) {
    result.push({ month: currentMonth, items: itemsInMonth });
  }

  return result;
};

export function formatRupiah(amount: number) {
  return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
  }).format(amount);
}