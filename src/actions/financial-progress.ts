"use server"
import { updatePaket } from "@/lib/pgClient";
import { prisma } from "@/lib/prisma";
import { handlePrismaError, validateSchema } from "@/lib/utils";
import {
  FinancialProgressCreate,
  FinancialProgressCreateSchema,
} from "@/schemas/financial-progress.schema";
import { revalidatePath } from "next/cache";

export const upsertFinancialProgress = async (
  data: FinancialProgressCreate
) => {
  try {
    const validatedData = await validateSchema(FinancialProgressCreateSchema, data);

    const existingContract = await prisma.contract.findUnique({
      where: { id: validatedData.contractId },
    });

    if (!existingContract) {
      return {
        success: false,
        error: "Kontrak tidak ditemukan",
      };
    }

    const existingProgress = await prisma.financialProgress.findUnique({
      where: { contractId: validatedData.contractId },
    });

    let progress;

    if (existingProgress) {
      progress = await prisma.financialProgress.update({
        where: { contractId: validatedData.contractId },
        data: {
          totalProgress: validatedData.totalProgress,
          totalPayment: validatedData.totalPayment,
          uangMuka: validatedData.uangMuka,
          termin1: validatedData.termin1,
          termin2: validatedData.termin2,
          termin3: validatedData.termin3,
          termin4: validatedData.termin4,
        },
      });
    } else {
      progress = await prisma.financialProgress.create({
        data: validatedData,
      });
    }

    // Temporarily disabled secondary database sync
    /*
    await updatePaket({
      id: existingContract.id,
      progresKeuangan: String(validatedData.totalPayment)
    })
    */

    revalidatePath(`/contracts/${validatedData.contractId}`);

    return {
      success: true,
      data: progress,
    };
  } catch (error: any) {
    console.error("Error in upsertFinancialProgress:", error);
    try {
      handlePrismaError(error);
    } catch (e: any) {
      return {
        success: false,
        error: e.message || "Gagal memperbarui progress keuangan",
      };
    }
  }
};
