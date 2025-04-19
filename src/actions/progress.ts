"use server";
import { prisma } from "@/lib/prisma"; 
import { format, parse } from "date-fns";

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
            endDate: entry.endDate ? format(entry.endDate, "dd MMM yyyy") : null,
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
        }>;
      }>
    );

    return {
      contractDetails: {
        namaPaket: contract.namaPaket,
        nilaiKontrak: contract.nilaiKontrak,
        tanggalKontrak: contract.tanggalKontrak,
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
export async function updateMonthlyProgress(
  contractId: string,
  month: string,
  entries: Array<{
    week: number;
    rencana: number;
    realisasi: number;
    startDate: string;
    endDate: string;
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
              month,
              week: entry.week,
            },
          },
          update: {
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: deviasi,
            startDate: entry.startDate ? parse(entry.startDate, "dd MMM yyyy", new Date) : null,
            endDate: entry.endDate ? parse(entry.endDate, "dd MMM yyyy", new Date) : null,
          },
          create: {
            contractId,
            month,
            week: entry.week,
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: deviasi,
            startDate: entry.startDate ? parse(entry.startDate, "dd MMM yyyy", new Date) : null,
            endDate: entry.endDate ? parse(entry.endDate, "dd MMM yyyy", new Date) : null,
          },
        });

        updatedEntries.push(updatedEntry);
      }

      return updatedEntries;
    });

    return result;
  } catch (error) {
    console.error("Error updating monthly progress:", error);
    throw new Error("Failed to update monthly progress");
  }
}
