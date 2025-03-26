"use client";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { deleteContract, getContracts } from "./actions/contract";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
  LuEye,
  LuPen,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import { useModalStore } from "@/store/useModalStore";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

type ContractData = {
  id: string;
  namaPaket: string;
  nomorKontrak: string;
  nilaiKontrak: number;
  tanggalKontrak: Date;
};

export function ContractsPage() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const [data, setData] = useState<ContractData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
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

  const columns: ColumnDef<ContractData>[] = [
    { accessorKey: "namaPaket", header: "Nama Paket", cell: (info) => info.getValue() },
    { accessorKey: "nomorKontrak", header: "Nomor Kontrak", cell: (info) => info.getValue() },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: (info) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(info.getValue() as number),
    },
    {
      accessorKey: "tanggalKontrak",
      header: "Tanggal Kontrak",
      cell: (info) => (info.getValue() as Date).toLocaleDateString("id-ID"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original.id)}>
            <LuPen className="text-blue-500" size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
            <LuTrash2 className="text-red-500" size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDetail(row.original.id)}>
            <LuEye className="text-green-500" size={18} />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = () => router.push("/dashboard/contracts/create");
  const handleEdit = (id: string) => router.push(`/dashboard/contracts/${id}/edit`);
  const handleDetail = (id: string) => router.push(`/dashboard/contracts/${id}/detail`);
  
  const handleDelete = (id: string) => {
    openModal("Hapus Kontrak", "Apakah Anda yakin ingin menghapus kontrak ini?", async () => {
      const result = await deleteContract(id);
      if (result.success) {
        setData((prev) => prev.filter((contract) => contract.id !== id));
        toast.success("Kontrak berhasil dihapus");
      } else {
        toast.error("Gagal menghapus kontrak");
      }
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

      <Input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Cari kontrak..."
        className="mb-4"
      />

      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
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
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <LuChevronsLeft size={20} />
          </Button>
          <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <LuChevronLeft size={20} />
          </Button>
          <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <LuChevronRight size={20} />
          </Button>
          <Button variant="outline" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <LuChevronsRight size={20} />
          </Button>
          <span>
            Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
}
