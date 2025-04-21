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
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { Contract } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DeleteContractDialog } from "./delete-contract-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import * as XLSX from "xlsx"
import { format } from "date-fns";
import { toast } from "sonner";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataContractTableTypes {
  contracts?: Contract[];
}

function DataContractTable({ contracts }: DataContractTableTypes) {
  const {user} = useCurrentUser()
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
            <span title={row.original.namaPaket || "-"}>{row.original.namaPaket}</span>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`${pathname}/${contract.id}/view`)}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`${pathname}/${contract.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              {user?.role !== "CONSULTANT" && (
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600" 
                  onSelect={(e) => e.preventDefault()}
                >
                  <DeleteContractDialog
                    contractId={contract.id}
                    contractName={contract.namaPaket || "-"}
                    trigger={
                      <div className="flex items-center w-full">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </div>
                    }
                  />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
    XLSX.writeFile(workbook, `laporan_${format(new Date(), "dd-MMM-yyyy")}.xlsx`);
  };

  const handleExportPDF = (filteredData: Record<string, any>[]) => {
    console.log("Filtered data for pdf:", filteredData);
  };

  return (
    <DataTable
      additionalButton={user?.role !== "CONSULTANT" ? <Button variant="outline" onClick={() => router.push(`${pathname}/create`)}>Create New Contract</Button> : undefined}
      columns={columns}
      data={contracts || []}
      searchKey="name"
      pageSizeOptions={[5, 10, 20, 50]}
      defaultPageSize={10}
      onSearch={handleSearch}
    />
  );
}

export default DataContractTable;