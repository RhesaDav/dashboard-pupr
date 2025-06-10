"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ArrowUpDown, Edit, Eye, MoreHorizontalIcon } from "lucide-react";
import { Contract, FinancialProgress } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getAllContracts } from "@/actions/contract";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ContractWithFinancialProgress = Contract & {
  financialProgress: FinancialProgress | null;
};

function FinancialProgressTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1");
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10");

  const { data: contractsData, isLoading } = useQuery({
    queryKey: ["contracts-financial", pageParam, pageSizeParam, searchQuery],
    queryFn: () =>
      getAllContracts({
        page: pageParam,
        limit: pageSizeParam,
        search: searchQuery,
      }),
  });

  const columns: ColumnDef<ContractWithFinancialProgress>[] = [
    {
      accessorKey: "namaPaket",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-transparent"
        >
          Nama Paket
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.original.namaPaket || "-"}
        </div>
      ),
    },
    {
      accessorKey: "nomorKontrak",
      header: "No. Kontrak",
      cell: ({ row }) => (
        <div className="max-w-[150px] truncate text-sm">
          {row.original.nomorKontrak || "-"}
        </div>
      ),
    },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: ({ row }) => {
        const nilai = parseFloat(row.getValue("nilaiKontrak") || "0");
        return (
          <div className="text-sm">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(nilai)}
          </div>
        );
      },
    },
    {
      accessorKey: "tanggalKontrak",
      header: "Tanggal",
      cell: ({ row }) => {
        const dateValue = row.getValue("tanggalKontrak");
        return (
          <div className="text-sm">
            {dateValue
              ? format(new Date(dateValue as string), "dd/MM/yyyy")
              : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "financialProgress",
      header: "Progress",
      cell: ({ row }) => {
        const financialProgress = row.original.financialProgress;
        if (!financialProgress) {
          return (
            <div className="flex items-center gap-2">
              <Progress value={0} className="h-2 w-[100px]" />
              <span className="text-xs text-muted-foreground">0%</span>
            </div>
          );
        }

        const termin1 = financialProgress.termin1 || 0;
        const termin2 = financialProgress.termin2 || 0;
        const termin3 = financialProgress.termin3 || 0;
        const termin4 = financialProgress.termin4 || 0;
        const uangMuka = financialProgress.uangMuka || 0;

        const totalProgress = Math.min(
          100,
          termin1 + termin2 + termin3 + termin4 + uangMuka
        );

        return (
          <div className="flex items-center gap-3 w-[150px]">
            <Progress value={financialProgress.totalProgress} className="h-2 flex-1" />
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 font-normal"
            >
              {totalProgress}%
            </Badge>
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
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleResetFilter = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
      <div className="p-4 md:p-6 space-y-6 max-w-screen-2xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Progress Keuangan</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Kelola progress keuangan
              </p>
            </div>
    
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Input onChange={handleSearch} placeholder="Cari kontrak..." />
            </div>
          </div>

      <DataTable
        columns={columns}
        data={contractsData?.data || []}
        isLoading={isLoading}
        totalItems={contractsData?.pagination?.total || 0}
        noDataMessage="Tidak ada data kontrak"
        noFilteredDataMessage="Kontrak tidak ditemukan"
        filterActive={searchQuery !== ""}
        onResetFilter={handleResetFilter}
        tableName="kontrak"
      />
    </div>
  );
}

export default FinancialProgressTable;
