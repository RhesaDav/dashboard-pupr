"use client";

import React, { useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { isWithinInterval, isValid, addDays, format } from "date-fns";
import { exportToExcel, exportToPDF } from "@/lib/export-utils";
import { formatRupiah } from "@/lib/utils";
import { getAllContracts } from "@/actions/contract";
import {
  Addendum,
  Contract,
  FinancialProgress,
  Location,
  PhysicalProgress as ProgressType,
} from "@prisma/client";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { DataTableSearch } from "@/components/data-table-search";
import { DataTableFilter } from "@/components/data-table-filter";
import { ExportToolbar } from "./export-toolbar";
import { DataTable } from "@/components/data-table";
import { DateWeekPicker } from "@/components/date-week-picker";
import { useQuery } from "@tanstack/react-query";

interface ContractWithProgress extends Contract {
  physicalProgress: ProgressType[];
  financialProgress?: FinancialProgress | null;
  location: Location | null;
  progressPercentage?: number;
  status?: string;
  addendum?: Addendum[];
}

export default function ReportTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isExporting, setIsExporting] = useState(false);
  const [selectedDateForWeek, setSelectedDateForWeek] = useState<
    Date | undefined
  >();
  const [selectedWeekRange, setSelectedWeekRange] = useState<
    | {
        start: Date;
        end: Date;
      }
    | undefined
  >();

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status")?.split(",") || [];
  const pageParam = parseInt(searchParams.get("page") || "1");
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10");

  const {
    data: contractsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contracts", pageParam, pageSizeParam, searchQuery],
    queryFn: async () => {
      const result = await getAllContracts({
        pageParam,
        pageSizeParam,
        searchQuery,
      });

      if (!result.data) {
        throw new Error("Failed to fetch contracts");
      }

      return {
        contracts: result.data.map((contract) => {
          const progressPercentage = calculateProgressPercentage(contract);
          const status = determineContractStatus(contract, progressPercentage);

          return {
            ...contract,
            progressPercentage,
            status,
          };
        }),
        totalCount: result.data.length || 0,
      };
    },
    // staleTime: 5 * 60 * 1000,
    // retry: 2,
  });

  const contracts = contractsData?.contracts || [];
  const totalContracts = contractsData?.totalCount || 0;

  const calculateProgressPercentage = (
    contract: ContractWithProgress
  ): number => {
    if (!contract.physicalProgress || contract.physicalProgress.length === 0)
      return 0;

    const totalProgress = contract.physicalProgress.reduce(
      (sum, p) => sum + p.realisasi,
      0
    );
    return totalProgress / contract.physicalProgress.length;
  };

  const determineContractStatus = (
    contract: Contract,
    progress: number
  ): string => {
    const today = new Date();
    const endDate = contract.tanggalKontrak
      ? addDays(contract.tanggalKontrak, contract.masaPelaksanaan || 0)
      : null;

    if (progress >= 100) return "Selesai";
    // if (contract.kendala) return "Bermasalah";
    if (endDate && today > endDate) return "Terlambat";

    return "Berjalan";
  };

  const filteredContracts = useMemo(() => {
    if (statusFilter.length === 0) return contracts;
    return contracts.filter(
      (contract) => contract.status && statusFilter.includes(contract.status)
    );
  }, [contracts, statusFilter]);

  const filterContractsByWeekRange = useMemo(() => {
    if (!selectedWeekRange) return [];

    return filteredContracts.filter((contract) => {
      if (!contract.physicalProgress || contract.physicalProgress.length === 0)
        return false;

      return contract.physicalProgress.some((week) => {
        const weekStart = week.startDate ? new Date(week.startDate) : null;
        if (!weekStart || !isValid(weekStart)) return false;

        return isWithinInterval(weekStart, {
          start: selectedWeekRange.start,
          end: selectedWeekRange.end,
        });
      });
    });
  }, [filteredContracts, selectedWeekRange]);

  const columns: ColumnDef<ContractWithProgress>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "namaPaket",
      header: "Nama Paket",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("namaPaket")}
          <div className="text-xs text-muted-foreground">
            {row.original.nomorKontrak}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "namaPenyedia",
      header: "Penyedia",
    },
    {
      accessorKey: "ppk",
      header: "PPK",
      cell: ({ row }) => (
        <div>
          {row.original.ppk}
          <div className="text-xs text-muted-foreground">
            {row.original.nipPPK}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: ({ row }) => (
        <div className="text-right">
          {formatRupiah(row.getValue("nilaiKontrak"))}
          <div className="text-xs text-muted-foreground">
            {row.original.volumeKontrak} {row.original.satuanKontrak}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "timeline",
      header: "Masa Pelaksanaan",
      cell: ({ row }) => {
        const start = row.original.tanggalKontrak;
        const duration = (row.original.masaPelaksanaan || 0) + (row.original.totalAddendumWaktu || 0);
        const end = start ? addDays(start, duration) : null;

        return (
          <div className="text-xs">
            {start ? format(start, "dd/MM/yy") : "-"} -
            {end ? format(end, "dd/MM/yy") : "-"}
            <div className="text-muted-foreground">{duration} hari</div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status || "Berjalan";
        // const hasProblem = row.original.kendala;

        return (
          <div className="flex flex-col gap-1">
            <Badge
              variant={
                status === "Selesai"
                  ? "default"
                  : status === "Bermasalah"
                  ? "destructive"
                  : "secondary"
              }
              className="text-[10px]"
            >
              {status}
            </Badge>
            {/* {hasProblem && (
              <Badge variant="outline" className="text-[10px] border-red-300">
                Ada Kendala
              </Badge>
            )} */}
          </div>
        );
      },
    },
  ];

  const selectedRows = useMemo(() => {
    return Object.keys(rowSelection).map(
      (rowId) => filteredContracts[parseInt(rowId)].id
    );
  }, [rowSelection, filteredContracts]);

  const handleWeekRangeChange = (
    range: { start: Date; end: Date } | undefined
  ) => {
    setSelectedWeekRange(range);
  };

  const processProgressDataWithContinuity = (progressData: ProgressType[]) => {
    const sortedProgress = [...progressData].sort((a, b) => a.week - b.week);

    const result: ProgressType[] = [];
    let lastValidData: ProgressType | null = null;

    for (const weekData of sortedProgress) {
      if (weekData.realisasi !== 0 || weekData.rencana !== 0) {
        result.push(weekData);
        lastValidData = weekData;
      } else if (lastValidData) {
        const modifiedWeekData = {
          ...weekData,
          realisasi: lastValidData.realisasi,
          rencana: lastValidData.rencana,
          deviasi: lastValidData.deviasi,
          sourceWeek: lastValidData.week,
        };
        result.push(modifiedWeekData);
      } else {
        result.push(weekData);
      }
    }

    return result;
  };

  console.log(contractsData)

  const handleExport = async () => {
    if (selectedRows.length === 0) {
      toast.error("Pilih setidaknya satu kontrak untuk diekspor.");
      return;
    }

    if (!selectedWeekRange) {
      toast.warning(
        "Pilih periode minggu terlebih dahulu untuk mengekspor progress."
      );
      return;
    }

    setIsExporting(true);

    try {
      const contractsToExport = contracts.filter((c) =>
        selectedRows.includes(c.id)
      );

      const contractsWithFilteredProgress = contractsToExport
        .map((contract) => {
          if (
            !contract.physicalProgress ||
            contract.physicalProgress.length === 0
          ) {
            return null;
          }

          const processedProgressData = processProgressDataWithContinuity(
            contract.physicalProgress
          );
          console.log(processProgressDataWithContinuity);

          let maxRealisasi = { value: 0, week: 0 };
          let maxRencana = { value: 0, week: 0 };

          const filteredWeeks = processedProgressData
            .filter((week) => {
              const weekStart = week.startDate
                ? new Date(week.startDate)
                : null;

              if (!weekStart || !isValid(weekStart)) return false;

              if (week.realisasi > maxRealisasi.value) {
                maxRealisasi = { value: week.realisasi, week: week.week };
              }
              if (week.rencana > maxRencana.value) {
                maxRencana = { value: week.rencana, week: week.week };
              }

              return isWithinInterval(weekStart, {
                start: selectedWeekRange.start,
                end: selectedWeekRange.end,
              });
            })
            .map((week) => {
              const start = week.startDate ? new Date(week.startDate) : null;
              const end = week.endDate ? new Date(week.endDate) : null;

              const dataSourceNote =
                "sourceWeek" in week
                  ? `data diambil dari week ${week.sourceWeek}`
                  : "";

              return {
                bulan: week.month,
                minggu: `Minggu ${week.week}`,
                periode:
                  start && end
                    ? `${format(start, "dd/MM")} - ${format(end, "dd/MM/yy")}`
                    : "Tanggal tidak valid",
                rencana: `${week.rencana}%`,
                realisasi: `${week.realisasi}%`,
                // rencana: `${week.rencana}%${
                //   week.rencana === maxRencana.value
                //     ? ` (tertinggi, Minggu ${week.week})`
                //     : ""
                // }`,
                // realisasi: `${week.realisasi}%${
                //   week.realisasi === maxRealisasi.value
                //     ? ` (tertinggi, Minggu ${week.week})`
                //     : ""
                // }`,
                deviasi: `${week.deviasi}%`,
                weekNumber: week.week,
                dataSourceNote,
                bermasalah: week.bermasalah,
                deskripsiMasalah: week.deskripsiMasalah || "",
              };
            });

          const contractStartDate = contract.tanggalKontrak
            ? new Date(contract.tanggalKontrak)
            : null;
          const akhirKontrakAsli =
            contractStartDate && contract.masaPelaksanaan
              ? addDays(contractStartDate, contract.masaPelaksanaan)
              : null;

          const realisasiKeuangan =
            contract.financialProgress?.totalPayment || 0;

          const koordinatAwal = contract.location?.koordinatAwal || "";
          const koordinatAkhir = contract.location?.koordinatAkhir || "";

          function calculateFinalContractEndDate(contract: any): string {
            if (!contract.tanggalKontrak) return "-";

            const endDate = new Date(contract.tanggalKontrak);

            endDate.setDate(
              endDate.getDate() + (contract.masaPelaksanaan || 0)
            );

            if (contract.addendum && contract.addendum.length > 0) {
              const totalAddendumDays = contract.addendum.reduce(
                (sum: number, add: any) => {
                  return sum + (add.hari ? parseInt(add.hari) : 0);
                },
                0
              );
              endDate.setDate(endDate.getDate() + totalAddendumDays);
            }

            return format(endDate, "dd/MM/yyyy");
          }

          return filteredWeeks.length > 0
            ? {
                id: contract.id,
                namaPaket: contract.namaPaket,
                namaPenyedia: contract.namaPenyedia,
                ppk: contract.ppk,
                korwaslap: contract.korwaslap,
                pengawasLapangan: contract.pengawasLapangan,
                nilaiKontrak: contract.nilaiKontrak,
                totalFinancialProgress: contract.financialProgress?.totalProgress,
                nilaiKontrakFisik: contract.nilaiKontrak,
                tanggalKontrak: contract.tanggalKontrak,
                masaPelaksanaan: contract.masaPelaksanaan,
                konsultanSupervisi: contract.konsultanSupervisi || "-",
                nilaiKontrakSupervisi: contract.nilaiKontrakSupervisi || 0,
                volumeKontrak: contract.volumeKontrak || "-",
                satuanKontrak: contract.satuanKontrak || "-",
                hasilProdukAkhir: contract.hasilProdukAkhir || "-",
                koordinatAwal,
                koordinatAkhir,
                realisasiKeuangan,
                akhirKontrakAsli: akhirKontrakAsli
                  ? format(akhirKontrakAsli, "dd/MM/yyyy")
                  : "-",
                akhirKontrakAdd: calculateFinalContractEndDate(contract),
                // permasalahan: contract.permasalahan || "-",
                progressData: filteredWeeks,
                maxRealisasiWeek: maxRealisasi.week,
                maxRencanaWeek: maxRencana.week,
                status: contract.status,
                progressPercentage: contract.progressPercentage,
              }
            : null;
        })
        .filter(Boolean);

      if (contractsWithFilteredProgress.length === 0) {
        toast.warning(
          "Tidak ada data progress ditemukan untuk kontrak terpilih pada periode minggu tersebut."
        );
        return;
      }

      const fileNameBase = `Progress_Mingguan_${format(
        selectedWeekRange.start,
        "yyyy-MM-dd"
      )}`;

      const title = `Laporan Progress Mingguan (${format(
        selectedWeekRange.start,
        "dd MMM"
      )} - ${format(selectedWeekRange.end, "dd MMM yyyy")})`;

      const pdfData = {
        title,
        contracts: contractsWithFilteredProgress.map((contract) => {
          const allProblems = contract!.progressData
            .filter((progress) => progress.bermasalah)
            .map((progress) => ({
              week: progress.weekNumber,
              description:
                progress.deskripsiMasalah || "Tidak ada deskripsi masalah",
            }));

          // Format the problems for display
          const formattedProblems =
            allProblems.length > 0
              ? allProblems
                  .map((p) => `Minggu ${p.week}: ${p.description}`)
                  .join("; ")
              : "";
          return {
            namaPaket: contract!.namaPaket,
            namaPenyedia: contract!.namaPenyedia,
            ppk: contract!.ppk,
            korwaslap: contract!.korwaslap,
            pengawasLapangan: contract!.pengawasLapangan,
            nilaiKontrak: contract!.nilaiKontrak,
            totalFinancialProgress: contract!.totalFinancialProgress,
            nilaiKontrakFisik: contract!.nilaiKontrakFisik,
            tanggalKontrak: contract!.tanggalKontrak,
            masaPelaksanaan: contract!.masaPelaksanaan,
            konsultanSupervisi: contract!.konsultanSupervisi,
            nilaiKontrakSupervisi: contract!.nilaiKontrakSupervisi,
            volumeKontrak: contract!.volumeKontrak,
            satuanKontrak: contract!.satuanKontrak,
            hasilProdukAkhir: contract!.hasilProdukAkhir,
            koordinatAwal: contract!.koordinatAwal,
            koordinatAkhir: contract!.koordinatAkhir,
            realisasiKeuangan: formatRupiah(contract!.realisasiKeuangan),
            akhirKontrakAsli: contract!.akhirKontrakAsli,
            akhirKontrakAdd: contract!.akhirKontrakAdd,
            permasalahan: formattedProblems,
            status: contract!.status,
            progressPercentage: contract!.progressPercentage,
            progressData: contract!.progressData.map((progress) => ({
              bulan: progress.bulan,
              minggu: progress.minggu,
              periode: progress.periode,
              rencana: parseFloat(progress.rencana).toFixed(2) + " %",
              realisasi: parseFloat(progress.realisasi).toFixed(2) + " %",
              deviasi: parseFloat(progress.deviasi).toFixed(2) + " %",
              bermasalah: progress.bermasalah,
              deskripsiMasalah: progress.deskripsiMasalah,
              keterangan: [
                progress.weekNumber === contract!.maxRealisasiWeek
                  ? `Nilai realisasi tertinggi (Minggu ${
                      contract!.maxRealisasiWeek
                    })`
                  : null,
                progress.weekNumber === contract!.maxRencanaWeek
                  ? `Nilai rencana tertinggi (Minggu ${
                      contract!.maxRencanaWeek
                    })`
                  : null,
                progress.dataSourceNote ? progress.dataSourceNote : null,
                progress.bermasalah
                  ? `Bermasalah: ${progress.deskripsiMasalah}`
                  : null,
              ]
                .filter(Boolean)
                .join(", "),
            })),
            totalProgress:
              contract!.progressData.reduce((sum, p) => {
                return (
                  sum + parseFloat(p.realisasi.replace("%", "").split(" ")[0])
                );
              }, 0) / contract!.progressData.length,
            keterangan: [
              contract?.progressData.some(
                (item) => item.weekNumber > contract.maxRealisasiWeek
              )
                ? `Data diambil dari minggu ke-${contract!.maxRealisasiWeek}`
                : "",
              // `Nilai realisasi tertinggi: Minggu ${contract!.maxRealisasiWeek}`,
              // `Nilai rencana tertinggi: Minggu ${contract!.maxRencanaWeek}`,
              // `Status: ${contract!.status}`,
              // `Progress Keseluruhan: ${contract!.progressPercentage.toFixed(2)}%`,
            ].join("; "),
          };
        }),
        weekRange: selectedWeekRange,
        columns: [
          { id: "namaPaket", label: "Nama Paket" },
          { id: "namaPenyedia", label: "Nama Penyedia" },
          { id: "konsultanSupervisi", label: "Konsultan Supervisi" },
          { id: "volumeKontrak", label: "Volume Kontrak" },
          { id: "koordinatAwal", label: "Koordinat Awal" },
          { id: "koordinatAkhir", label: "Koordinat Akhir" },
          { id: "nilaiKontrakFisik", label: "Nilai Kontrak Fisik" },
          { id: "nilaiKontrakSupervisi", label: "Nilai Kontrak Supervisi" },
          { id: "hasilProdukAkhir", label: "Produk Akhir" },
          { id: "realisasiKeuangan", label: "Realisasi Keuangan" },
          { id: "akhirKontrakAsli", label: "Akhir Kontrak Asli" },
          { id: "akhirKontrakAdd", label: "Akhir Kontrak Add" },
          { id: "permasalahan", label: "Permasalahan" },
          { id: "ppk", label: "PPK" },
          { id: "rencana", label: "Rencana" },
          { id: "realisasi", label: "Realisasi" },
          { id: "deviasi", label: "Deviasi" },
          { id: "keterangan", label: "Ket" },
        ],
        defaultVisible: [
          "namaPaket",
          "namaPenyedia",
          "konsultanSupervisi",
          "volumeKontrak",
          "nilaiKontrakFisik",
          "realisasiKeuangan",
          "rencana",
          "realisasi",
          "deviasi",
          "keterangan",
        ],
      };

      console.log({contractsToExport, pdfData})

      sessionStorage.setItem("pdfExportData", JSON.stringify(pdfData));
      router.push("/dashboard/report/pdf");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Gagal melakukan ekspor PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const updateURLParams = (params: Record<string, string | null>) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
    });

    if ("search" in params || "status" in params) {
      urlParams.set("page", "1");
    }

    router.replace(`?${urlParams.toString()}`, { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    updateURLParams({ search: value || null });
  };

  const handleStatusFilterChange = (values: string[]) => {
    updateURLParams({
      status: values.length > 0 ? values.join(",") : null,
    });
  };

  const handleResetFilter = () => {
    updateURLParams({
      search: null,
      status: null,
      page: "1",
    });
  };

  const statusOptions = [
    { value: "Berjalan", label: "Berjalan" },
    { value: "Selesai", label: "Selesai" },
    { value: "Bermasalah", label: "Bermasalah" },
    { value: "Terlambat", label: "Terlambat" },
    { value: "Kesempatan", label: "Kesempatan" },
  ];

  if (error) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground">
            Gagal memuat data kontrak. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Export Progress Kontrak
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola dan ekspor data progress kontrak per minggu
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <DataTableSearch
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari kontrak..."
          />
          <DataTableFilter
            options={statusOptions}
            selectedValues={statusFilter}
            onChange={handleStatusFilterChange}
            label="Filter Status"
            buttonLabel="Status"
          />
        </div>
      </div>

      {/* Export Toolbar */}
      <ExportToolbar
        onExport={handleExport}
        isExporting={isExporting}
        disabled={selectedRows.length === 0 || !selectedWeekRange}
        selectedCount={selectedRows.length}
        totalCount={filteredContracts.length}
      >
        <DateWeekPicker
          selectedDate={selectedDateForWeek}
          onChange={(date) => {
            setSelectedDateForWeek(date);
            refetch();
          }}
          weekRange={selectedWeekRange}
          onWeekRangeChange={handleWeekRangeChange}
        />
      </ExportToolbar>

      {/* Table Section */}
      <DataTable
        columns={columns}
        data={filterContractsByWeekRange}
        isLoading={isLoading}
        totalItems={totalContracts}
        onRowSelectionChange={setRowSelection}
        noDataMessage="Tidak ada data kontrak tersedia"
        noFilteredDataMessage="Tidak ada kontrak yang sesuai dengan filter"
        filterActive={searchQuery !== "" || statusFilter.length > 0}
        onResetFilter={handleResetFilter}
        tableName="kontrak"
      />
    </div>
  );
}
