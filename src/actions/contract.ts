"use server";
import { z, ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  CreateContractSchema,
  CreateContractType,
  UpdateContractSchema,
  UpdateContractType,
} from "@/schemas/contractSchemas";
import { Prisma } from "@prisma/client";

export const createContract = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const submitData = {
      ...data,
      nilaiKontrak: Number(data.nilaiKontrak),
      volumeCapaian: Number(data.volumeCapaian),
      keuanganTerbayar: Number(data.keuanganTerbayar),
      nilaiAnggaran: Number(data.nilaiAnggaran),
      volumeKontrak: Number(data.volumeKontrak),
      progresFisik: Number(data.progresFisik),
      progresKeuangan: Number(data.progresKeuangan),
    };

    const validatedData = CreateContractSchema.parse(submitData);

    const newContract = await prisma.contract.create({
      data: validatedData,
    });

    revalidatePath("/dashboard/contracts", "page");

    return { success: true, contract: newContract };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.errors);
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something wrong" };
  }
};

export const getAllContracts = async (page = 1, limit = 10, search = "") => {
  try {
    const skip = (page - 1) * limit;

    const searchCondition: Prisma.ContractWhereInput = search
      ? {
          OR: [
            {
              namaPaket: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
            {
              nomorKontrak: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    const contracts = await prisma.contract.findMany({
      where: searchCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalContracts = await prisma.contract.count({
      where: searchCondition,
    });

    const totalPages = Math.ceil(totalContracts / limit);

    return {
      success: true,
      contracts,
      pagination: {
        total: totalContracts,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Something wrong",
    };
  }
};

export async function editContract(
  id: string,
  rawData: Partial<UpdateContractType>
) {
  try {
    const validatedData = UpdateContractSchema.partial().parse(rawData);

    const updatedContract = await prisma.contract.update({
      where: { id },
      data: validatedData,
    });
    revalidatePath("/dashboard/contracts", "page");

    return {
      success: true,
      data: updatedContract,
      message: "Kontrak berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error updating contract:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validasi data gagal",
        details: error.errors,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Gagal memperbarui kontrak",
    };
  }
}

export async function deleteContract(id: string) {
  try {
    const deletedContract = await prisma.contract.delete({
      where: { id },
    });

    revalidatePath("/dashboard/contracts", "page");

    return {
      success: true,
      data: deletedContract,
      message: "Kontrak berhasil dihapus",
    };
  } catch (error) {
    console.error("Error deleting contract:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus kontrak",
    };
  }
}

export async function getContractById(id: string) {
  try {
    const contract = await prisma.contract.findUnique({
      where: { id },
    });

    if (!contract) {
      return {
        success: false,
        error: "Kontrak tidak ditemukan",
      };
    }

    return {
      success: true,
      data: contract,
    };
  } catch (error) {
    console.error("Error fetching contract:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil kontrak",
    };
  }
}
