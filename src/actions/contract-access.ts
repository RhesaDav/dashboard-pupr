"use server"
import { prisma } from "@/lib/prisma";

export async function getUserContractAccess(userId: string) {
  return await prisma.contractAccess.findMany({
    where: { userId },
    include: { contract: true }
  });
}

export async function grantContractAccess(userId: string, contractId: string) {
  return await prisma.contractAccess.create({
    data: { userId, contractId }
  });
}

export async function revokeContractAccess(userId: string, contractId: string) {
  return await prisma.contractAccess.delete({
    where: {
      userId_contractId: {
        userId,
        contractId
      }
    }
  });
}

export async function updateContractAccess(
  userId: string,
  contractIds: string[]
) {
  return await prisma.$transaction(async (tx) => {
    // Hapus semua akses yang ada
    await tx.contractAccess.deleteMany({
      where: { userId }
    });

    // Tambahkan akses baru
    if (contractIds.length > 0) {
      await tx.contractAccess.createMany({
        data: contractIds.map(contractId => ({
          userId,
          contractId
        }))
      });
    }

    return { success: true };
  });
}