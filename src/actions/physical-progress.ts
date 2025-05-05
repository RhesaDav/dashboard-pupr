"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError, NotFoundError, validateSchema } from "@/lib/utils";
import { IdSchema } from "@/schemas/id.schema";
import { PhysicalProgressUpdateSchema } from "@/schemas/physical-progress.schema";
import { z } from "zod";

export async function getPhysicalProgressByContract(id: string) {
  try {
    await validateSchema(IdSchema, { id });

    const contract = await prisma.physicalProgress.findMany({
      where: {
        contractId: id,
      },
      include: {
        contract: {
          select: {
            namaPaket: true,
            nilaiKontrak: true,
            masaPelaksanaan: true,
            tanggalKontrak: true,
          },
        },
      },
    });

    if (!contract) {
      throw new NotFoundError("Kontrak tidak ditemukan");
    }

    return { success: true, data: contract };
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function updatePhysicalProgress(
  updates: z.infer<typeof PhysicalProgressUpdateSchema>[]
) {
  try {
    const validatedUpdates = await Promise.all(
      updates.map(async (update) => {
        const result = PhysicalProgressUpdateSchema.safeParse(update);
        if (!result.success) {
          throw new Error(
            `Invalid data for progress ID ${update.id}: ${result.error.message}`
          );
        }
        return result.data;
      })
    );

    const results = await prisma.$transaction(async (tx) => {
      const updateResults = [];

      for (const update of validatedUpdates) {
        const { id, ...data } = update;

        const existing = await tx.physicalProgress.findUnique({
          where: { id },
        });

        if (!existing) {
          throw new Error(`Progress record with ID ${id} not found`);
        }

        const updated = await tx.physicalProgress.update({
          where: { id },
          data: {
            rencana: data.rencana,
            realisasi: data.realisasi,
            deviasi: (data.realisasi || 0) - (data.rencana || 0),
            bermasalah: data.bermasalah,
            deskripsiMasalah: data.deskripsiMasalah,
            keterangan: data.keterangan,
            updatedAt: new Date(),
          },
        });

        updateResults.push(updated);
      }

      return updateResults;
    });

    return {
      success: true,
      message: `${results.length} progress records updated successfully`,
      data: results,
    };
  } catch (error) {
    console.error("Failed to update physical progress:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update physical progress",
    };
  }
}
