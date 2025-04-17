"use client";
import { useState, useMemo } from "react";
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
  Sheet,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import { exportToExcel, exportToPDF } from "./export-utils";
import { formatRupiah } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const dummyContracts = [
  {
    id: "C001",
    namaPaket: "Pembangunan Jembatan Desa Maju",
    namaPenyedia: "PT Konstruksi Jaya",
    nilaiKontrak: 1250000000,
    tanggalKontrak: "2023-05-15",
    masaPelaksanaan: 180,
    lokasi: "Distrik A, Kampung Sejahtera",
    status: "Berjalan",
    progress: 45,
    monthlyProgress: [
      {
        month: "Januari 2024",
        weeks: [
          { week: 1, rencana: 5, realisasi: 4, deviasi: -1 },
          { week: 2, rencana: 7, realisasi: 6, deviasi: -1 },
        ],
      },
      {
        month: "Februari 2024",
        weeks: [
          { week: 1, rencana: 8, realisasi: 9, deviasi: 1 },
          { week: 2, rencana: 10, realisasi: 8, deviasi: -2 },
        ],
      },
    ],
  },
  {
    id: "C002",
    namaPaket: "Rehabilitasi Jalan Utama",
    namaPenyedia: "CV Bangun Bersama",
    nilaiKontrak: 850000000,
    tanggalKontrak: "2023-07-20",
    masaPelaksanaan: 120,
    lokasi: "Distrik B, Kampung Makmur",
    status: "Selesai",
    progress: 100,
    monthlyProgress: [
      {
        month: "November 2023",
        weeks: [
          { week: 1, rencana: 15, realisasi: 14, deviasi: -1 },
          { week: 2, rencana: 20, realisasi: 22, deviasi: 2 },
        ],
      },
      {
        month: "Desember 2023",
        weeks: [
          { week: 1, rencana: 25, realisasi: 24, deviasi: -1 },
          { week: 2, rencana: 40, realisasi: 40, deviasi: 0 },
        ],
      },
    ],
  },
  // ... tambahkan kontrak lainnya dengan struktur yang sama
];

