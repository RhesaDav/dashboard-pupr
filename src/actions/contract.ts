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
import { deletePaket, insertPaket, pgClient } from "@/lib/pgClient";

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

  if (durationDays <= 0) {
    return weeks;
  }

  const endDate = addDays(startDate, durationDays - 1);

  // Helper function to get Monday of the week containing the given date
  const getMondayOfWeek = (date: Date) => {
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const monday = new Date(date);
    
    if (day === 0) {
      // If it's Sunday, go back 6 days to get Monday
      monday.setDate(date.getDate() - 6);
    } else {
      // For other days, go back (day - 1) days to get Monday
      monday.setDate(date.getDate() - (day - 1));
    }
    
    return monday;
  };

  // Helper function to get Sunday of the week containing the given date
  const getSundayOfWeek = (date: Date) => {
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const sunday = new Date(date);
    
    if (day === 0) {
      // If it's already Sunday, return as is
      return sunday;
    } else {
      // Go forward to Sunday
      sunday.setDate(date.getDate() + (7 - day));
    }
    
    return sunday;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  // Start from the Monday of the week containing startDate
  let currentWeekStart = getMondayOfWeek(startDate);
  let weekNumber = 1;
  let currentMonth = "";
  let currentMonthData: { month: string; items: ProgressItem[] } | null = null;

  while (currentWeekStart <= endDate) {
    // Calculate the Sunday of current week
    const currentWeekEnd = getSundayOfWeek(currentWeekStart);
    
    // Determine the actual start and end dates for this week within project bounds
    const actualWeekStart = currentWeekStart < startDate ? startDate : currentWeekStart;
    const actualWeekEnd = currentWeekEnd > endDate ? endDate : currentWeekEnd;

    // Skip if this week doesn't overlap with project duration
    if (actualWeekStart > endDate || actualWeekEnd < startDate) {
      currentWeekStart = addDays(currentWeekStart, 7);
      weekNumber++;
      continue;
    }

    // Determine which month this week belongs to
    // Use the start date of the week (or project start if week starts before project)
    const monthName = formatMonth(actualWeekStart);

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
        startDate: actualWeekStart,
        endDate: actualWeekEnd,
        rencana: 0,
        realisasi: 0,
        deviasi: 0,
      });
    }

    // Move to next week (next Monday)
    currentWeekStart = addDays(currentWeekStart, 7);
    weekNumber++;
  }

  return weeks;
}


