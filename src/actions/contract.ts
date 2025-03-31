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
      masaPelaksanaan: Number(data.masaPelaksanaan),
      nilaiKontrak: Number(data.nilaiKontrak),
      masaPelaksanaanSupervisi: Number(data.masaPelaksanaanSupervisi),
      pemberianKesempatan: Boolean(data.pemberianKesempatan),
      kendala: Boolean(data.kendala),
      uangMuka: Number(data.uangMuka),
      termin1: Number(data.termin1),
      termin2: Number(data.termin2),
      termin3: Number(data.termin3),
      termin4: Number(data.termin4),
      volumeKontrak: String(data.volumeKontrak || ""),
      addendum: data.addendum ? JSON.parse(data.addendum as string) : [],
    };

    console.log(submitData);

    const validatedData = CreateContractSchema.parse(submitData);

    const newContract = await prisma.contract.create({
      data: {
        ...validatedData,
        tanggalKontrak: new Date(validatedData.tanggalKontrak),
        tanggalKontrakSupervisi: new Date(
          validatedData.tanggalKontrakSupervisi
        ),
        addendum: {
          create: validatedData.addendum,
        },
      },
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
      console.log(error);
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
    // Validate the incoming data
    const validatedData = UpdateContractSchema.partial().parse(rawData);

    // Create a Prisma-compatible update object
    const prismaUpdateData: any = {
      ...validatedData,
      tanggalKontrak: new Date(validatedData.tanggalKontrak || new Date),
      tanggalKontrakSupervisi: new Date(validatedData.tanggalKontrakSupervisi || new Date),
    };

    // Handle the addendum relationship properly if it exists
    if (validatedData.addendum) {
      // Transform the addendum array into Prisma's expected format
      prismaUpdateData.addendum = {
        // This will delete any removed addendums and update existing ones
        deleteMany: {
          contractId: id,
          // Only delete items that aren't in the updated list
          NOT: validatedData.addendum.map((item) => ({ id: item.id })),
        },
        // Update existing items or create new ones
        upsert: validatedData.addendum.map((item) => ({
          where: { id: item.id },
          update: {
            name: item.name,
            tipe: item.tipe,
            hari: item.hari,
            volume: item.volume,
            satuan: item.satuan,
          },
          create: {
            id: item.id,
            name: item.name,
            tipe: item.tipe,
            hari: item.hari,
            volume: item.volume,
            satuan: item.satuan,
          },
        })),
      };
    }

    // Remove addendum from the root object since it's now handled in the nested structure
    delete prismaUpdateData.addendum;

    // Perform the update with the transformed data
    const updatedContract = await prisma.contract.update({
      where: { id },
      data: prismaUpdateData,
      include: {
        addendum: true, // Include the updated addendum in the response
      },
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
      include: {
        addendum: true,
      },
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
