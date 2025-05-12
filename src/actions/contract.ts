"use server";
import { z, ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  CompleteContractCreate,
  CompleteContractCreateSchema,
  ContractUpdate,
  ContractUpdateSchema,
} from "@/schemas/contract.schema";
import {
  ContractFilter,
  ContractFilterSchema,
} from "@/schemas/contract-filter.schema";
import {
  handlePrismaError,
  NotFoundError,
  safeAction,
  validateSchema,
} from "@/lib/utils";
import { IdSchema } from "@/schemas/id.schema";
import { format } from "date-fns";
import { getCurrentUser } from "./auth";
import { cookies } from "next/headers";

interface ProgressItem {
  week: number;
  startDate: Date;
  endDate: Date;
  rencana: number;
  realisasi: number;
  deviasi: number;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function generateWeeks(startDate: Date, durationDays: number) {
  const weeks: { month: string; items: ProgressItem[] }[] = [];

  let currentDate = new Date(startDate);
  const endDate = addDays(startDate, durationDays);

  let weekNumber = 1;
  let currentMonth = "";
  let currentMonthData: { month: string; items: ProgressItem[] } | null = null;

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  const monthName = formatMonth(currentDate);
  currentMonth = monthName;
  currentMonthData = {
    month: monthName,
    items: [],
  };
  weeks.push(currentMonthData);

  const dayOfWeek = currentDate.getDay();
  const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const firstWeekEnd = addDays(currentDate, daysToSunday);

  const actualFirstWeekEnd = firstWeekEnd > endDate ? endDate : firstWeekEnd;

  currentMonthData.items.push({
    week: weekNumber,
    startDate: new Date(currentDate),
    endDate: new Date(actualFirstWeekEnd),
    rencana: 0,
    realisasi: 0,
    deviasi: 0,
  });

  currentDate = addDays(actualFirstWeekEnd, 1);
  weekNumber++;

  while (currentDate <= endDate) {
    const monthName = formatMonth(currentDate);
    const weekStart = new Date(currentDate);
    const weekEnd = addDays(weekStart, 6);
    const actualWeekEnd = weekEnd > endDate ? endDate : weekEnd;

    if (monthName !== currentMonth) {
      currentMonth = monthName;
      currentMonthData = {
        month: monthName,
        items: [],
      };
      weeks.push(currentMonthData);
    }

    if (currentMonthData) {
      currentMonthData.items.push({
        week: weekNumber,
        startDate: weekStart,
        endDate: actualWeekEnd,
        rencana: 0,
        realisasi: 0,
        deviasi: 0,
      });
    }

    currentDate = addDays(currentDate, 7);
    weekNumber++;
  }

  return weeks;
}

export async function createContract(data: CompleteContractCreate) {
  try {
    const validatedData = await validateSchema(
      CompleteContractCreateSchema,
      data
    );

    const {
      financialProgress,
      location,
      physicalProgress,
      addendum,
      accessUserIds,
      ...contractData
    } = validatedData;

    if (!contractData.tanggalKontrak) {
      throw new Error("Tanggal kontrak harus diisi");
    }

    const generatedProgress = generateWeeks(
      contractData.tanggalKontrak,
      contractData.masaPelaksanaan || 0
    );

    const result = await prisma.$transaction(async (tx) => {
      const contract = await tx.contract.create({
        data: {
          ...contractData,
          tanggalKontrak: contractData.tanggalKontrak,
          tanggalKontrakSupervisi: contractData.tanggalKontrakSupervisi || null,
          hasAddendum: addendum && addendum.length > 0 ? true : false,
        },
      });

      if (financialProgress) {
        await tx.financialProgress.create({
          data: {
            ...financialProgress,
            contractId: contract.id,
          },
        });
      }

      if (location) {
        await tx.location.create({
          data: {
            ...location,
            contractId: contract.id,
          },
        });
      }

      for (const monthData of generatedProgress) {
        await tx.physicalProgress.createMany({
          data: monthData.items.map((item) => ({
            contractId: contract.id,
            month: monthData.month,
            week: item.week,
            startDate: item.startDate,
            endDate: item.endDate,
            rencana: 0,
            realisasi: 0,
            deviasi: 0,
          })),
        });
      }

      if (addendum && addendum.length > 0) {
        await tx.addendum.createMany({
          data: addendum.map((item) => ({
            ...item,
            contractId: contract.id,
          })),
        });
      }

      if (accessUserIds && accessUserIds.length > 0) {
        await tx.contractAccess.createMany({
          data: accessUserIds.map((userId) => ({
            contractId: contract.id,
            userId,
          })),
        });
      }

      return contract;
    });

    revalidatePath("/contracts");
    return { success: true, data: result };
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function getContractById(id: string) {
  try {
    await validateSchema(IdSchema, { id });

    const contract = await prisma.contract.findUnique({
      where: { id },
      include: {
        financialProgress: true,
        location: true,
        physicalProgress: true,
        addendum: {
          orderBy: { createdAt: "asc" },
        },
        contractAccess: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                lastLoggedIn: true,
                createdAt: true,
                updatedAt: true,
              },
            },
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

export async function getAllContracts(filterParams: any = {}) {
  try {
    const filter = {
      page: 1,
      limit: 10,
      ...filterParams,
    };
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    const budgetYear = cookieStore.get("budgetYear")?.value || null;

    const validatedFilter = await validateSchema(ContractFilterSchema, filter);

    const { search, startDate, endDate, sumberDana, hasKendala, page, limit } =
      validatedFilter;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (user?.role === "CONSULTANT") {
      where.contractAccess = {
        some: {
          userId: user.id,
        },
      };
    }

    if (budgetYear) {
      const budgetYearNum = parseInt(budgetYear);
      const startOfYear = new Date(budgetYearNum, 0, 1);
      const endOfYear = new Date(budgetYearNum, 11, 31, 23, 59, 59, 999);
      
      where.tanggalKontrak = {
        ...where.tanggalKontrak,
        gte: startOfYear,
        lte: endOfYear
      };
    }

    if (search) {
      where.OR = [
        { namaPaket: { contains: search, mode: "insensitive" } },
        { namaPenyedia: { contains: search, mode: "insensitive" } },
        { nomorKontrak: { contains: search, mode: "insensitive" } },
      ];
    }

    if (startDate) {
      where.tanggalKontrak = { gte: startDate };
    }

    if (endDate) {
      where.tanggalKontrak = { ...where.tanggalKontrak, lte: endDate };
    }

    if (sumberDana) {
      where.sumberDana = { equals: sumberDana };
    }

    if (hasKendala !== undefined) {
      where.kendala = hasKendala;
    }

    const total = await prisma.contract.count({ where });

    const contracts = await prisma.contract.findMany({
      where,
      skip,
      take: limit,
      orderBy: { updatedAt: "desc" },
      include: {
        physicalProgress: true,
        financialProgress: true,
        location: true,
        addendum: true,
        _count: {
          select: {
            physicalProgress: true,
            addendum: true,
          },
        },
      },
    });

    return {
      success: true,
      data: contracts,
      pagination: {
        total,
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function updateContract(id: string, updateData: any) {
  try {
    await validateSchema(IdSchema, { id });

    const {
      financialProgress,
      location,
      physicalProgress,
      addendum,
      accessUserIds,
      ...contractData
    } = updateData;

    const validatedContractData = await validateSchema(
      ContractUpdateSchema,
      contractData
    );

    const existingContract = await prisma.contract.findUnique({
      where: { id },
      include: {
        financialProgress: true,
        location: true,
        physicalProgress: true,
        addendum: true,
        contractAccess: true,
      },
    });

    if (!existingContract) {
      throw new NotFoundError("Kontrak tidak ditemukan");
    }

    const existingStartDate = existingContract.tanggalKontrak
      ? new Date(existingContract.tanggalKontrak)
      : null;
    const newStartDate = validatedContractData.tanggalKontrak
      ? new Date(validatedContractData.tanggalKontrak)
      : null;

    const isDurationChanged =
      validatedContractData.masaPelaksanaan !== undefined &&
      validatedContractData.masaPelaksanaan !==
        existingContract.masaPelaksanaan;

    const isStartDateChanged =
      validatedContractData.tanggalKontrak !== undefined &&
      ((existingStartDate === null && newStartDate !== null) ||
        (existingStartDate !== null && newStartDate === null) ||
        (existingStartDate !== null &&
          newStartDate !== null &&
          existingStartDate.getTime() !== newStartDate.getTime()));

    const shouldRegenerateProgress = isDurationChanged || isStartDateChanged;

    const result = await prisma.$transaction(async (tx) => {
      if (
        shouldRegenerateProgress &&
        existingContract.physicalProgress.length > 0
      ) {
        await tx.physicalProgress.deleteMany({
          where: { contractId: id },
        });
      }

      const updatedContract = await tx.contract.update({
        where: { id },
        data: {
          ...validatedContractData,
          tanggalKontrak:
            validatedContractData.tanggalKontrak ||
            existingContract.tanggalKontrak,
          tanggalKontrakSupervisi:
            validatedContractData.tanggalKontrakSupervisi ||
            existingContract.tanggalKontrakSupervisi ||
            null,
          hasAddendum:
            addendum && addendum.length > 0
              ? true
              : existingContract.hasAddendum,
        },
      });

      if (shouldRegenerateProgress) {
        const effectiveStartDate = newStartDate || existingStartDate;
        const effectiveDuration =
          validatedContractData.masaPelaksanaan ||
          existingContract.masaPelaksanaan;

        if (!effectiveStartDate) {
          throw new Error(
            "Tidak dapat generate progress tanpa tanggal kontrak"
          );
        }

        const newProgressData = generateWeeks(
          effectiveStartDate,
          effectiveDuration || 0
        );

        for (const monthData of newProgressData) {
          await tx.physicalProgress.createMany({
            data: monthData.items.map((item) => ({
              contractId: id,
              month: monthData.month,
              week: item.week,
              startDate: item.startDate,
              endDate: item.endDate,
              rencana: 0,
              realisasi: 0,
              deviasi: 0,
            })),
          });
        }
      }

      if (financialProgress) {
        if (existingContract.financialProgress) {
          await tx.financialProgress.update({
            where: { id: existingContract.financialProgress.id },
            data: financialProgress,
          });
        } else {
          await tx.financialProgress.create({
            data: {
              ...financialProgress,
              contractId: id,
            },
          });
        }
      }

      if (location) {
        if (existingContract.location) {
          await tx.location.update({
            where: { id: existingContract.location.id },
            data: location,
          });
        } else {
          await tx.location.create({
            data: {
              ...location,
              contractId: id,
            },
          });
        }
      }

      if (addendum && Array.isArray(addendum)) {
        const existingAddendumIds = existingContract.addendum.map((a) => a.id);

        for (const addendumItem of addendum) {
          if (addendumItem.id) {
            await tx.addendum.update({
              where: { id: addendumItem.id },
              data: {
                name: addendumItem.name,
                tipe: addendumItem.tipe,
                hari: addendumItem.hari,
                volume: addendumItem.volume,
                satuan: addendumItem.satuan,
                pemberianKesempatan: addendumItem.pemberianKesempatan,
              },
            });

            const index = existingAddendumIds.indexOf(addendumItem.id);
            if (index > -1) {
              existingAddendumIds.splice(index, 1);
            }
          } else {
            await tx.addendum.create({
              data: {
                contractId: id,
                name: addendumItem.name,
                tipe: addendumItem.tipe,
                hari: addendumItem.hari,
                volume: addendumItem.volume,
                satuan: addendumItem.satuan,
                pemberianKesempatan: addendumItem.pemberianKesempatan || false,
              },
            });
          }
        }

        if (existingAddendumIds.length > 0) {
          await tx.addendum.deleteMany({
            where: {
              id: {
                in: existingAddendumIds,
              },
            },
          });
        }
      }

      if (accessUserIds && Array.isArray(accessUserIds)) {
        const existingAccessUserIds = existingContract.contractAccess.map(
          (a) => a.userId
        );

        const userIdsToAdd = accessUserIds.filter(
          (id) => !existingAccessUserIds.includes(id)
        );

        const userIdsToRemove = existingAccessUserIds.filter(
          (id) => !accessUserIds.includes(id)
        );

        if (userIdsToAdd.length > 0) {
          await tx.contractAccess.createMany({
            data: userIdsToAdd.map((userId) => ({
              contractId: id,
              userId,
            })),
          });
        }

        if (userIdsToRemove.length > 0) {
          await tx.contractAccess.deleteMany({
            where: {
              contractId: id,
              userId: {
                in: userIdsToRemove,
              },
            },
          });
        }
      }

      return updatedContract;
    });

    revalidatePath("/contracts");
    revalidatePath(`/contracts/${id}`);
    revalidatePath(`/contracts/${id}/progress`);

    return { success: true, data: result };
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function deleteContract(id: string) {
  try {
    await validateSchema(IdSchema, { id });

    const result = await prisma.$transaction(async (tx) => {
      await tx.financialProgress.deleteMany({
        where: { contractId: id },
      });

      await tx.physicalProgress.deleteMany({
        where: { contractId: id },
      });

      await tx.location.deleteMany({
        where: { contractId: id },
      });

      await tx.addendum.deleteMany({
        where: { contractId: id },
      });

      await tx.contractAccess.deleteMany({
        where: { contractId: id },
      });

      const deletedContract = await tx.contract.delete({
        where: { id },
      });

      return deletedContract;
    });

    revalidatePath("/contracts");

    return { success: true, data: result };
  } catch (error) {
    throw handlePrismaError(error);
  }
}
