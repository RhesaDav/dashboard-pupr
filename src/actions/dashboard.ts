"use server";

import { prisma } from "@/lib/prisma";
import { Contract, PhysicalProgress, Role } from "@prisma/client";
import { addDays, format, subMonths, isBefore, isAfter } from "date-fns";
import { cookies } from "next/headers";

export interface DashboardReport {
  // Ringkasan Kontrak
  totalContracts: number;
  activeContracts: number;
  completedContracts: number;
  totalContractValue: number;
  totalBudget: number;

  // Progress
  avgPhysicalProgress: number;
  avgFinancialProgress: number;
  physicalProgressTrend: { month: string; value: string }[];

  // Distribusi
  statusDistribution: { status: string; count: number }[];
  locationDistribution: { location: string; count: number }[];
  fundingSourceDistribution: {
    source: string;
    count: number;
    amount: number;
  }[];

  // Kontrak Terkini
  recentContracts: {
    id: string;
    packageName: string;
    vendor: string;
    contractValue: number;
    status: string;
    updatedAt: Date;
  }[];

  // Kontrak Bermasalah
  problemContracts: {
    id: string;
    packageName: string;
    issueDetails: {
      description: string;
      type: "KENDALA" | "KETERLAMBATAN" | "PERPANJANGAN" | "LAINNYA";
      severity: "RINGAN" | "SEDANG" | "BERAT";
      progressImpact?: string;
      suggestedActions?: string[];
      documents?: string[];
    };
    location: string;
    progress: number | null;
    contractDate: string | null;
    contractValue: number;
    vendor: string;
  }[];
  subkegiatanDistribution: {
    subkegiatan: string;
    totalContracts: number;
    completedContracts: number;
    ongoingContracts: number;
    problemContracts: number;
    totalPaguAnggaran: number;
    totalNilaiKontrak: number;
    totalRealisasiKeuangan: number;
    avgProgressFisik: number;
    avgProgressKeuangan: number;
    contractValue: number;
    contracts: {
      id: string;
      packageName: string;
      status: string;
      progress: number | null;
      financialProgress: number | null;
    }[];
  }[];
}

