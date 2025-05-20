"use server";
import { prisma } from "@/lib/prisma";
import {
  endOfDay,
  endOfWeek,
  format,
  parse,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { isWithinInterval, parseISO } from "date-fns";

export async function getAllProgress({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
} = {}): Promise<{ success: boolean; data: any }> {
  try {
    if (!startDate) {
      throw new Error("startDate is required");
    }

    const targetDate = parseISO(startDate);

    // Cari awal dan akhir minggu dari tanggal target
    const weekStart = startOfWeek(targetDate, { weekStartsOn: 1 }); // Minggu sebagai hari pertama
    const weekEnd = endOfWeek(targetDate, { weekStartsOn: 1 }); // Sabtu sebagai hari terakhir

    const allProgress = await prisma.physicalProgress.findMany({
      where: {
        // Filter untuk progress yang overlap dengan minggu target
        OR: [
          {
            // Progress yang dimulai dan berakhir dalam minggu target
            startDate: { gte: weekStart },
            endDate: { lte: weekEnd },
          },
          {
            // Progress yang dimulai sebelum minggu tapi berakhir dalam minggu
            startDate: { lt: weekStart },
            endDate: { gte: weekStart, lte: weekEnd },
          },
          {
            // Progress yang dimulai dalam minggu tapi berakhir setelah minggu
            startDate: { gte: weekStart, lte: weekEnd },
            endDate: { gt: weekEnd },
          },
          {
            // Progress yang mencakup seluruh minggu
            startDate: { lt: weekStart },
            endDate: { gt: weekEnd },
          },
        ],
      },
      include: {
        contract: true,
      },
      orderBy: { startDate: "asc" },
    });

    // Filter tambahan di sisi server untuk memastikan
    const filteredProgress = allProgress.filter((progress) => {
      if (!progress.startDate || !progress.endDate) return;
      return (
        isWithinInterval(progress.startDate, {
          start: weekStart,
          end: weekEnd,
        }) ||
        isWithinInterval(progress.endDate, {
          start: weekStart,
          end: weekEnd,
        }) ||
        (progress.startDate < weekStart && progress.endDate > weekEnd)
      );
    });

    // Kelompokkan berdasarkan kontrak
    const groupedByContract = filteredProgress.reduce((acc: any, progress) => {
      const contractId = progress.contractId;
      if (!acc[contractId]) {
        acc[contractId] = {
          contractId,
          ...progress.contract,
          progress: [],
        };
      }
      acc[contractId].progress.push(progress);
      return acc;
    }, {});

    return {
      success: true,
      data: Object.values(groupedByContract),
    };
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw new Error("Failed to fetch progress data");
  }
}

/**
 * Fetches contract details and progress data for display in the UI
 */
export async function getContractWithProgress(contractId: string) {
  try {
    const contract = await prisma.contract.findUnique({
      where: {
        id: contractId,
      },
      select: {
        namaPaket: true,
        nilaiKontrak: true,
        tanggalKontrak: true,
        masaPelaksanaan: true,
        volumeKontrak: true,
        satuanKontrak: true,
        totalAddendumWaktu: true
      },
    });

    if (!contract) {
      throw new Error("Contract not found");
    }

    const progressEntries = await prisma.physicalProgress.findMany({
      where: {
        contractId: contractId,
      },
      orderBy: [{ month: "asc" }, { week: "asc" }],
    });

    const groupedProgress = progressEntries.reduce(
      (acc, entry) => {
        const monthEntry = acc.find((item) => item.month === entry.month);

        if (monthEntry) {
          monthEntry.items.push({
            week: entry.week,
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: entry.deviasi,
            startDate: entry.startDate
              ? format(entry.startDate, "dd MMM yyyy")
              : null,
            endDate: entry.endDate
              ? format(entry.endDate, "dd MMM yyyy")
              : null,
            bermasalah: entry.bermasalah,
            keterangan: entry.keterangan,
            deskripsiMasalah: entry.deskripsiMasalah,
          });
        } else {
          acc.push({
            month: entry.month,
            items: [
              {
                week: entry.week,
                rencana: entry.rencana,
                realisasi: entry.realisasi,
                deviasi: entry.deviasi,
                startDate: entry.startDate
                  ? format(entry.startDate, "dd MMM yyyy")
                  : null,
                endDate: entry.endDate
                  ? format(entry.endDate, "dd MMM yyyy")
                  : null,
                bermasalah: entry.bermasalah,
                keterangan: entry.keterangan,
                deskripsiMasalah: entry.deskripsiMasalah,
              },
            ],
          });
        }

        return acc;
      },
      [] as Array<{
        month: string;
        items: Array<{
          week: number;
          rencana: number;
          realisasi: number;
          deviasi: number;
          startDate: string | null;
          endDate: string | null;
          bermasalah: boolean;
          deskripsiMasalah: string | null;
          keterangan: string | null;
        }>;
      }>
    );

    return {
      contractDetails: {
        namaPaket: contract.namaPaket,
        nilaiKontrak: contract.nilaiKontrak,
        tanggalKontrak: contract.tanggalKontrak,
        totalAddendumWaktu: contract.totalAddendumWaktu,
        masaPelaksanaan: contract.masaPelaksanaan,
        volumeKontrak: contract.volumeKontrak,
        satuanKontrak: contract.satuanKontrak,
      },
      progressData: groupedProgress,
    };
  } catch (error) {
    console.error("Error fetching contract with progress:", error);
    throw new Error("Failed to fetch contract data");
  }
}

/**
 * Updates progress entries for a specific contract, month, and week
 * Uses upsert to create the entry if it doesn't exist
 */
export async function updateProgressEntry(
  contractId: string,
  month: string,
  week: number,
  data: {
    rencana: number;
    realisasi: number;
  }
) {
  try {
    const deviasi = data.realisasi - data.rencana;

    const progressEntry = await prisma.physicalProgress.upsert({
      where: {
        contractId_month_week: {
          contractId,
          month,
          week,
        },
      },
      update: {
        rencana: data.rencana,
        realisasi: data.realisasi,
        deviasi: deviasi,
      },
      create: {
        contractId,
        month,
        week,
        rencana: data.rencana,
        realisasi: data.realisasi,
        deviasi: deviasi,
      },
    });

    return progressEntry;
  } catch (error) {
    console.error("Error updating progress entry:", error);
    throw new Error("Failed to update progress entry");
  }
}

/**
 * Updates multiple progress entries for a specific contract and month
 */
export async function updateContractProgress(
  contractId: string,
  entries: Array<{
    month: string;
    week: number;
    rencana: number;
    realisasi: number;
    startDate: string;
    endDate: string;
    bermasalah: boolean;
    deskripsiMasalah: string | null;
    keterangan: string | null;
  }>
) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const updatedEntries = [];
      for (const entry of entries) {
        const deviasi = entry.realisasi - entry.rencana;
        const updatedEntry = await tx.physicalProgress.upsert({
          where: {
            contractId_month_week: {
              contractId,
              month: entry.month,
              week: entry.week,
            },
          },
          update: {
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: deviasi,
            startDate: entry.startDate
              ? parse(entry.startDate, "dd MMM yyyy", new Date())
              : null,
            endDate: entry.endDate
              ? parse(entry.endDate, "dd MMM yyyy", new Date())
              : null,
            bermasalah: entry.bermasalah,
            deskripsiMasalah: entry.bermasalah ? entry.deskripsiMasalah : "",
            keterangan: entry.keterangan,
          },
          create: {
            contractId,
            month: entry.month,
            week: entry.week,
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: deviasi,
            startDate: entry.startDate
              ? parse(entry.startDate, "dd MMM yyyy", new Date())
              : null,
            endDate: entry.endDate
              ? parse(entry.endDate, "dd MMM yyyy", new Date())
              : null,
            bermasalah: entry.bermasalah,
            deskripsiMasalah: entry.bermasalah ? entry.deskripsiMasalah : "",
            keterangan: entry.keterangan,
          },
        });
        updatedEntries.push(updatedEntry);
      }
      return updatedEntries;
    });
    return result;
  } catch (error) {
    console.error("Error updating contract progress:", error);
    throw new Error("Failed to update contract progress");
  }
}
