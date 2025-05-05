"use server"
import { prisma } from "@/lib/prisma";
import {
  FinancialProgressCreate,
  FinancialProgressCreateSchema,
} from "@/schemas/financial-progress.schema";
import { revalidatePath } from "next/cache";

export const upsertFinancialProgress = async (
  data: FinancialProgressCreate
) => {
  try {
    const validatedData = FinancialProgressCreateSchema.parse(data);

    const existingContract = await prisma.contract.findUnique({
      where: { id: validatedData.contractId },
    });

    if (!existingContract) {
      return {
        status: "error",
        error: "Contract not found",
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

    revalidatePath(`/contracts/${validatedData.contractId}`);

    return {
      status: "success",
      data: progress,
    };
  } catch (error) {}
};
