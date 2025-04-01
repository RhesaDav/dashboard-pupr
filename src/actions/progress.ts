"use server"
import { prisma } from "@/lib/prisma"; // Adjust import path as needed

/**
 * Fetches contract details and progress data for display in the UI
 */
export async function getContractWithProgress(contractId: string) {
  try {
    // 1. Fetch contract details
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

    // 2. Fetch progress data
    const progressEntries = await prisma.progress.findMany({
      where: {
        contractId: contractId,
      },
      orderBy: [
        { month: 'asc' },
        { week: 'asc' }
      ],
    });

    // 3. Group progress entries by month
    const groupedProgress = progressEntries.reduce((acc, entry) => {
      // Find if month already exists in accumulator
      const monthEntry = acc.find(item => item.month === entry.month);
      
      if (monthEntry) {
        // Add to existing month
        monthEntry.items.push({
          week: entry.week,
          rencana: entry.rencana,
          realisasi: entry.realisasi,
          deviasi: entry.deviasi,
        });
      } else {
        // Create new month entry
        acc.push({
          month: entry.month,
          items: [{
            week: entry.week,
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: entry.deviasi,
          }]
        });
      }
      
      return acc;
    }, [] as Array<{
      month: string;
      items: Array<{
        week: number;
        rencana: number;
        realisasi: number;
        deviasi: number;
      }>
    }>);

    return {
      contractDetails: {
        namaPaket: contract.namaPaket,
        nilaiKontrak: contract.nilaiKontrak,
        tanggalKontrak: contract.tanggalKontrak,
        masaPelaksanaan: contract.masaPelaksanaan,
        volumeKontrak: contract.volumeKontrak,
        satuanKontrak: contract.satuanKontrak,
      },
      progressData: groupedProgress
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
    // Calculate deviasi automatically
    const deviasi = data.realisasi - data.rencana;

    // Use upsert to either update an existing entry or create a new one
    const progressEntry = await prisma.progress.upsert({
      where: {
        // Using the unique constraint on contractId, month, week
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
  }>
) {
  try {
    // Begin a transaction to ensure all updates succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      const updatedEntries = [];
      
      for (const entry of entries) {
        // Calculate deviasi automatically
        const deviasi = entry.realisasi - entry.rencana;
        
        // Use upsert for each entry
        const updatedEntry = await tx.progress.upsert({
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
          },
          create: {
            contractId,
            month,
            week: entry.week,
            rencana: entry.rencana,
            realisasi: entry.realisasi,
            deviasi: deviasi,
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