export async function getDashboardReport(): Promise<DashboardReport> {
  const cookieStore = await cookies();
  const budgetYear = cookieStore.get("budgetYear")?.value;
  if (!budgetYear) throw Error("budget year not found")
  const budgetYearNum = parseInt(budgetYear);
  const startOfYear = new Date(budgetYearNum, 0, 1);
  const endOfYear = new Date(budgetYearNum, 11, 31, 23, 59, 59, 999);

  // Fetch all contracts with related data
  const contracts = await prisma.contract.findMany({
    where: {
      tanggalKontrak: {
        gte: startOfYear,
        lte: endOfYear,
      },
    },
    include: {
      physicalProgress: true,
      financialProgress: true,
      location: true,
    },
  });

  // Calculate total contracts
  const totalContracts = contracts.length;

  // Calculate active and completed contracts based on physical progress and status
  const activeContracts = contracts.filter(
    (contract) => !isContractCompleted(contract)
  ).length;

  const completedContracts = contracts.filter((contract) =>
    isContractCompleted(contract)
  ).length;

  // Calculate total contract value and budget
  const totalContractValue = contracts.reduce(
    (sum, contract) => sum + (contract.nilaiKontrak || 0),
    0
  );

  const totalBudget = contracts.reduce(
    (sum, contract) => sum + (contract.paguAnggaran || 0),
    0
  );

  // Filter contracts with physical progress data
  const contractsWithPhysicalProgress = contracts.filter(
    (contract) =>
      contract.physicalProgress && contract.physicalProgress.length > 0
  );

  console.log(
    `Jumlah kontrak yang difilter (memiliki data progress fisik): ${contractsWithPhysicalProgress.length}`
  );

  // Calculate average physical progress based on maximum realization per contract
  let totalOfMaxRealisasi = 0;

  contractsWithPhysicalProgress.forEach((contract) => {
    // Find maximum realization value for this contract
    let maxRealisasiForThisContract = 0;

    contract.physicalProgress.forEach((progressEntry) => {
      if (
        progressEntry.realisasi !== null &&
        progressEntry.realisasi !== undefined &&
        progressEntry.realisasi > maxRealisasiForThisContract
      ) {
        maxRealisasiForThisContract = progressEntry.realisasi;
      }
    });

    totalOfMaxRealisasi += maxRealisasiForThisContract;

    console.log(
      `Kontrak ID: ${contract.id}, Realisasi Tertinggi Ditemukan: ${maxRealisasiForThisContract}%`
    );
  });

  const avgPhysicalProgress =
    contractsWithPhysicalProgress.length > 0
      ? totalOfMaxRealisasi / contractsWithPhysicalProgress.length
      : 0;

  console.log(
    `Total dari Nilai Realisasi Maksimum Setiap Kontrak: ${totalOfMaxRealisasi}`
  );
  console.log(
    `Jumlah kontrak yang dihitung rata-ratanya: ${contractsWithPhysicalProgress.length}`
  );
  console.log(
    `Rata-rata Progress Fisik (berdasarkan Realisasi Tertinggi): ${avgPhysicalProgress.toFixed(
      2
    )}%`
  );

  // Fixed avgFinancialProgress calculation - similar approach to physical progress
  const contractsWithFinancialProgress = contracts.filter(
    (contract) => contract.financialProgress
  );

  let totalOfMaxFinancialProgress = 0;

  contractsWithFinancialProgress.forEach((contract) => {
    // For financial progress, we'll use totalProgress if available
    const financialProgress = contract.financialProgress?.totalProgress || 0;
    totalOfMaxFinancialProgress += financialProgress;

    console.log(
      `Kontrak ID: ${contract.id}, Progress Keuangan: ${financialProgress}%`
    );
  });

  const avgFinancialProgress =
    contractsWithFinancialProgress.length > 0
      ? totalOfMaxFinancialProgress / contractsWithFinancialProgress.length
      : 0;

  console.log(`Total Progress Keuangan: ${totalOfMaxFinancialProgress}`);
  console.log(
    `Jumlah kontrak dengan progress keuangan: ${contractsWithFinancialProgress.length}`
  );
  console.log(
    `Rata-rata Progress Keuangan: ${avgFinancialProgress.toFixed(2)}%`
  );

  // Get physical progress trend by month
  const physicalProgressByMonth = new Map<string, number[]>();

  contractsWithPhysicalProgress.forEach((contract) => {
    contract.physicalProgress.forEach((progress) => {
      if (!physicalProgressByMonth.has(progress.month)) {
        physicalProgressByMonth.set(progress.month, []);
      }
      physicalProgressByMonth.get(progress.month)?.push(progress.realisasi);
    });
  });

  const physicalProgressTrend = Array.from(physicalProgressByMonth.entries())
    .map(([month, values]) => ({
      month,
      value: (
        values.reduce((sum, val) => sum + val, 0) / values.length
      ).toFixed(2),
    }))
    .sort((a, b) => {
      // Sort by month (assuming month format is "MMM YYYY")
      const monthsOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");

      if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
      return monthsOrder.indexOf(aMonth) - monthsOrder.indexOf(bMonth);
    });

  // Calculate status distribution
  const statusMap = new Map<string, number>();

  contracts.forEach((contract) => {
    const status = getContractStatus(contract);
    statusMap.set(status, (statusMap.get(status) || 0) + 1);
  });

  const statusDistribution = Array.from(statusMap.entries()).map(
    ([status, count]) => ({
      status,
      count,
    })
  );

  // Calculate location distribution
  const locationMap = new Map<string, number>();

  contracts.forEach((contract) => {
    if (contract.location?.kota) {
      const location = contract.location.kota;
      locationMap.set(location, (locationMap.get(location) || 0) + 1);
    }
  });

  const locationDistribution = Array.from(locationMap.entries()).map(
    ([location, count]) => ({
      location,
      count,
    })
  );

  // Calculate funding source distribution
  const fundingSourceMap = new Map<string, { count: number; amount: number }>();

  contracts.forEach((contract) => {
    if (contract.sumberDana) {
      const source = contract.sumberDana;
      const currentValue = fundingSourceMap.get(source) || {
        count: 0,
        amount: 0,
      };
      fundingSourceMap.set(source, {
        count: currentValue.count + 1,
        amount: currentValue.amount + (contract.nilaiKontrak || 0),
      });
    }
  });

  const fundingSourceDistribution = Array.from(fundingSourceMap.entries()).map(
    ([source, data]) => ({
      source,
      count: data.count,
      amount: data.amount,
    })
  );

  // Get recent contracts
  const recentContracts = contracts
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5)
    .map((contract) => ({
      id: contract.id,
      packageName: contract.namaPaket,
      vendor: contract.namaPenyedia || "N/A",
      contractValue: contract.nilaiKontrak || 0,
      status: getContractStatus(contract),
      updatedAt: contract.updatedAt,
    }));

  // Get problem contracts
  const problemContracts = contracts
    .filter((contract) => contract.kendala === true || contract.permasalahan)
    .map((contract) => {
      const latestPhysicalProgress = contract.physicalProgress.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];

      return {
        id: contract.id,
        packageName: contract.namaPaket,
        issueDetails: {
          description: contract.permasalahan || "Kendala tidak dijelaskan",
          type: determineIssueType(contract),
          severity: determineIssueSeverity(contract, latestPhysicalProgress),
          progressImpact: latestPhysicalProgress
            ? `${latestPhysicalProgress.deviasi.toFixed(2)}%`
            : undefined,
          suggestedActions: suggestActions(contract),
          documents: getIssueDocuments(contract),
        },
        location: formatLocation(contract.location),
        progress: latestPhysicalProgress?.realisasi || null,
        contractDate: contract.tanggalKontrak
          ? contract.tanggalKontrak.toISOString()
          : null,
        contractValue: contract.nilaiKontrak || 0,
        vendor: contract.namaPenyedia || "N/A",
      };
    });

  // Fixed subkegiatan distribution implementation
  const subkegiatanMap = new Map<
    string,
    {
      totalContracts: number;
      completedContracts: number;
      ongoingContracts: number;
      problemContracts: number;
      totalPaguAnggaran: number;
      totalNilaiKontrak: number;
      totalRealisasiKeuangan: number;
      contractsWithPhysicalProgress: number;
      contractsWithFinancialProgress: number;
      maxPhysicalProgressValues: number[];
      financialProgressValues: number[];
      contracts: {
        id: string;
        packageName: string;
        status: string;
        progress: number | null;
        financialProgress: number | null;
      }[];
    }
  >();

  contracts.forEach((contract) => {
    const subkegiatan = contract.subKegiatan || "Lainnya";

    // Get or initialize data for this subkegiatan
    const current = subkegiatanMap.get(subkegiatan) || {
      totalContracts: 0,
      completedContracts: 0,
      ongoingContracts: 0,
      problemContracts: 0,
      totalPaguAnggaran: 0,
      totalNilaiKontrak: 0,
      totalRealisasiKeuangan: 0,
      contractsWithPhysicalProgress: 0,
      contractsWithFinancialProgress: 0,
      maxPhysicalProgressValues: [],
      financialProgressValues: [],
      contracts: [],
    };

    // Find max physical progress for this contract (similar to the avgPhysicalProgress calculation)
    let maxPhysicalProgress = 0;
    let hasPhysicalProgress = false;

    if (contract.physicalProgress && contract.physicalProgress.length > 0) {
      hasPhysicalProgress = true;
      contract.physicalProgress.forEach((progressEntry) => {
        if (
          progressEntry.realisasi !== null &&
          progressEntry.realisasi !== undefined &&
          progressEntry.realisasi > maxPhysicalProgress
        ) {
          maxPhysicalProgress = progressEntry.realisasi;
        }
      });
    }

    // Get financial progress
    const financialProgress = contract.financialProgress?.totalProgress || 0;
    const hasFinancialProgress = !!contract.financialProgress;

    const isCompleted = maxPhysicalProgress >= 100;
    const isProblem = contract.kendala === true || contract.permasalahan;

    // Update subkegiatan data
    subkegiatanMap.set(subkegiatan, {
      totalContracts: current.totalContracts + 1,
      completedContracts: current.completedContracts + (isCompleted ? 1 : 0),
      ongoingContracts: current.ongoingContracts + (!isCompleted ? 1 : 0),
      problemContracts: current.problemContracts + (isProblem ? 1 : 0),
      totalPaguAnggaran:
        current.totalPaguAnggaran + (contract.paguAnggaran || 0),
      totalNilaiKontrak:
        current.totalNilaiKontrak + (contract.nilaiKontrak || 0),
      totalRealisasiKeuangan:
        current.totalRealisasiKeuangan +
        (contract.financialProgress?.totalPayment || 0),
      contractsWithPhysicalProgress:
        current.contractsWithPhysicalProgress + (hasPhysicalProgress ? 1 : 0),
      contractsWithFinancialProgress:
        current.contractsWithFinancialProgress + (hasFinancialProgress ? 1 : 0),
      maxPhysicalProgressValues: hasPhysicalProgress
        ? [...current.maxPhysicalProgressValues, maxPhysicalProgress]
        : current.maxPhysicalProgressValues,
      financialProgressValues: hasFinancialProgress
        ? [...current.financialProgressValues, financialProgress]
        : current.financialProgressValues,
      contracts: [
        ...current.contracts,
        {
          id: contract.id,
          packageName: contract.namaPaket,
          status: getContractStatus(contract),
          progress: hasPhysicalProgress ? maxPhysicalProgress : null,
          financialProgress: hasFinancialProgress ? financialProgress : null,
        },
      ],
    });
  });

  // Transform subkegiatan data for the return value, calculating proper averages
  const subkegiatanDistribution = Array.from(subkegiatanMap.entries()).map(
    ([subkegiatan, data]) => {
      // Calculate average physical progress for this subkegiatan
      const avgProgressFisik =
        data.maxPhysicalProgressValues.length > 0
          ? data.maxPhysicalProgressValues.reduce((sum, val) => sum + val, 0) /
            data.maxPhysicalProgressValues.length
          : 0;

      // Calculate average financial progress for this subkegiatan
      const avgProgressKeuangan =
        data.financialProgressValues.length > 0
          ? data.financialProgressValues.reduce((sum, val) => sum + val, 0) /
            data.financialProgressValues.length
          : 0;

      console.log(`Subkegiatan: ${subkegiatan}`);
      console.log(
        `  Contracts with physical progress: ${data.contractsWithPhysicalProgress}`
      );
      console.log(
        `  Average physical progress: ${avgProgressFisik.toFixed(2)}%`
      );
      console.log(
        `  Contracts with financial progress: ${data.contractsWithFinancialProgress}`
      );
      console.log(
        `  Average financial progress: ${avgProgressKeuangan.toFixed(2)}%`
      );

      return {
        subkegiatan,
        totalContracts: data.totalContracts,
        completedContracts: data.completedContracts,
        ongoingContracts: data.ongoingContracts,
        problemContracts: data.problemContracts,
        totalPaguAnggaran: data.totalPaguAnggaran,
        totalNilaiKontrak: data.totalNilaiKontrak,
        totalRealisasiKeuangan: data.totalRealisasiKeuangan,
        avgProgressFisik,
        avgProgressKeuangan,
        contractValue: data.totalNilaiKontrak,
        contracts: data.contracts,
      };
    }
  );

  return {
    totalContracts,
    activeContracts,
    completedContracts,
    totalContractValue,
    totalBudget,
    avgPhysicalProgress,
    avgFinancialProgress,
    physicalProgressTrend,
    statusDistribution,
    locationDistribution,
    fundingSourceDistribution,
    recentContracts,
    problemContracts,
    subkegiatanDistribution,
  };
}

