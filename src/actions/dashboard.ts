"use server";

import { prisma } from "@/lib/prisma";
import { Contract, PhysicalProgress, Role } from "@prisma/client";
import { addDays, format, subMonths, isBefore, isAfter } from "date-fns";

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
  physicalProgressTrend: { month: string; value: number }[];

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
    totalPaguAnggaran: number; // New field
    totalNilaiKontrak: number; // New field
    totalRealisasiKeuangan: number; // New field
    avgProgressFisik: number; // New field
    avgProgressKeuangan: number; // New field
    contractValue: number;
    contracts: {
      id: string;
      packageName: string;
      status: string;
      progress: number | null;
      financialProgress: number | null; // New field for individual contract financial progress
    }[];
  }[];
}

export async function getDashboardReport(): Promise<DashboardReport> {
  // Fetch all contracts with related data
  const contracts = await prisma.contract.findMany({
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

  /// Asumsikan 'contracts' adalah array objek kontrak Anda

// 1. Filter kontrak yang memiliki data progress fisik (Langkah ini sudah benar)
const contractsWithPhysicalProgress = contracts.filter(
  (contract) =>
    contract.physicalProgress && contract.physicalProgress.length > 0
);

console.log(
  `Jumlah kontrak yang difilter (memiliki data progress fisik): ${contractsWithPhysicalProgress.length}`
);

// 2 & 3. Cari nilai realisasi MAKSIMUM per kontrak dan jumlahkan
let totalOfMaxRealisasi = 0; // Variabel untuk menjumlahkan nilai realisasi maksimum dari tiap kontrak

contractsWithPhysicalProgress.forEach((contract) => {
  // Inisialisasi nilai realisasi maksimum untuk kontrak saat ini
  let maxRealisasiForThisContract = 0;

  // Iterasi melalui SEMUA entri progress untuk mencari nilai realisasi tertinggi
  contract.physicalProgress.forEach((progressEntry) => {
    // Pastikan nilai realisasi valid dan bandingkan dengan maksimum saat ini
    if (
      progressEntry.realisasi !== null &&
      progressEntry.realisasi !== undefined &&
      progressEntry.realisasi > maxRealisasiForThisContract // Lebih besar dari max saat ini?
    ) {
      // Jika ya, update nilai maksimum untuk kontrak ini
      maxRealisasiForThisContract = progressEntry.realisasi;
    }
  });

  // Tambahkan nilai realisasi maksimum dari kontrak ini ke total keseluruhan
  totalOfMaxRealisasi += maxRealisasiForThisContract;

  console.log(
    `Kontrak ID: ${contract.id}, Realisasi Tertinggi Ditemukan: ${maxRealisasiForThisContract}%`
  );
});

// 4. Hitung rata-rata progress fisik berdasarkan nilai realisasi maksimum
const avgPhysicalProgress =
  contractsWithPhysicalProgress.length > 0
    ? totalOfMaxRealisasi / contractsWithPhysicalProgress.length // Bagi total max realisasi dengan jumlah kontrak
    : 0;

console.log(
  `Total dari Nilai Realisasi Maksimum Setiap Kontrak: ${totalOfMaxRealisasi}`
);
console.log(
  `Jumlah kontrak yang dihitung rata-ratanya: ${contractsWithPhysicalProgress.length}`
);
console.log(
  `Rata-rata Progress Fisik (berdasarkan Realisasi Tertinggi): ${avgPhysicalProgress.toFixed(2)}%`
);
  const contractsWithFinancialProgress = contracts.filter(
    (contract) => contract.financialProgress?.totalProgress
  );

  const avgFinancialProgress =
    contractsWithFinancialProgress.length > 0
      ? contractsWithFinancialProgress.reduce(
          (sum, contract) =>
            sum + (contract.financialProgress?.totalProgress || 0),
          0
        ) / contractsWithFinancialProgress.length
      : 0;

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
      value: values.reduce((sum, val) => sum + val, 0) / values.length,
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
      totalPhysicalProgress: number;
      totalFinancialProgress: number;
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
    const current = subkegiatanMap.get(subkegiatan) || {
      totalContracts: 0,
      completedContracts: 0,
      ongoingContracts: 0,
      problemContracts: 0,
      totalPaguAnggaran: 0,
      totalNilaiKontrak: 0,
      totalRealisasiKeuangan: 0,
      totalPhysicalProgress: 0,
      totalFinancialProgress: 0,
      contracts: [],
    };

    const latestPhysicalProgress = contract.physicalProgress.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];

    const isCompleted = latestPhysicalProgress?.realisasi >= 100;
    const isProblem = contract.kendala === true || contract.permasalahan;
    const financialProgress = contract.financialProgress?.totalProgress || 0;

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
      totalPhysicalProgress:
        current.totalPhysicalProgress +
        (latestPhysicalProgress?.realisasi || 0),
      totalFinancialProgress:
        current.totalFinancialProgress + financialProgress,
      contracts: [
        ...current.contracts,
        {
          id: contract.id,
          packageName: contract.namaPaket,
          status: getContractStatus(contract),
          progress: latestPhysicalProgress?.realisasi || null,
          financialProgress,
        },
      ],
    });
  });

  const subkegiatanDistribution = Array.from(subkegiatanMap.entries()).map(
    ([subkegiatan, data]) => ({
      subkegiatan,
      totalContracts: data.totalContracts,
      completedContracts: data.completedContracts,
      ongoingContracts: data.ongoingContracts,
      problemContracts: data.problemContracts,
      totalPaguAnggaran: data.totalPaguAnggaran,
      totalNilaiKontrak: data.totalNilaiKontrak,
      totalRealisasiKeuangan: data.totalRealisasiKeuangan,
      avgProgressFisik: data.totalPhysicalProgress / data.totalContracts,
      avgProgressKeuangan: data.totalFinancialProgress / data.totalContracts,
      contractValue: data.totalNilaiKontrak,
      contracts: data.contracts,
    })
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
  const latestProgress = contract.physicalProgress.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];

  return latestProgress?.realisasi >= 100;
}

function getContractStatus(
  contract: Contract & { physicalProgress: PhysicalProgress[] }
): string {
  if (!contract.tanggalKontrak) return "BELUM DIMULAI";

  const latestProgress = contract.physicalProgress.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];

  if (latestProgress && latestProgress.realisasi >= 100) return "SELESAI";
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
