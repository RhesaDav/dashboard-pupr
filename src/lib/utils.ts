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
import { Prisma } from "@/generated/prisma";

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

const FIELD_LABELS: Record<string, string> = {
  namaPaket: "Nama Paket",
  namaPenyedia: "Nama Penyedia",
  ppk: "Pejabat Pembuat Komitmen (PPK)",
  nipPPK: "NIP PPK",
  nomorKontrak: "Nomor Kontrak",
  tanggalKontrak: "Tanggal Kontrak",
  masaPelaksanaan: "Masa Pelaksanaan",
  subKegiatan: "Sub Kegiatan",
  volumeKontrak: "Volume Kontrak",
  satuanKontrak: "Satuan Kontrak",
  paguAnggaran: "Pagu Anggaran",
  nilaiKontrak: "Nilai Kontrak",
  sumberDana: "Sumber Dana",
  "location.kota": "Kota/Kabupaten",
  "location.distrik": "Distrik",
  "location.kampung": "Kampung",
  "location.koordinatAwal": "Koordinat Awal",
  korwaslap: "Koordinator Pengawas Lapangan",
  nipKorwaslap: "NIP Korwaslap",
  pengawasLapangan: "Pengawas Lapangan",
  nipPengawasLapangan: "NIP Pengawas Lapangan",
  email: "Email",
  password: "Password",
  name: "Nama",
  role: "Role",
};

function translateZodIssue(issue: z.ZodIssue): string {
  const path = issue.path.join(".");
  const label = FIELD_LABELS[path] || path;

  switch (issue.code) {
    case "invalid_type":
      if (issue.received === "undefined" || issue.received === "null") {
        return `${label} wajib diisi`;
      }
      return `${label} tipe data tidak valid`;
    case "too_small":
      if (issue.type === "string")
        return `${label} minimal ${issue.minimum} karakter`;
      if (issue.type === "number")
        return `${label} minimal bernilai ${issue.minimum}`;
      return `${label} terlalu kecil`;
    case "too_big":
      if (issue.type === "string")
        return `${label} maksimal ${issue.maximum} karakter`;
      if (issue.type === "number")
        return `${label} maksimal bernilai ${issue.maximum}`;
      return `${label} terlalu besar`;
    case "invalid_string":
      if (issue.validation === "email") return `${label} format email tidak valid`;
      return `${label} format tidak valid`;
    default:
      return `${label}: ${issue.message}`;
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
      const issues = error.errors.map((issue) => translateZodIssue(issue));
      throw new ValidationError(`Kesalahan validasi: ${issues.join(", ")}`);
    }
    throw error;
  }
}

export function handlePrismaError(error: any): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new ValidationError("Data dengan nilai tersebut sudah ada (duplikat).");
      case "P2025":
        throw new NotFoundError("Data tidak ditemukan.");
      case "P2003":
        throw new ValidationError("Referensi data tidak valid atau masih digunakan oleh data lain.");
      default:
        throw new DatabaseError(`Kesalahan database (${error.code}): ${(error as any).message}`);
    }
  }

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
