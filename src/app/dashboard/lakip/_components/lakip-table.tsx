"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Trash,
} from "lucide-react";
import { Contract } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getAllContracts } from "@/actions/contract";
import { Input } from "@/components/ui/input";

interface LakipTableTypes {
  contracts?: Contract[];
}

function LakipTable({}: LakipTableTypes) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["kontrak-lakip"],
    queryFn: () => getAllContracts(),
  });

  const columns: ColumnDef<Contract>[] = [
    {
      accessorKey: "namaPaket",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Paket
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="relative max-w-[280px] truncate">
            <span title={row.original.namaPaket || "-"}>
              {row.original.namaPaket}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "nomorKontrak",
      header: "Nomor Kontrak",
      cell: ({ row }) => {
        const nomorKontrak = row.getValue("nomorKontrak") as string;
        return (
          <div className="relative max-w-[150px] truncate">
            <span title={nomorKontrak}>{nomorKontrak}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: ({ row }) => {
        const nilai = row.getValue("nilaiKontrak") as number;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(nilai);

        return (
          <div className="relative max-w-[120px] truncate">
            <span title={formatted}>{formatted}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const contract = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.push(`${pathname}/${contract.id}/view`)}
              variant="outline"
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleExportExcel = (filteredData: Record<string, any>[]) => {
    console.log("Filtered data for Excel:", filteredData);

    if (filteredData.length === 0) {
      toast.error("Please select at least one row to export");
      return;
    }

    // Create worksheet from the selected data
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Data");

    // Generate and download Excel file
    XLSX.writeFile(
      workbook,
      `laporan_${format(new Date(), "dd-MMM-yyyy")}.xlsx`
    );
  };

  const handleExportPDF = (filteredData: Record<string, any>[]) => {
    console.log("Filtered data for pdf:", filteredData);
  };

  const handleResetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", "");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lakip</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kelola Lakip
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <Input onChange={handleSearch} placeholder="Cari kontrak..." />
        <Button
          variant={"outline"}
          onClick={() => router.push(`${pathname}/create`)}
        >
          Create New
        </Button>
      </div>
    </div>
    <DataTable
      columns={columns}
      data={contracts?.data || []}
      isLoading={isLoading}
      totalItems={contracts?.pagination?.total || 0}
      noDataMessage="Tidak ada data kontrak tersedia"
      noFilteredDataMessage="Tidak ada kontrak yang sesuai dengan filter"
      filterActive={searchParams.get("search") !== ""}
      onResetFilter={handleResetFilter}
      tableName="kontrak"
    />
    </div>
  );
}

export default LakipTable;
