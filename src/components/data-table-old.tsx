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
import { Check, ChevronDown, Loader2, CalendarIcon, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Date and Filter components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { id } from "date-fns/locale";

type GenericData = Record<string, any>;

type VisibleColumn<TData extends GenericData> = Column<TData, unknown>;

// Define date filter type
type DateFilterType = "exact" | "week";

interface DateFilter {
  type: DateFilterType;
  date: Date | null;
  displayValue: string;
}

interface DataTableProps<TData extends GenericData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchKey?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  showCheckbox?: boolean;
  showColumnSelection?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrintPDF?: (filteredData: GenericData[]) => void;
  onPrintExcel?: (filteredData: GenericData[]) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  additionalButton?: JSX.Element;
  filterActive?: boolean;
  onResetFilter?: () => void;
  noDataMessage?: string;
  noFilteredDataMessage?: string;
  dateField?: string; // The field name for date filtering
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
  additionalButton,
  isLoading,
  filterActive: externalFilterActive,
  onResetFilter: externalResetFilter,
  noDataMessage = "Tidak ada data tersedia",
  noFilteredDataMessage = "Tidak ada data yang sesuai dengan filter",
  dateField, // Default date field
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const [localFilterActive, setLocalFilterActive] = useState<boolean>(false);

  // Determine if filtering is active from either external or local state
  const filterActive = externalFilterActive || localFilterActive;

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
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, value) => {
      const searchTerm = value.toLowerCase();
      const cellValue = String(row.getValue(columnId)).toLowerCase();
      return cellValue.includes(searchTerm);
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
      globalFilter,
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

  // Apply date filter
  useEffect(() => {
    if (dateFilter) {
      setLocalFilterActive(true);
      
      // Filter logic depends on the filter type (exact date or week)
      if (dateFilter.type === "exact" && dateFilter.date) {
        const filterDate = dateFilter.date.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        setColumnFilters([{
          id: dateField as string,
          value: filterDate
        }]);
      } 
      else if (dateFilter.type === "week" && dateFilter.date) {
        const startDate = startOfWeek(dateFilter.date, { weekStartsOn: 1 });
        const endDate = endOfWeek(dateFilter.date, { weekStartsOn: 1 });
        
        // This assumes the table library can handle range filters
        // You might need to implement custom filtering logic based on your needs
        setColumnFilters([{
          id: dateField as string,
          value: {
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0]
          }
        }]);
      }
    } else {
      setLocalFilterActive(false);
      setColumnFilters([]);
    }
  }, [dateField, dateFilter]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setGlobalFilter(value);

    // Call external onSearch handler if provided
    if (onSearch) {
      onSearch(e);
    }
  };

  // Reset all filters
  const resetAllFilters = () => {
    setDateFilter(null);
    setSearchValue("");
    setGlobalFilter("");
    
    // Call external reset handler if provided
    if (externalResetFilter) {
      externalResetFilter();
    }
  };

  // Apply date filter
  const applyDateFilter = (type: DateFilterType, date: Date) => {
    let displayValue = "";
    
    if (type === "exact") {
      displayValue = `Tanggal: ${format(date, "dd MMMM yyyy", { locale: id })}`;
    } else if (type === "week") {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const end = endOfWeek(date, { weekStartsOn: 1 });
      displayValue = `Minggu: ${format(start, "dd MMM", { locale: id })} - ${format(end, "dd MMM yyyy", { locale: id })}`;
    }
    
    setDateFilter({
      type,
      date,
      displayValue
    });
  };

  // Remove date filter
  const removeDateFilter = () => {
    setDateFilter(null);
  };

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

  // Date Filter Component
  const DateFilterPopover = () => {
    const [selectedType, setSelectedType] = useState<DateFilterType>("exact");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [weekDate, setWeekDate] = useState<Date | undefined>(new Date());
    
    const handleApplyFilter = () => {
      if (selectedType === "exact" && selectedDate) {
        applyDateFilter("exact", selectedDate);
      } else if (selectedType === "week" && weekDate) {
        applyDateFilter("week", weekDate);
      }
    };
    
    const navigateWeek = (direction: 'prev' | 'next') => {
      if (weekDate) {
        const newDate = direction === 'prev' 
          ? subWeeks(weekDate, 1)
          : addWeeks(weekDate, 1);
        setWeekDate(newDate);
      }
    };
    
    const weekRange = weekDate ? {
      start: startOfWeek(weekDate, { weekStartsOn: 1 }),
      end: endOfWeek(weekDate, { weekStartsOn: 1 })
    } : null;

    return (
      <Popover>
        <PopoverTrigger asChild>
          {dateField && (
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Filter Tanggal</span>
          </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Filter Berdasarkan Tanggal</h4>
            
            <div className="space-y-2">
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as DateFilterType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Tanggal Spesifik</SelectItem>
                  <SelectItem value="week">Berdasarkan Minggu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedType === "exact" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih Tanggal</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md p-2"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih Minggu</label>
                <div className="flex justify-between items-center mb-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigateWeek('prev')}
                  >
                    &lt; Minggu Sebelumnya
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigateWeek('next')}
                  >
                    Minggu Berikutnya &gt;
                  </Button>
                </div>
                {weekRange && (
                  <div className="text-center py-2 border rounded-md">
                    <p className="font-medium">
                      {format(weekRange.start, "dd MMM", { locale: id })} - {format(weekRange.end, "dd MMM yyyy", { locale: id })}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleApplyFilter} 
                size="sm"
                disabled={!selectedDate && selectedType === "exact"}
              >
                Terapkan Filter
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center py-4 gap-2">
        {searchKey && (
          <div className="flex-1 max-w-sm">
            <Input
              placeholder={`Search by ${searchKey}...`}
              value={searchValue}
              onChange={handleSearchChange}
              className="h-9"
            />
          </div>
        )}
        <div className="flex gap-2">
          <DateFilterPopover />
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

      {/* Date filter display */}
      {dateFilter && (
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
            <span>{dateFilter.displayValue}</span>
            <button 
              onClick={removeDateFilter}
              className="ml-1 hover:bg-muted rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetAllFilters}
            className="h-6 px-2 text-xs"
          >
            Reset semua
          </Button>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Memuat data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getFilteredRowModel().rows.length > 0 ? (
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {filterActive ? (
                    <div className="flex flex-col items-center gap-2">
                      <span>{noFilteredDataMessage}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetAllFilters}
                      >
                        Reset filter
                      </Button>
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
      </div>
    </div>
  );
}