// Helper functions
function isContractCompleted(
  contract: Contract & { physicalProgress: PhysicalProgress[] }
): boolean {
  if (!contract.physicalProgress || contract.physicalProgress.length === 0) {
    return false;
  }

  // Find maximum realization across all progress entries
  let maxRealisasi = 0;
  contract.physicalProgress.forEach((progress) => {
    if (progress.realisasi > maxRealisasi) {
      maxRealisasi = progress.realisasi;
    }
  });

  return maxRealisasi >= 100;
}

function getContractStatus(
  contract: Contract & { physicalProgress: PhysicalProgress[] }
): string {
  if (!contract.tanggalKontrak) return "BELUM DIMULAI";

  // Find maximum realization across all progress entries
  let maxRealisasi = 0;
  if (contract.physicalProgress && contract.physicalProgress.length > 0) {
    contract.physicalProgress.forEach((progress) => {
      if (progress.realisasi > maxRealisasi) {
        maxRealisasi = progress.realisasi;
      }
    });
  }

  if (maxRealisasi >= 100) return "SELESAI";
  if (contract.kendala === true) return "BERMASALAH";

  // Check if contract duration has passed (if we have masa pelaksanaan in days)
  if (contract.masaPelaksanaan && contract.tanggalKontrak) {
    const estimatedEndDate = addDays(
      new Date(contract.tanggalKontrak),
      contract.masaPelaksanaan
    );
    if (new Date() > estimatedEndDate) return "TENGGAT TERLEWATI";
  }

  return "AKTIF";
}

