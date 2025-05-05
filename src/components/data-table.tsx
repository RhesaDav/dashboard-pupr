"use client";

import React, { useState, useEffect } from "react";
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
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  totalItems: number;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  noDataMessage?: string;
  noFilteredDataMessage?: string;
  filterActive?: boolean;
  onResetFilter?: () => void;
  tableName?: string;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  totalItems,
  onRowSelectionChange,
  noDataMessage = "Tidak ada data tersedia",
  noFilteredDataMessage = "Tidak ada data yang sesuai dengan filter",
  filterActive = false,
  onResetFilter,
  tableName = "item",
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const sizeParam = searchParams.get("pageSize");

    const initialPage = pageParam ? Math.max(1, parseInt(pageParam)) : 1;
    const initialSize = sizeParam ? parseInt(sizeParam) : 10;

    setPageIndex(initialPage);
    setPageSize(initialSize);
  }, []);

  const pageCount = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageIndex.toString());
    params.set("pageSize", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pageIndex, pageSize, pathname, router, searchParams]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, pageIndex - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > pageCount) {
        endPage = pageCount;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push(-1);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < pageCount) {
        if (endPage < pageCount - 1) {
          pages.push(-1);
        }
        pages.push(pageCount);
      }
    }

    return pages;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination: {
        pageIndex: pageIndex - 1,
        pageSize,
      },
      columnFilters,
    },
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      onRowSelectionChange?.(newSelection);
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: pageIndex - 1, pageSize })
          : updater;

      const newPageIndex = Math.min(
        Math.max(newPagination.pageIndex + 1, 1),
        pageCount
      );
      const newPageSize = newPagination.pageSize;

      setPageIndex(newPageIndex);
      setPageSize(newPageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount,
    manualPagination: true,
  });

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3">
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Memuat data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {filterActive ? (
                    <div className="flex flex-col items-center gap-2">
                      <span>{noFilteredDataMessage}</span>
                      {onResetFilter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onResetFilter}
                        >
                          Reset filter
                        </Button>
                      )}
                    </div>
                  ) : (
                    noDataMessage
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {!isLoading && totalItems > 0 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Items per page</p>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageIndex(1);
                }}
                className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-muted-foreground">
              Menampilkan {(pageIndex - 1) * pageSize + 1} hingga{" "}
              {Math.min(pageIndex * pageSize, totalItems)} dari {totalItems}{" "}
              {tableName}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === -1 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled
                  >
                    ...
                  </Button>
                ) : (
                  <Button
                    variant={pageIndex === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPageIndex(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