export default function ContractExportPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedProgress, setSelectedProgress] = useState<
    Record<string, string[]>
  >({});
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportType, setExportType] = useState<"excel" | "pdf" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Filter data
  const filteredContracts = useMemo(() => {
    return dummyContracts.filter((contract) => {
      const matchesSearch =
        contract.namaPaket.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.namaPenyedia
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        contract.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(contract.status);

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Toggle pilihan kontrak
  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Toggle semua kontrak
  const toggleAllRows = () => {
    if (selectedRows.length === filteredContracts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredContracts.map((c) => c.id));
    }
  };

  // Toggle pilihan progress
  const toggleProgressSelection = (contractId: string, progressId: string) => {
    setSelectedProgress((prev) => {
      const newSelection = { ...prev };
      if (!newSelection[contractId]) {
        newSelection[contractId] = [];
      }

      if (newSelection[contractId].includes(progressId)) {
        newSelection[contractId] = newSelection[contractId].filter(
          (id) => id !== progressId
        );
      } else {
        newSelection[contractId].push(progressId);
      }

      return newSelection;
    });
  };

  // Toggle semua progress dalam kontrak
  const toggleAllProgressInContract = (contractId: string) => {
    const contract = dummyContracts.find((c) => c.id === contractId);
    if (!contract) return;

    const allProgressIds = contract.monthlyProgress.flatMap((m) =>
      m.weeks.map((w) => `${m.month}-week-${w.week}`)
    );

    setSelectedProgress((prev) => {
      const isAllSelected = allProgressIds.every((id) =>
        prev[contractId]?.includes(id)
      );

      return {
        ...prev,
        [contractId]: isAllSelected ? [] : allProgressIds,
      };
    });
  };

  // Handle export
  const handleExport = () => {
    if (!exportType) return;

    const contractsToExport = dummyContracts
      .filter((c) => selectedRows.includes(c.id))
      .map((contract) => {
        const selected = selectedProgress[contract.id] || [];
        const progressData = contract.monthlyProgress.flatMap((m) =>
          m.weeks
            .filter((w) => selected.includes(`${m.month}-week-${w.week}`))
            .map((w) => ({
              bulan: m.month,
              minggu: `Minggu ${w.week}`,
              rencana: `${w.rencana}%`,
              realisasi: `${w.realisasi}%`,
              deviasi: `${w.deviasi}%`,
            }))
        );

        return {
          id: contract.id,
          namaPaket: contract.namaPaket,
          nilaiKontrak: contract.nilaiKontrak,
          tanggalKontrak: contract.tanggalKontrak,
          masaPelaksanaan: contract.masaPelaksanaan,
          // volumeKontrak: contract.volumeKontrak,
          // satuanKontrak: contract.satuanKontrak,
          // endDate: contract.endDate,
          progressData,
        };
      });

    if (exportType === "excel") {
      exportToExcel(contractsToExport, "Progress_Kontrak");
    } else {
      exportToPDF({
        title: "Laporan Progress Multiple Kontrak",
        headers: [
          "Nama Paket",
          "Bulan",
          "Minggu",
          "Rencana",
          "Realisasi",
          "Deviasi",
        ],
        data: contractsToExport.flatMap((c) =>
          c.progressData.map((p) => [
            c.namaPaket,
            p.bulan,
            p.minggu,
            p.rencana,
            p.realisasi,
            p.deviasi,
          ])
        ),
        fileName: "Progress_Multiple_Kontrak.pdf",
      });
    }

    setIsExportDialogOpen(false);
    setExportType(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header dan Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h1 className="text-2xl font-bold">Manajemen Kontrak</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Cari kontrak..."
            className="w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Berjalan", "Selesai", "Bermasalah"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={statusFilter.includes(status)}
                      onCheckedChange={() =>
                        setStatusFilter((prev) =>
                          prev.includes(status)
                            ? prev.filter((s) => s !== status)
                            : [...prev, status]
                        )
                      }
                    />
                    {status}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
        <div>
          {selectedRows.length > 0 ? (
            <span>{selectedRows.length} kontrak terpilih</span>
          ) : (
            <span>{filteredContracts.length} total kontrak</span>
          )}
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isExportDialogOpen}
            onOpenChange={setIsExportDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={selectedRows.length === 0}
                onClick={() => setExportType("excel")}
              >
                <Sheet className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                disabled={selectedRows.length === 0}
                onClick={() => setExportType("pdf")}
              >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Pilih Progress yang akan di-Export</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {dummyContracts
                  .filter((c) => selectedRows.includes(c.id))
                  .map((contract) => (
                    <div key={contract.id} className="border rounded-lg">
                      <div className="p-4 bg-muted/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={contract.monthlyProgress
                              .flatMap((m) =>
                                m.weeks.map((w) => `${m.month}-week-${w.week}`)
                              )
                              .every((id) =>
                                selectedProgress[contract.id]?.includes(id)
                              )}
                            onCheckedChange={() =>
                              toggleAllProgressInContract(contract.id)
                            }
                          />
                          <span className="font-medium">
                            {contract.namaPaket}
                          </span>
                        </div>
                        <Badge variant="outline">
                          Progress: {contract.progress}%
                        </Badge>
                      </div>
                      <div className="p-4 space-y-4">
                        {contract.monthlyProgress.map((month) => (
                          <div key={`${contract.id}-${month.month}`}>
                            <h3 className="font-medium mb-2">{month.month}</h3>
                            <div className="space-y-2 pl-4">
                              {month.weeks.map((week) => (
                                <div
                                  key={`${contract.id}-${month.month}-week-${week.week}`}
                                  className="flex items-center gap-4"
                                >
                                  <Checkbox
                                    checked={
                                      selectedProgress[contract.id]?.includes(
                                        `${month.month}-week-${week.week}`
                                      ) || false
                                    }
                                    onCheckedChange={() =>
                                      toggleProgressSelection(
                                        contract.id,
                                        `${month.month}-week-${week.week}`
                                      )
                                    }
                                  />
                                  <div className="flex-1">
                                    <p>Minggu {week.week}</p>
                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                      <span>Rencana: {week.rencana}%</span>
                                      <span>Realisasi: {week.realisasi}%</span>
                                      <span
                                        className={
                                          week.deviasi < 0
                                            ? "text-destructive"
                                            : "text-success"
                                        }
                                      >
                                        Deviasi: {week.deviasi}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsExportDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleExport}>
                  Export {exportType === "excel" ? "Excel" : "PDF"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabel Kontrak */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    selectedRows.length === filteredContracts.length &&
                    filteredContracts.length > 0
                  }
                  onCheckedChange={toggleAllRows}
                />
              </TableHead>
              <TableHead>ID Kontrak</TableHead>
              <TableHead>Nama Paket</TableHead>
              <TableHead>Penyedia</TableHead>
              <TableHead>Nilai Kontrak</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow
                key={contract.id}
                className={
                  selectedRows.includes(contract.id) ? "bg-primary/10" : ""
                }
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(contract.id)}
                    onCheckedChange={() => toggleRowSelection(contract.id)}
                  />
                </TableCell>
                <TableCell>{contract.id}</TableCell>
                <TableCell className="font-medium">
                  {contract.namaPaket}
                </TableCell>
                <TableCell>{contract.namaPenyedia}</TableCell>
                <TableCell>{formatRupiah(contract.nilaiKontrak)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={contract.progress} className="h-2" />
                    <span>{contract.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      contract.status === "Selesai"
                        ? "default"
                        : contract.status === "Bermasalah"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {contract.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