function determineIssueType(
  contract: any
): "KENDALA" | "KETERLAMBATAN" | "PERPANJANGAN" | "LAINNYA" {
  if (
    contract.permasalahan &&
    contract.permasalahan.toLowerCase().includes("terlambat")
  ) {
    return "KETERLAMBATAN";
  }

  if (contract.hasAddendum) {
    return "PERPANJANGAN";
  }

  if (contract.kendala === true) {
    return "KENDALA";
  }

  return "LAINNYA";
}

function determineIssueSeverity(
  contract: any,
  latestProgress: any
): "RINGAN" | "SEDANG" | "BERAT" {
  if (!latestProgress) return "SEDANG";

  const deviasi = latestProgress.deviasi || 0;

  if (deviasi < -15) return "BERAT";
  if (deviasi < -5) return "SEDANG";
  return "RINGAN";
}

function suggestActions(contract: any): string[] {
  const actions = [];

  if (contract.kendala === true) {
    actions.push("Lakukan evaluasi kendala");
  }

  if (contract.pemberianKesempatan === true) {
    actions.push("Monitor kemajuan setelah pemberian kesempatan");
  }

  if (actions.length === 0) {
    actions.push("Evaluasi situasi dan lakukan tindakan sesuai permasalahan");
  }

  return actions;
}

function getIssueDocuments(contract: any): string[] {
  const documents = [];

  if (contract.dokumentasiAwal) documents.push(contract.dokumentasiAwal);
  if (contract.dokumentasiTengah) documents.push(contract.dokumentasiTengah);
  if (contract.dokumentasiAkhir) documents.push(contract.dokumentasiAkhir);

  return documents;
}

function formatLocation(location: any): string {
  if (!location) return "N/A";

  const parts = [];
  if (location.kampung) parts.push(location.kampung);
  if (location.distrik) parts.push(location.distrik);
  if (location.kota) parts.push(location.kota);

  return parts.length > 0 ? parts.join(", ") : "N/A";
}
