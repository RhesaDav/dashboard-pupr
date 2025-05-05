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
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getAllContracts } from "@/actions/contract";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatRupiah } from "@/lib/utils";

function ProgressTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1");
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10");

  const {
    data: contracts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["contracts", pageParam, pageSizeParam, searchQuery],
    queryFn: () =>
      getAllContracts({
        page: pageParam,
        limit: pageSizeParam,
        search: searchQuery,
      }),
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
            <span title={nomorKontrak}>{nomorKontrak || "-"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: ({ row }) => {
        const nilai = row.getValue("nilaiKontrak") as number;
        const formatted = formatRupiah(nilai)

        return (
          <div className="relative max-w-[120px] truncate">
            <span title={formatted}>{formatted}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "tanggalKontrak",
      header: "Tanggal Kontrak",
      cell: ({ row }) => {
        const tanggalKontrak = format(
          row.getValue("tanggalKontrak"),
          "dd MMM yyyy"
        ) as string;

        return (
          <div className="relative max-w-[120px] truncate">
            <span title={tanggalKontrak}>{tanggalKontrak}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const contract = row.original;
        return (
          <div className="flex items-center gap-1">
            {/* View Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      router.push(`${pathname}/${contract.id}/view`)
                    }
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View contract</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Edit Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      router.push(`${pathname}/${contract.id}/edit`)
                    }
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit contract</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          <h1 className="text-2xl font-bold tracking-tight">Progress Fisik</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola progress fisik
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

export default ProgressTable;
