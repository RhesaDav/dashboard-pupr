"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileText,
  Filter,
  Calendar as CalendarIcon,
  Loader2,
} from "lucide-react";

import { exportToExcel, exportToPDF } from "./export-utils";
import { cn, formatRupiah } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  format,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  isValid,
} from "date-fns";
import { id as indonesiaLocale } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getAllContracts } from "@/actions/contract";
import { Contract, Progress as ProgressType } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams, useRouter } from "next/navigation";

interface ContractWithProgress extends Contract {
  progress: ProgressType[];
  progressPercentage?: number;
  status?: string;
}

export default function ContractExportPage() {
  const [contracts, setContracts] = useState<ContractWithProgress[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedDateForWeek, setSelectedDateForWeek] = useState<
    Date | undefined
  >();
  const [selectedWeekRange, setSelectedWeekRange] = useState<
    { start: Date; end: Date } | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalContracts, setTotalContracts] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status")?.split(",") || [];
  const pageParam = parseInt(searchParams.get("page") || "1");
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10");

  useEffect(() => {
    const fetchDataContracts = async () => {
      setIsLoading(true);
      try {
        const result = await getAllContracts(pageParam, pageSizeParam, searchQuery);
        if (result.contracts) {
          // Calculate additional fields
          const contractsWithCalculatedFields = result.contracts.map(
            (contract) => {
              // Calculate progress percentage
              const progressPercentage = calculateProgressPercentage(contract);

              // Determine status
              const status = determineContractStatus(
                contract,
                progressPercentage
              );

              return {
                ...contract,
                progressPercentage,
                status,
              };
            }
          );

          setContracts(contractsWithCalculatedFields);
          setTotalContracts(result.contracts.length || 0);
          
          // Reset row selection when data changes
          setRowSelection({});
        }
      } catch (error) {
        toast.error("Gagal memuat data kontrak");
        console.error("Error fetching contracts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataContracts();
  }, [searchQuery, pageParam, pageSizeParam]);

  // Helper function to calculate progress percentage
  const calculateProgressPercentage = (
    contract: ContractWithProgress
  ): number => {
    if (!contract.progress || contract.progress.length === 0) return 0;

    const totalProgress = contract.progress.reduce(
      (sum, p) => sum + p.realisasi,
      0
    );
    return totalProgress / contract.progress.length;
  };

  // Helper function to determine contract status
  const determineContractStatus = (
    contract: Contract,
    progress: number
  ): string => {
    const today = new Date();
    const endDate = contract.endDate ? new Date(contract.endDate) : null;

    if (progress >= 100) return "Selesai";
    if (contract.kendala) return "Bermasalah";
    if (endDate && today > endDate) return "Terlambat";
    if (contract.pemberianKesempatan) return "Kesempatan";
    return "Berjalan";
  };

  // Apply status filter to data
  const filteredContracts = useMemo(() => {
    if (statusFilter.length === 0) return contracts;
    return contracts.filter(
      (contract) => contract.status && statusFilter.includes(contract.status)
    );
  }, [contracts, statusFilter]);

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
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {(row.getValue("id") as string).substring(0, 6)}...
        </span>
      ),
    },
    {
      accessorKey: "namaPaket",
      header: "Nama Paket",
    },
    {
      accessorKey: "namaPenyedia",
      header: "Penyedia",
    },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: ({ row }) => formatRupiah(row.getValue("nilaiKontrak")),
    },
    {
      accessorKey: "progressPercentage",
      header: "Progress",
      cell: ({ row }) => {
        const progress = row.original.progressPercentage || 0;
        return (
          <div className="flex items-center gap-2 w-[100px]">
            <Progress value={progress} className="h-1.5" />
            <span className="text-xs flex-shrink-0">
              {Math.round(progress)}%
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status || "Berjalan";
        return (
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
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredContracts,
    columns,
    state: {
      rowSelection,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalContracts / pagination.pageSize),
    manualPagination: true,
  });

  // Update URL when pagination changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pagination.pageIndex + 1));
    params.set("pageSize", String(pagination.pageSize));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [pagination, router, searchParams]);

  const selectedRows = useMemo(() => {
    return Object.keys(rowSelection).map(
      (rowId) => filteredContracts[parseInt(rowId)].id
    );
  }, [rowSelection, filteredContracts]);

  const handleWeekSelect = (date: Date | undefined) => {
    setSelectedDateForWeek(date);
    if (date) {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const end = endOfWeek(date, { weekStartsOn: 1 });
      setSelectedWeekRange({ start, end });
    } else {
      setSelectedWeekRange(undefined);
    }
  };
  
  const handleExport = async (formatType: "excel" | "pdf") => {
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
          if (!contract.progress || contract.progress.length === 0) {
            return null;
          }

          const filteredWeeks = contract.progress
            .filter((week) => {
              const weekStart = week.startDate ? new Date(week.startDate) : null;

              if (!weekStart || !isValid(weekStart)) return false;

              return isWithinInterval(weekStart, {
                start: selectedWeekRange.start,
                end: selectedWeekRange.end,
              });
            })
            .map((week) => {
              const start = week.startDate ? new Date(week.startDate) : null;
              const end = week.endDate ? new Date(week.endDate) : null;

              return {
                bulan: week.month,
                minggu: `Minggu ${week.week}`,
                periode:
                  start && end
                    ? `${format(start, "dd/MM")} - ${format(end, "dd/MM/yy")}`
                    : "Tanggal tidak valid",
                rencana: `${week.rencana}%`,
                realisasi: `${week.realisasi}%`,
                deviasi: `${week.deviasi}%`,
              };
            });

          return filteredWeeks.length > 0
            ? {
                id: contract.id,
                namaPaket: contract.namaPaket,
                progressData: filteredWeeks,
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

      const headers = [
        "Nama Paket",
        "Bulan",
        "Minggu",
        "Periode",
        "Rencana",
        "Realisasi",
        "Deviasi",
      ];

      const pdfData = contractsWithFilteredProgress.flatMap((contract: any) =>
        contract.progressData.map((p: any) => [
          contract.namaPaket,
          p.bulan,
          p.minggu,
          p.periode,
          p.rencana,
          p.realisasi,
          p.deviasi,
        ])
      );

      if (formatType === "pdf") {
        await exportToPDF({
          title,
          headers,
          data: pdfData,
          fileName: `${fileNameBase}.pdf`,
        });
        
        toast.success("Berhasil mengekspor ke PDF");
      } else {
        // Excel export implementation
        const excelData = contractsWithFilteredProgress.flatMap((contract: any) =>
          contract.progressData.map((p: any) => ({
            "Nama Paket": contract.namaPaket,
            "Bulan": p.bulan,
            "Minggu": p.minggu,
            "Periode": p.periode,
            "Rencana": p.rencana,
            "Realisasi": p.realisasi,
            "Deviasi": p.deviasi
          }))
        );
        
        await exportToExcel(
          // title,
          excelData,
          `${fileNameBase}.xlsx`,
          // sheetName: "Progress Mingguan"
        );
        
        toast.success("Berhasil mengekspor ke Excel");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`Gagal melakukan ekspor ke ${formatType.toUpperCase()}`);
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
    
    // Reset to page 1 when filters change
    if ('search' in params || 'status' in params) {
      urlParams.set('page', '1');
    }
    
    router.replace(`?${urlParams.toString()}`, { scroll: false });
  };

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
          <Input
            placeholder="Cari kontrak..."
            className="w-full md:w-[250px]"
            value={searchQuery}
            onChange={(e) => {
              updateURLParams({ search: e.target.value || null });
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Status
                {statusFilter.length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {statusFilter.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                "Berjalan",
                "Selesai",
                "Bermasalah",
                "Terlambat",
                "Kesempatan",
              ].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    const newStatus = checked
                      ? [...statusFilter, status]
                      : statusFilter.filter((s) => s !== status);
                    
                    updateURLParams({ 
                      status: newStatus.length > 0 ? newStatus.join(",") : null 
                    });
                  }}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Export Toolbar */}
      <div className="bg-card rounded-lg border p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm">
            {selectedRows.length > 0 ? (
              <span className="font-medium">
                {selectedRows.length} kontrak terpilih
              </span>
            ) : (
              <span className="text-muted-foreground">
                {filteredContracts.length} kontrak tersedia
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="week-picker"
                className="text-sm whitespace-nowrap"
              >
                Periode Minggu:
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="week-picker"
                    variant={"outline"}
                    size="sm"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedWeekRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedWeekRange ? (
                      `${format(selectedWeekRange.start, "dd MMM")} - ${format(
                        selectedWeekRange.end,
                        "dd MMM yy"
                      )}`
                    ) : (
                      <span>Pilih minggu</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDateForWeek}
                    onSelect={handleWeekSelect}
                    modifiers={{
                      ...(selectedWeekRange && {
                        selectedWeek: {
                          from: selectedWeekRange.start,
                          to: selectedWeekRange.end,
                        },
                      }),
                      today: new Date(),
                    }}
                    modifiersStyles={{
                      selectedWeek: {
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                      },
                      today: {
                        fontWeight: "bold",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    initialFocus
                    locale={indonesiaLocale}
                    showOutsideDays={false}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={
                  selectedRows.length === 0 || !selectedWeekRange || isExporting
                }
                onClick={() => handleExport("excel")}
                className="gap-2"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                Excel
              </Button>
              <Button
                size="sm"
                disabled={
                  selectedRows.length === 0 || !selectedWeekRange || isExporting
                }
                onClick={() => handleExport("pdf")}
                className="gap-2"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Memuat data kontrak...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredContracts.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {searchQuery || statusFilter.length > 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <span>Tidak ada kontrak yang sesuai dengan filter</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          updateURLParams({
                            search: null,
                            status: null,
                            page: "1"
                          });
                        }}
                      >
                        Reset filter
                      </Button>
                    </div>
                  ) : (
                    "Tidak ada data kontrak tersedia"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && totalContracts > 0 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Menampilkan {(pagination.pageIndex * pagination.pageSize) + 1} hingga{" "}
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalContracts)} dari{" "}
            {totalContracts} kontrak
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}