"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
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

interface ProgressTableTypes {
  contracts?: Contract[];
}

function ProgressTable({ contracts }: ProgressTableTypes) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
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
            <span title={row.original.namaPaket}>{row.original.namaPaket}</span>
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
            <Button onClick={() => router.push(`${pathname}/${contract.id}/edit`)} variant="outline">
              <Edit />
            </Button>
            <Button onClick={() => router.push(`${pathname}/${contract.id}/view`)} variant="outline">
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

  return (
    <DataTable
      columns={columns}
      data={contracts || []}
      searchKey="name"
      onSearch={handleSearch}
      pageSizeOptions={[5, 10, 20, 50]}
      defaultPageSize={10}
    />
  );
}

export default ProgressTable;
