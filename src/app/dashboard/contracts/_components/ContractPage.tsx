"use client";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { deleteContract, getContracts } from "../../../../actions/contract";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
  LuEye,
  LuPen,
  LuPlus,
  LuTrash2,
  LuArrowDown,
  LuArrowUp,
  LuFilter,
} from "react-icons/lu";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type ContractData = {
  id: string;
  namaPaket: string;
  nomorKontrak: string;
  nilaiKontrak: number;
  tanggalKontrak: Date;
  status?: string;
};

export function ContractsPage() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const [data, setData] = useState<ContractData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContracts() {
      setIsLoading(true);
      try {
        const result = await getContracts();
        if (result.success && result.data) {
          setData(
            result.data.map((contract) => ({
              ...contract,
              nilaiKontrak: Number(contract.nilaiKontrak),
              tanggalKontrak: new Date(contract.tanggalKontrak),
              status: calculateContractStatus(
                new Date(contract.tanggalKontrak)
              ),
            }))
          );
        } else {
          setError(result.error || "Failed to fetch contracts");
        }
      } catch (err) {
        setError("An error occurred while fetching contracts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContracts();
  }, []);

  const calculateContractStatus = (contractDate: Date): string => {
    const now = new Date();
    const diffMonths =
      (now.getFullYear() - contractDate.getFullYear()) * 12 +
      (now.getMonth() - contractDate.getMonth());

    if (diffMonths <= 6) return "Baru";
    if (diffMonths <= 12) return "Sedang Berjalan";
    return "Lama";
  };

  const columns: ColumnDef<ContractData>[] = [
    {
      accessorKey: "namaPaket",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Paket
          {column.getIsSorted() === "asc" ? (
            <LuArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <LuArrowDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nomorKontrak",
      header: "Nomor Kontrak",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nilaiKontrak",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nilai Kontrak
          {column.getIsSorted() === "asc" ? (
            <LuArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <LuArrowDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: (info) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(info.getValue() as number),
    },
    {
      accessorKey: "tanggalKontrak",
      header: "Tanggal Kontrak",
      cell: (info) => (info.getValue() as Date).toLocaleDateString("id-ID"),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Status <LuFilter className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
              Semua Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("Baru")}>
              Baru
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.setFilterValue("Sedang Berjalan")}
            >
              Sedang Berjalan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("Lama")}>
              Lama
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: (info) => {
        const status = info.getValue() as string;
        const statusColor = {
          Baru: "bg-green-100 text-green-800",
          "Sedang Berjalan": "bg-yellow-100 text-yellow-800",
          Lama: "bg-red-100 text-red-800",
        }[status];

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(row.original.id)}
          >
            <LuPen className="text-blue-500" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
          >
            <LuTrash2 className="text-red-500" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDetail(row.original.id)}
          >
            <LuEye className="text-green-500" size={18} />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = () => router.push("/dashboard/contracts/create");
  const handleEdit = (id: string) =>
    router.push(`/dashboard/contracts/${id}/edit`);
  const handleDetail = (id: string) =>
    router.push(`/dashboard/contracts/${id}/detail`);

  const handleDelete = (id: string) => {
    openModal(
      "Hapus Kontrak",
      "Apakah Anda yakin ingin menghapus kontrak ini?",
      async () => {
        const result = await deleteContract(id);
        if (result.success) {
          setData((prev) => prev.filter((contract) => contract.id !== id));
          toast.success("Kontrak berhasil dihapus");
        } else {
          toast.error("Gagal menghapus kontrak");
        }
      }
    );
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <div className="p-6">Memuat data kontrak...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Kontrak</h1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <LuPlus size={18} />
          Tambah Kontrak
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari kontrak..."
          className="flex-grow"
        />
        <Select
          value={`${pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Baris" />
          </SelectTrigger>
          <SelectContent>
            {[2,10, 20, 30, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize} Baris
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    Tidak ada data kontrak
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2 items-center">
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <LuChevronsLeft size={20} />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <LuChevronLeft size={20} />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <LuChevronRight size={20} />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <LuChevronsRight size={20} />
          </Button>
          <span>
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
}
