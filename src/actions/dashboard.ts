"use server";

import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";

export async function getDashboardReport() {
  try {
    // Get total number of contracts
    const jumlahPaket = await prisma.contract.count();

    // Get total contract value
    const nilaiKontrak = await prisma.contract.aggregate({
      _sum: { nilaiKontrak: true },
    });

    // Get total budget allocation
    const nilaiAnggaran = await prisma.contract.aggregate({
      _sum: { nilaiKontrak: true }, // Assuming paguAnggaran is stored as a numeric type
    });

    // Get average physical progress (rencana & realisasi)
    const progressFisik = await prisma.progress.aggregate({
      _avg: { realisasi: true },
    });

    // Get financial progress (sum of termin payments)
    const progressKeuangan = await prisma.contract.aggregate({
      _sum: {
        uangMuka: true,
        termin1: true,
        termin2: true,
        termin3: true,
        termin4: true,
      },
    });

    const result = {
      jumlahPaket,
      nilaiKontrak: nilaiKontrak._sum.nilaiKontrak || 0,
      nilaiAnggaran: nilaiAnggaran._sum.nilaiKontrak || 0,
      progressFisik: progressFisik._avg.realisasi || 0,
      progressKeuangan:
        (progressKeuangan._sum.uangMuka || 0) +
        (progressKeuangan._sum.termin1 || 0) +
        (progressKeuangan._sum.termin2 || 0) +
        (progressKeuangan._sum.termin3 || 0) +
        (progressKeuangan._sum.termin4 || 0),
    };
    return { success: true, report: result };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.errors);
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }
    if (error instanceof Error) {
      console.log(error);
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something wrong" };
  }
}
