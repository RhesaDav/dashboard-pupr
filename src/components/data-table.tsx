"use client";
import React, { useState, useEffect, JSX } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  RowSelectionState,
  VisibilityState,
  Column,
  Table as ReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type GenericData = Record<string, any>;

type VisibleColumn<TData extends GenericData> = Column<TData, unknown>;

interface DataTableProps<TData extends GenericData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  showCheckbox?: boolean;
  showColumnSelection?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrintPDF?: (filteredData: GenericData[]) => void;
  onPrintExcel?: (filteredData: GenericData[]) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  additionalButton?: JSX.Element
}

export function DataTable<TData extends GenericData, TValue>({
  columns,
  data,
  searchKey,
  pageSizeOptions = [5, 10, 20, 50],
  defaultPageSize = 10,
  onSearch,
  onPrintExcel,
  onPrintPDF,
  onRowSelectionChange,
  showCheckbox,
  showColumnSelection,
  additionalButton
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const showSelectionColumn =
    showCheckbox || !!onPrintExcel || !!onPrintPDF || !!onRowSelectionChange;

  const selectionColumn: ColumnDef<TData, any> | null = showSelectionColumn
    ? {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="mx-auto flex"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="mx-auto flex"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }
    : null;

  const allColumns = selectionColumn ? [selectionColumn, ...columns] : columns;

  const table = useReactTable({
    data,
    columns: allColumns,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: showSelectionColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
        pageIndex: 0,
      },
    },
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const getSelectedRowsData = (): TData[] => {
    return table.getFilteredSelectedRowModel().rows.map((row) => row.original);
  };

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedData = getSelectedRowsData();
      onRowSelectionChange(selectedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, onRowSelectionChange]);

  const transformDataForExport = (
    visibleColumns: VisibleColumn<TData>[],
    selectedRows: TData[]
  ): GenericData[] => {
    return selectedRows.map((row) => {
      const transformedRow: GenericData = {};
      console.log(visibleColumns);
      visibleColumns.forEach((column) => {
        const columnId = column.id as keyof TData;
        if (columnId in row) {
          transformedRow[columnId as string] = row[columnId];
        }
      });
      return transformedRow;
    });
  };

  const handlePdfExport = () => {
    if (onPrintPDF) {
      const selectedData = getSelectedRowsData();
      if (selectedData.length === 0) {
        toast.error("Pilih setidaknya satu baris untuk diekspor.");
        return;
      }
      const visibleColumns = table
        .getVisibleLeafColumns()
        .filter((col) => col.id !== "select") as VisibleColumn<TData>[];

      const transformedData = transformDataForExport(
        visibleColumns,
        selectedData
      );

      onPrintPDF(transformedData);
    }
  };

  const handleExcelExport = () => {
    if (onPrintExcel) {
      const selectedData = getSelectedRowsData();
      if (selectedData.length === 0) {
        toast.error("Pilih setidaknya satu baris untuk diekspor.");
        return;
      }
      const visibleColumns = table
        .getVisibleLeafColumns()
        .filter((col) => col.id !== "select") as VisibleColumn<TData>[];

      const transformedData = transformDataForExport(
        visibleColumns,
        selectedData
      );

      onPrintExcel(transformedData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center py-4 gap-2">
        {searchKey && (
          <Input
            placeholder={`Search by ${searchKey}...`}
            onChange={onSearch}
            className="max-w-sm h-9"
          />
        )}

        <div className="flex gap-2">
          {additionalButton}
          {onPrintPDF && (
            <Button variant="outline" size="sm" onClick={handlePdfExport}>
              PDF
            </Button>
          )}
          {onPrintExcel && (
            <Button variant="outline" size="sm" onClick={handleExcelExport}>
              Excel
            </Button>
          )}
        </div>

        <div className="flex-grow"></div>

        {showSelectionColumn && (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}

        {showColumnSelection && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <span>Columns</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white p-1 rounded-md shadow-lg border min-w-[150px]"
              style={{ zIndex: 10 }}
            >
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide() && column.id !== "select"
                )
                .map((column) => {
                  const isVisible = column.getIsVisible();
                  const headerText =
                    typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id.replace(/([A-Z])/g, " $1").trim();

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="text-sm capitalize flex items-center px-2 py-1.5 rounded hover:bg-accent cursor-pointer data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      checked={isVisible}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      <span
                        className={`mr-2 h-4 w-4 flex items-center justify-center ${
                          isVisible ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span>{headerText}</span>
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
