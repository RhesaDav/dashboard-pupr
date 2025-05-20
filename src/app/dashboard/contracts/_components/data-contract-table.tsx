"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import { Contract } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DeleteContractDialog } from "./delete-contract-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { toast } from "sonner";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { deleteContract, getAllContracts } from "@/actions/contract";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatRupiah } from "@/lib/utils";

function DataContractTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1");
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10");

  const {
    data: contractsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contracts", pageParam, pageSizeParam, searchQuery],
    queryFn: () =>
      getAllContracts({
        page: pageParam,
        limit: pageSizeParam,
        search: searchQuery,
      }),
    refetchOnMount: "always",
  });

  const { user } = useCurrentUser();

  const columns: ColumnDef<Partial<Contract>>[] = [
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
      accessorKey: "namaPenyedia",
      header: "Nama Penyedia",
      cell: ({ row }) => {
        const namaPenyedia = row.getValue("namaPenyedia") as string;
        return (
          <div className="relative max-w-[150px] truncate">
            <span title={namaPenyedia}>{namaPenyedia || "-"}</span>
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
        const formatted = formatRupiah(nilai);

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
        return (
          <div className="relative max-w-[120px] truncate">
            <span title={format(row.original.tanggalKontrak!, "dd-MM-yyyy")}>
              {format(row.original.tanggalKontrak!, "dd MMM yyyy")}
            </span>
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

            {/* Delete Button (conditional) */}
            {user?.role === "SUPERADMIN" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DeleteContractDialog
                      onDelete={async () => {
                        const res = await deleteContract(contract.id as string);
                        if (res.success) {
                          toast.success(
                            `Contract ${contract.namaPaket} berhasil dihapus`
                          );
                          refetch();
                        } else {
                          toast.error(`Gagal menghapus contract`);
                        }
                      }}
                      contractId={String(contract.id)}
                      contractName={contract.namaPaket || "-"}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete contract</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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
          <h1 className="text-2xl font-bold tracking-tight">Data Kontrak</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola dan ekspor data kontrak
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
        data={contractsData?.data || []}
        isLoading={isLoading}
        totalItems={contractsData?.pagination?.total || 0}
        noDataMessage="Tidak ada data kontrak tersedia"
        noFilteredDataMessage="Tidak ada kontrak yang sesuai dengan filter"
        filterActive={searchParams.get("search") !== ""}
        onResetFilter={handleResetFilter}
        tableName="kontrak"
      />
    </div>
  );
}

export default DataContractTable;