export async function createContract(data: CompleteContractCreate) {
  try {
    const user = await getCurrentUser();
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

    const tanggalSelesaiAwal = addDays(
      contractData.tanggalKontrak,
      contractData.masaPelaksanaan || 0
    );

    let totalAddendumWaktu = 0;
    if (addendum && addendum.length > 0) {
      totalAddendumWaktu = addendum
        .filter((item) => item.tipe === "waktu" && item.hari)
        .reduce((sum, item) => sum + (item.hari || 0), 0);
    }

    const tanggalSelesaiAkhir = addDays(tanggalSelesaiAwal, totalAddendumWaktu);

    const totalDayAccumulate =
      (contractData.masaPelaksanaan || 0) + totalAddendumWaktu;

    const generatedProgress = generateWeeks(
      contractData.tanggalKontrak,
      totalDayAccumulate
    );

    const result = await prisma.$transaction(async (tx) => {
      const contract = await tx.contract.create({
        data: {
          ...contractData,
          tanggalKontrak: contractData.tanggalKontrak,
          tanggalKontrakSupervisi: contractData.tanggalKontrakSupervisi || null,
          hasAddendum: addendum && addendum.length > 0 ? true : false,
          tanggalSelesaiAwal,
          tanggalSelesaiAkhir,
          totalAddendumWaktu,
        },
      });

      if (user && (user.role === "ADMIN" || user.role === "CONSULTANT")) {
        await tx.contractAccess.create({
          data: {
            contractId: contract.id,
            userId: user.id,
          },
        });
      }

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

    await insertPaket({
      id: result.id,
      kabupatenKota: validatedData.location?.kota || undefined,
      distrik: validatedData.location?.distrik || undefined,
      kampung: validatedData.location?.kampung || undefined,
      titikKoordinat: validatedData.location?.koordinatAwal || undefined,
      awalKontrak: validatedData.tanggalKontrak ? format(validatedData.tanggalKontrak, "dd-MM-yyyy") : undefined,
      bidang: "Bina Marga",
      tipePaket: "Fisik",
      title: validatedData.namaPaket,
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

    const rawSql = `
      SELECT id, "createdAt", title, "kodeRekening", "tipePaket", urusan, bidang, distrik, "kabupatenKota", "titikKoordinat", penyedia, "nomorKontrak", "nilaiKontrak", "nilaiPagu", "sumberDana", "awalKontrak", "akhirKontrak", "volumeKontrak", "satuanKontrak", korwaslap, "pengawasLapangan", "hasilProdukAkhir", "tautanMediaProgresAwal", "tautanMediaProgresTengah", "tautanMediaProgresAkhir", "progresFisik", "progresKeuangan", "keuanganTerbayar", "volumeDPA", "satuanDPA", "volumeCapaian", "satuanCapaian", "kegiatanId", "programId", "subKegiatanId", kampung, "nipKorwaslap", "nipPengawas", "tanggalKontrak", "nipPejabatPembuatKomitmen", "pejabatPembuatKomitmen", klasifikasi
      FROM sikerjaprod."Paket"
      WHERE id='cadfa341-7551-4bcc-ae37-a2ee140af27d'
    `;

    const params = [];
    const resultSql = await pgClient.query(rawSql);
    console.log(resultSql.rows[0]);

    const newData = {
      ...contract,
    };

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

    if (user?.role === "CONSULTANT" || user?.role === "ADMIN") {
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
        lte: endOfYear,
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

    const existingDuration = existingContract.masaPelaksanaan || 0;
    const newDuration =
      validatedContractData.masaPelaksanaan !== undefined
        ? validatedContractData.masaPelaksanaan
        : existingDuration;

    const isDurationIncreased = (newDuration || 0) > existingDuration;
    const isDurationDecreased = (newDuration || 0) < existingDuration;

    const isStartDateChanged =
      (existingStartDate &&
        newStartDate &&
        existingStartDate.getTime() !== newStartDate.getTime()) ||
      (!existingStartDate && newStartDate) ||
      (existingStartDate && !newStartDate);

    const effectiveStartDate = newStartDate || existingStartDate;
    if (!effectiveStartDate) {
      throw new Error("Tidak dapat menghitung tanggal tanpa tanggal kontrak");
    }

    const tanggalSelesaiAwal = addDays(effectiveStartDate, newDuration || 0);

    // Calculate OLD total addendum waktu
    const oldTotalAddendumWaktu = existingContract.totalAddendumWaktu || 0;

    // Calculate NEW total addendum waktu
    let newTotalAddendumWaktu = oldTotalAddendumWaktu;
    let isAddendumChanged = false;

    if (addendum !== undefined) {
      isAddendumChanged = true;
      newTotalAddendumWaktu =
        Array.isArray(addendum) && addendum.length > 0
          ? addendum
              .filter((item) => item.tipe === "waktu" && item.hari || item.tipe === "waktuVolume" && item.hari)
              .reduce((sum, item) => sum + (item.hari || 0), 0)
          : 0;
    }

    // Check if addendum waktu has changed
    const isAddendumWaktuChanged = newTotalAddendumWaktu !== oldTotalAddendumWaktu;

    const tanggalSelesaiAkhir = addDays(tanggalSelesaiAwal, newTotalAddendumWaktu);

    // Calculate old and new total duration for comparison
    const oldTotalDuration = existingDuration + oldTotalAddendumWaktu;
    const newTotalDuration = (newDuration || 0) + newTotalAddendumWaktu;
    const isTotalDurationChanged = oldTotalDuration !== newTotalDuration;

    const result = await prisma.$transaction(async (tx) => {
      // Regenerate physical progress if any of these conditions are met:
      // 1. Start date changed
      // 2. Basic duration changed (increased/decreased)
      // 3. Addendum waktu changed (including deletion/reduction)
      // 4. Total duration changed
      if (
        isStartDateChanged ||
        isDurationIncreased ||
        isDurationDecreased ||
        isAddendumWaktuChanged ||
        isTotalDurationChanged
      ) {
        if (isStartDateChanged) {
          // Complete regeneration when start date changes
          await tx.physicalProgress.deleteMany({
            where: { contractId: id },
          });

          const newProgressData = generateWeeks(
            effectiveStartDate,
            newTotalDuration || 0
          );

          for (const monthData of newProgressData) {
            for (const item of monthData.items) {
              await tx.physicalProgress.create({
                data: {
                  contractId: id,
                  month: monthData.month,
                  week: item.week,
                  startDate: item.startDate,
                  endDate: item.endDate,
                  rencana: 0,
                  realisasi: 0,
                  deviasi: 0,
                },
              });
            }
          }
        } else {
          // Smart update when only duration or addendum changes
          const allNewProgressData = generateWeeks(
            effectiveStartDate,
            newTotalDuration || 0
          );

          const existingProgressRecords = await tx.physicalProgress.findMany({
            where: { contractId: id },
            select: {
              id: true,
              month: true,
              week: true,
              rencana: true,
              realisasi: true,
              deviasi: true,
            },
          });

          const existingProgressMap = new Map(
            existingProgressRecords.map((p) => [
              `${p.month}-${p.week}`,
              {
                id: p.id,
                rencana: p.rencana,
                realisasi: p.realisasi,
                deviasi: p.deviasi,
              },
            ])
          );

          const allNewKeys = new Set();
          for (const monthData of allNewProgressData) {
            for (const item of monthData.items) {
              allNewKeys.add(`${monthData.month}-${item.week}`);
            }
          }

          // Delete progress records that are no longer needed
          // This handles both duration decrease AND addendum reduction
          if (isDurationDecreased || newTotalDuration < oldTotalDuration) {
            const progressIdsToDelete = existingProgressRecords
              .filter((p) => !allNewKeys.has(`${p.month}-${p.week}`))
              .map((p) => p.id);

            if (progressIdsToDelete.length > 0) {
              await tx.physicalProgress.deleteMany({
                where: {
                  id: { in: progressIdsToDelete },
                },
              });
            }
          }

          // Update existing records and create new ones
          for (const monthData of allNewProgressData) {
            for (const item of monthData.items) {
              const progressKey = `${monthData.month}-${item.week}`;
              const existingProgress = existingProgressMap.get(progressKey);

              if (existingProgress) {
                await tx.physicalProgress.update({
                  where: { id: existingProgress.id },
                  data: {
                    startDate: item.startDate,
                    endDate: item.endDate,
                    rencana: existingProgress.rencana,
                    realisasi: existingProgress.realisasi,
                    deviasi: existingProgress.deviasi,
                  },
                });
              } else {
                await tx.physicalProgress.create({
                  data: {
                    contractId: id,
                    month: monthData.month,
                    week: item.week,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    rencana: 0,
                    realisasi: 0,
                    deviasi: 0,
                  },
                });
              }
            }
          }
        }
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
            addendum !== undefined
              ? addendum && addendum.length > 0
                ? true
                : false
              : existingContract.hasAddendum,
          tanggalSelesaiAwal,
          tanggalSelesaiAkhir, // This now uses the updated newTotalAddendumWaktu
          totalAddendumWaktu: newTotalAddendumWaktu, // Updated value
        },
      });

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

      if (addendum !== undefined && Array.isArray(addendum)) {
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
                tanggal: addendumItem.tanggal,
                alasan: addendumItem.alasan,
                pemberianKesempatan: addendumItem.pemberianKesempatan || false,
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
                tanggal: addendumItem.tanggal,
                alasan: addendumItem.alasan,
                pemberianKesempatan: addendumItem.pemberianKesempatan || false,
              },
            });
          }
        }

        // Delete removed addendum items
        if (existingAddendumIds.length > 0) {
          await tx.addendum.deleteMany({
            where: {
              id: { in: existingAddendumIds },
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
              userId: { in: userIdsToRemove },
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

    await deletePaket(id)

    revalidatePath("/contracts");

    return { success: true, data: result };
  } catch (error) {
    throw handlePrismaError(error);
  }
}
