"use client"

import React, { useState, useEffect } from 'react';
import { 
  ColumnDef, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable 
} from "@tanstack/react-table";
import { deleteContract, getContracts } from "./actions/contract";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight, LuEye, LuPen, LuPlus, LuTrash2 } from 'react-icons/lu';
import { useModalStore } from '@/store/useModalStore';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type ContractData = {
  id: string;
  namaPaket: string;
  nomorKontrak: string;
  nilaiKontrak: number;
  tanggalKontrak: Date;
};

export function ContractsPage() {
  const router = useRouter()
  const { openModal } = useModalStore();

  const [data, setData] = useState<ContractData[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
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
          const formattedData = result.data.map(contract => ({
            ...contract,
            nilaiKontrak: Number(contract.nilaiKontrak),
            tanggalKontrak: new Date(contract.tanggalKontrak)
          }));
          setData(formattedData);
        } else {
          setError(result.error || 'Failed to fetch contracts');
        }
      } catch (err) {
        setError('An error occurred while fetching contracts');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContracts();
  }, []);

  const columns: ColumnDef<ContractData>[] = [
    {
      accessorKey: "namaPaket",
      header: "Nama Paket",
      cell: info => info.getValue()
    },
    {
      accessorKey: "nomorKontrak",
      header: "Nomor Kontrak",
      cell: info => info.getValue()
    },
    {
      accessorKey: "nilaiKontrak",
      header: "Nilai Kontrak",
      cell: info => {
        const value = info.getValue() as number;
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      }
    },
    {
      accessorKey: "tanggalKontrak",
      header: "Tanggal Kontrak",
      cell: info => {
        const date = info.getValue() as Date;
        return date.toLocaleDateString('id-ID');
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-center">
          <button 
            onClick={() => handleEdit(row.original.id)} 
            className="text-blue-500 hover:bg-blue-100 p-1 rounded cursor-pointer"
            title="Edit"
          >
            <LuPen size={20} />
          </button>
          <button 
            onClick={() => handleDelete(row.original.id)} 
            className="text-red-500 hover:bg-red-100 p-1 rounded cursor-pointer"
            title="Delete"
          >
            <LuTrash2 size={20} />
          </button>
          <button 
            onClick={() => handleDetail(row.original.id)} 
            className="text-green-500 hover:bg-green-100 p-1 rounded cursor-pointer"
            title="Detail"
          >
            <LuEye size={20} />
          </button>
        </div>
      )
    }
  ];

  const handleCreate = () => {
    router.push("/dashboard/contracts/create")
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/contracts/${id}/edit`)
  };

  const handleDelete = (id: string) => {
    openModal(
      'Delete Contract',
      'Are you sure you want to delete this contract? This action cannot be undone.',
      async () => {
        const result = await deleteContract(id)
        if (result.success) {
          setData(prevData => prevData.filter(contract => contract.id !== id));
          toast.success("Contract deleted successfully");
        } else {
          toast.error("Failed to delete contract");
        }
      }
    );
  };

  const handleDetail = (id: string) => {
    router.push(`/dashboard/contracts/${id}/detail`);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <div className="p-6">Loading contracts...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Kontrak</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <LuPlus size={18} />
          <span>Tambah Kontrak</span>
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search contracts..."
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="p-3 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm"
                  >
                    {flexRender(
                      header.column.columnDef.header, 
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-6 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl mb-2">No Contracts Available</p>
                    <p className="text-sm text-gray-400">
                      Click &quot;Tambah Kontrak&quot; to add your first contract
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id} 
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      className="p-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell, 
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-2 disabled:opacity-50"
            >
              <LuChevronsLeft size={20} />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 disabled:opacity-50"
            >
              <LuChevronLeft size={20} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 disabled:opacity-50"
            >
              <LuChevronRight size={20} />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-2 disabled:opacity-50"
            >
              <LuChevronsRight size={20} />
            </button>
            <span className="ml-2">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          </div>
          <div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-2 border rounded"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}