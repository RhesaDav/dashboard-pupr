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
import { getCurrentUser } from "./auth";
import { addDays, parse } from "date-fns";

export const createContract = async (data: CreateContractType) => {
  try {
    const validatedData = CreateContractSchema.parse(data);

    const { 
      location, 
      financialProgress, 
      physicalProgress, 
      addendum, 
      contractAccess,
      ...contractData 
    } = validatedData;

    const totalAddendumDays = addendum?.map((item) => item.hari).reduce((acc, add) => acc + Number(add), 1)

    const newContract = await prisma.contract.create({
      data: {
        ...contractData,
        tanggalKontrak: parse(contractData.tanggalKontrak || "", "dd-MM-yyyy", new Date) || null,
        tanggalKontrakSupervisi: parse(contractData.tanggalKontrak || "", "dd-MM-yyyy", new Date) || null,
        startDate: parse(contractData.tanggalKontrak || "", "dd-MM-yyyy", new Date) || null,
        endDate: contractData.tanggalKontrak && totalAddendumDays ? addDays(parse(contractData.tanggalKontrak, "dd-MM-yyyy", new Date),totalAddendumDays + contractData.masaPelaksanaan) : null, 
        // Create location if provided
        ...(location ? {
          location: {
            create: location
          }
        } : {}),
        
        // Create financialProgress if provided
        ...(financialProgress ? {
          financialProgress: {
            create: financialProgress
          }
        } : {}),
        
        // Create physicalProgress entries if provided
        ...(physicalProgress && physicalProgress.length > 0 ? {
          physicalProgress: {
            create: physicalProgress
          }
        } : {}),
        
        // Create addendum entries if provided
        ...(addendum && addendum.length > 0 ? {
          addendum: {
            create: addendum
          }
        } : {}),
        
        // Create contract access entries if provided
        // ...(contractAccess && contractAccess.length > 0 ? {
        //   contractAccess: {
        //     create: contractAccess
        //   }
        // } : {
        //   // Always give access to the current user
        //   contractAccess: {
        //     create: {
        //       userId: session.user.id
        //     }
        //   }
        // })
      },
      include: {
        addendum: true // Optional: include addendums in the response
      }
    });

    revalidatePath("/dashboard/contracts", "page");

    return { success: true, contract: "newContract" };
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
    const user = await getCurrentUser();
    const skip = (page - 1) * limit;

    const isConsultant = user?.role === "CONSULTANT";

    const searchCondition: Prisma.ContractWhereInput = {
      ...(search && {
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
      }),
      ...(isConsultant && {
        contractAccess: {
          some: {
            userId: user?.id,
          },
        },
      }),
    };

    const contracts = await prisma.contract.findMany({
      where: searchCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        physicalProgress: true,
        financialProgress: true,
        location: true
      },
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
    // const prismaUpdateData: any = {
    //   ...validatedData,
    //   tanggalKontrak: parse(
    //     validatedData.tanggalKontrak || "",
    //     "dd-MM-yyyy",
    //     new Date()
    //   ),
    //   tanggalKontrakSupervisi: parse(
    //     validatedData.tanggalKontrakSupervisi || "",
    //     "dd-MM-yyyy",
    //     new Date()
    //   ),
    // };

    // // Handle the addendum relationship properly if it exists
    // if (validatedData.addendum) {
    //   // Transform the addendum array into Prisma's expected format
    //   prismaUpdateData.addendum = {
    //     // This will delete any removed addendums and update existing ones
    //     deleteMany: {
    //       contractId: id,
    //       // Only delete items that aren't in the updated list
    //       NOT: validatedData.addendum.map((item) => ({ id: item.id })),
    //     },
    //     // Update existing items or create new ones
    //     upsert: validatedData.addendum.map((item) => ({
    //       where: { id: item.id },
    //       update: {
    //         name: item.name,
    //         tipe: item.tipe,
    //         hari: item.hari,
    //         volume: item.volume,
    //         satuan: item.satuan,
    //       },
    //       create: {
    //         id: item.id,
    //         name: item.name,
    //         tipe: item.tipe,
    //         hari: item.hari,
    //         volume: item.volume,
    //         satuan: item.satuan,
    //       },
    //     })),
    //   };
    // }

    // // Remove addendum from the root object since it's now handled in the nested structure
    // delete prismaUpdateData.addendum;

    const {location, financialProgress, physicalProgress, addendum, contractAccess, ...newData} = validatedData

    const totalAddendumDays = addendum?.map((item) => item.hari).reduce((acc, add) => acc + Number(add), 1)
    // Perform the update with the transformed data
    const updatedContract = await prisma.contract.update({
      where: { id },
      data: {
        ...newData,
        tanggalKontrak: newData.tanggalKontrak ? parse(newData.tanggalKontrak, "dd-MM-yyyy", new Date) : undefined,
        tanggalKontrakSupervisi: newData.tanggalKontrakSupervisi ? parse(newData.tanggalKontrakSupervisi, "dd-MM-yyyy", new Date) : undefined,
        startDate: parse(newData.tanggalKontrak || "", "dd-MM-yyyy", new Date) || null,
        endDate: newData.tanggalKontrak && totalAddendumDays ? addDays(parse(newData.tanggalKontrak, "dd-MM-yyyy", new Date),totalAddendumDays + (newData.masaPelaksanaan || 0)) : null, 
        location: location ? {
          upsert: {
            create: location,
            update: location,
          }
        } : undefined,
        financialProgress: financialProgress ? {
          upsert: {
            create: financialProgress,
            update: financialProgress,
          }
        } : undefined,
        addendum: {
          deleteMany: {
            contractId: id,
            // Only delete items that aren't in the updated list
            NOT: validatedData.addendum?.map((item) => ({ id: item.id })),
          },
          // Update existing items or create new ones
          upsert: validatedData.addendum?.map((item) => ({
            where: { id: item.id },
            update: {
              name: item.name,
              tipe: item.tipe,
              hari: item.hari,
              volume: item.volume,
              satuan: item.satuan,
              pemberianKesempatan: item.pemberianKesempatan
            },
            create: {
              id: item.id,
              name: item.name,
              tipe: item.tipe,
              hari: item.hari,
              volume: item.volume,
              satuan: item.satuan,
              pemberianKesempatan: item.pemberianKesempatan
            },
          })),
        }
      },
      include: {
        addendum: true,
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
        contractAccess: true,
        addendum: true,
        physicalProgress: true,
        financialProgress: true,
        location: true
      },
    });

    if (!contract) {
      return {
        success: false,
        error: "Kontrak tidak ditemukan",
      };
    }

    const progress = await prisma.physicalProgress.findMany({
      where: { contractId: id },
    });
    const total = progress.reduce(
      (acc, item) => {
        acc.rencana += item.rencana;
        acc.realisasi += item.realisasi;
        acc.deviasi += item.deviasi;
        return acc;
      },
      { rencana: 0, realisasi: 0, deviasi: 0 }
    );

    return {
      success: true,
      data: {
        contract,
        progressTotal: total,
      },
    };
  } catch (error) {
    console.error("Error fetching contract:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil kontrak",
    };
  }
}
