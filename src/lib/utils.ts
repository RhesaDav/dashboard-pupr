import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  addDays,
  endOfMonth,
  format,
  isSameMonth,
  parse,
  startOfWeek,
} from "date-fns";
import { id } from "date-fns/locale";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function romanize(num: number) {
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

interface WeekItem {
  week: number;
  rencana: number;
  realisasi: number;
  deviasi: number;
  startDate: string;
  endDate: string;
}

interface MonthData {
  month: string;
  items: WeekItem[];
}

export const generateWeeks = (
  startDateStr: string,
  durationDays: number
): MonthData[] => {
  const startDate = parse(startDateStr, "dd-MM-yyyy", new Date());
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

    const adjustedEndDate = new Date(
      Math.min(
        endOfWeekDate.getTime(),
        endOfMonth(currentDate).getTime(),
        endDate.getTime()
      )
    );

    itemsInMonth.push({
      week: weekCounter,
      rencana: 0,
      realisasi: 0,
      deviasi: 0,
      startDate: format(startOfWeekDate, "dd MMM yyyy"),
      endDate: format(adjustedEndDate, "dd MMM yyyy"),
    });

    weekCounter++;
    currentDate = addDays(adjustedEndDate, 1);
  }

  if (currentMonth) {
    result.push({ month: currentMonth, items: itemsInMonth });
  }

  return result;
};

export function formatRupiah(amount: number) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: Math.trunc(Math.abs(amount)).toFixed().length
  }).format(amount);
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export async function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.errors.map((issue) => {
        return `${issue.path.join(".")}: ${issue.message}`;
      });
      throw new ValidationError(issues.join(", "));
    }
    throw error;
  }
}

export function handlePrismaError(error: unknown): never {
  // if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //   switch (error.code) {
  //     case "P2002":
  //       throw new ValidationError("Data sudah ada dalam database.");
  //     case "P2025":
  //       throw new NotFoundError("Data tidak ditemukan.");
  //     case "P2003":
  //       throw new ValidationError("Referensi data tidak valid.");
  //     default:
  //       throw new DatabaseError(`Database error: ${error.message}`);
  //   }
  // }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("Terjadi kesalahan yang tidak diketahui.");
}

export async function safeAction<T, R>(
  action: (data: T) => Promise<R>,
  data: T
): Promise<{ data: R | null; error: string | null }> {
  try {
    const result = await action(data);
    return { data: result, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: "Terjadi kesalahan yang tidak diketahui." };
  }
}

export function roundToOneDecimal (value: number) {
  return Math.round(value * 10) / 10;
};
