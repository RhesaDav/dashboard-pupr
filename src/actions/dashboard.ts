"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { addDays, format, subMonths, isBefore, isAfter } from 'date-fns';

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
  fundingSourceDistribution: { source: string; count: number; amount: number }[];
  
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
      type: 'KENDALA' | 'KETERLAMBATAN' | 'PERPANJANGAN' | 'LAINNYA';
      severity: 'RINGAN' | 'SEDANG' | 'BERAT';
      progressImpact?: string;
      suggestedActions?: string[];
      documents?: string[];
    };
    location: string;
    progress: number | null;
    startDate: string | null;
    endDate: string | null;
    contractValue: number;
    vendor: string;
  }[];
}

export async function getDashboardReport(userId?: string, userRole?: Role): Promise<DashboardReport> {
  const now = new Date();
  const sixMonthsAgo = subMonths(now, 6);

  try {
    // Base query filter based on user role
    const contractFilter = userRole === 'CONSULTANT' && userId 
      ? { contractAccess: { some: { userId } } } 
      : {};

    // Get all relevant contracts with necessary relations
    const contracts = await prisma.contract.findMany({
      where: contractFilter,
      include: {
        addendum: true,
        progress: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    // Helper to calculate end date considering addendums
    const calculateEndDate = (contract: any) => {
      if (!contract.tanggalKontrak) return null;
      
      let duration = contract.masaPelaksanaan || 0;
      contract.addendum.forEach((add: any) => {
        if (add.tipe === 'waktu' && add.hari) {
          duration += parseInt(add.hari) || 0;
        }
      });
      
      return addDays(contract.tanggalKontrak, duration);
    };

    // Initialize counters and aggregations
    let activeContracts = 0;
    let completedContracts = 0;
    let problemContracts = 0;
    let totalContractValue = 0;
    let totalBudget = 0;
    let totalPhysicalProgress = 0;
    let totalFinancialProgress = 0;
    let contractsWithProgress = 0;

    const statusCounts: Record<string, number> = {};
    const locationCounts: Record<string, number> = {};
    const fundingSourceCounts: Record<string, { count: number; amount: number }> = {};

    // Process each contract
    const processedContracts = contracts.map(contract => {
      // Financial calculations
      const contractValue = contract.nilaiKontrak || 0;
      totalContractValue += contractValue;
      
      // Parse budget amount (remove non-numeric characters)
      const budgetAmount = parseFloat(contract.paguAnggaran?.replace(/[^0-9.-]+/g, '') || '0');
      totalBudget += budgetAmount;

      // Track funding sources
      const fundingSource = contract.sumberDana || 'Tidak Diketahui';
      if (!fundingSourceCounts[fundingSource]) {
        fundingSourceCounts[fundingSource] = { count: 0, amount: 0 };
      }
      fundingSourceCounts[fundingSource].count++;
      fundingSourceCounts[fundingSource].amount += budgetAmount;

      // Payment progress calculation
      const paymentProgress = 
        (contract.uangMuka || 0) + 
        (contract.termin1 || 0) + 
        (contract.termin2 || 0) + 
        (contract.termin3 || 0) + 
        (contract.termin4 || 0);
      totalFinancialProgress += contractValue * (Math.min(paymentProgress, 100) / 100);

      // Physical progress
      const latestProgress = contract.progress[0]?.realisasi ?? null;
      if (latestProgress !== null) {
        totalPhysicalProgress += latestProgress;
        contractsWithProgress++;
      }

      // Determine contract status
      const endDate = calculateEndDate(contract);
      let status = 'Belum Mulai';
      
      if (contract.kendala) {
        status = 'Bermasalah';
        problemContracts++;
      } else if (latestProgress !== null && latestProgress >= 100) {
        status = 'Selesai';
        completedContracts++;
      } else if (contract.tanggalKontrak && isBefore(contract.tanggalKontrak, now)) {
        if (endDate && isAfter(now, endDate)) {
          status = contract.pemberianKesempatan ? 'Dalam Perpanjangan' : 'Terlambat';
          problemContracts++;
        } else {
          status = 'Berjalan';
          activeContracts++;
        }
      }

      // Track status distribution
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      // Track location distribution
      const location = contract.distrik || 'Lokasi Lain';
      locationCounts[location] = (locationCounts[location] || 0) + 1;

      return {
        ...contract,
        status,
        endDate,
        latestProgress,
      };
    });

    console.log({totalPhysicalProgress,contractsWithProgress})

    // Calculate averages
    const avgPhysicalProgress = contractsWithProgress > 0 
      ? parseFloat((totalPhysicalProgress / contractsWithProgress).toFixed(1))
      : 0;
      
    const avgFinancialProgress = totalContractValue > 0
      ? parseFloat(((totalFinancialProgress / totalContractValue) * 100).toFixed(1))
      : 0;

    // Get progress trend data
    const progressTrendData = await prisma.progress.groupBy({
      by: ['month'],
      where: {
        createdAt: { gte: sixMonthsAgo },
        contract: contractFilter,
      },
      _avg: {
        realisasi: true,
      },
      orderBy: { month: 'asc' },
    }).then(results => 
      results.map(r => ({
        month: r.month,
        value: parseFloat((r._avg.realisasi || 0).toFixed(1)),
      }))
    );

    // Prepare recent contracts (5 most recently updated)
    const recentContracts = processedContracts
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5)
      .map(c => ({
        id: c.id,
        packageName: c.namaPaket || 'N/A',
        vendor: c.namaPenyedia || 'N/A',
        contractValue: c.nilaiKontrak || 0,
        status: c.status,
        updatedAt: c.updatedAt,
      }));

    // Prepare problem contracts with progress information
    const problemContractsData = processedContracts
    .filter(c => c.kendala || c.status === 'Terlambat' || c.status === 'Dalam Perpanjangan')
    .slice(0, 5)
    .map(c => {
      // Determine issue type based on contract status
      let issueType: 'KENDALA' | 'KETERLAMBATAN' | 'PERPANJANGAN' | 'LAINNYA' = 'LAINNYA';
      if (c.kendala) issueType = 'KENDALA';
      else if (c.status === 'Terlambat') issueType = 'KETERLAMBATAN';
      else if (c.status === 'Dalam Perpanjangan') issueType = 'PERPANJANGAN';

      // Assess severity based on progress and time elapsed
      let severity: 'RINGAN' | 'SEDANG' | 'BERAT' = 'RINGAN';
      const endDate = calculateEndDate(c);
      const daysLate = endDate ? Math.max(0, Math.floor((now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;
      
      if (c.latestProgress !== null) {
        if (daysLate > 30 || c.latestProgress < 30) severity = 'BERAT';
        else if (daysLate > 14 || c.latestProgress < 50) severity = 'SEDANG';
      }

      // Generate detailed issue description
      const baseIssue = c.permasalahan || 'Tidak ada deskripsi masalah tersedia';
      let fullDescription = baseIssue;
      
      if (issueType === 'KETERLAMBATAN' && endDate) {
        fullDescription += `\n\nKeterlambatan: ${daysLate} hari dari tanggal target penyelesaian (${format(endDate, 'dd/MM/yyyy')}).`;
      }
      
      if (c.latestProgress !== null) {
        fullDescription += `\n\nProgress fisik saat ini: ${c.latestProgress}%`;
      }

      // Suggest actions based on issue type
      const suggestedActions: string[] = [];
      if (issueType === 'KENDALA') {
        suggestedActions.push('Koordinasi dengan penyedia');
        suggestedActions.push('Evaluasi penyebab kendala');
        if (severity === 'BERAT') suggestedActions.push('Perlu eskalasi ke manajemen');
      } else if (issueType === 'KETERLAMBATAN') {
        suggestedActions.push('Review rencana percepatan');
        suggestedActions.push('Evaluasi penalty sesuai kontrak');
      }

      // Get available documents
      const documents: string[] = [];
      if (c.dokumentasiAwal) documents.push('Dokumentasi Awal');
      if (c.dokumentasiTengah) documents.push('Dokumentasi Tengah');
      if (c.dokumentasiAkhir) documents.push('Dokumentasi Akhir');

      return {
        id: c.id,
        packageName: c.namaPaket || 'N/A',
        contractValue: c.nilaiKontrak || 0,
        vendor: c.namaPenyedia || 'N/A',
        location: [c.kampung, c.distrik].filter(Boolean).join(', ') || 'Lokasi tidak diketahui',
        progress: c.latestProgress,
        startDate: c.tanggalKontrak ? format(c.tanggalKontrak, 'dd/MM/yyyy') : null,
        endDate: endDate ? format(endDate, 'dd/MM/yyyy') : null,
        issueDetails: {
          description: fullDescription,
          type: issueType,
          severity,
          progressImpact: c.latestProgress !== null ? 
            `Progress ${c.latestProgress}% (${c.latestProgress < 50 ? 'Jauh dari target' : 'Mendekati target'})` : 
            'Data progress tidak tersedia',
          suggestedActions,
          documents
        }
      };
    });

    return {
      totalContracts: contracts.length,
      activeContracts,
      completedContracts,
      totalContractValue,
      totalBudget,
      avgPhysicalProgress,
      avgFinancialProgress,
      physicalProgressTrend: progressTrendData,
      statusDistribution: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
      locationDistribution: Object.entries(locationCounts).map(([location, count]) => ({ location, count })),
      fundingSourceDistribution: Object.entries(fundingSourceCounts).map(([source, data]) => ({ 
        source, 
        count: data.count,
        amount: data.amount 
      })),
      recentContracts,
      problemContracts: problemContractsData,
    };
  } catch (error) {
    console.error("Error in getDashboardReport:", error);
    throw error;
  }
}