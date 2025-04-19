"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface TablePaginationProps {
  totalPages?: number;
  totalItems?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
}

export default function Pagination({
  totalPages = 1,
  totalItems = 0,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: TablePaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const pageSizeParam = parseInt(
    searchParams.get("pageSize") || String(defaultPageSize)
  );

  const [pagination, setPagination] = useState({
    page: pageParam,
    pageSize: pageSizeParam,
  });

  const startItem = (pagination.page - 1) * pagination.pageSize + 1;
  const endItem = Math.min(pagination.page * pagination.pageSize, totalItems);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pagination.page));
    params.set("pageSize", String(pagination.pageSize));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pagination, router, searchParams, pathname]);

  useEffect(() => {
    setPagination({
      page: pageParam,
      pageSize: pageSizeParam,
    });
  }, [pageParam, pageSizeParam]);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const changePageSize = (newSize: string) => {
    const size = parseInt(newSize);

    const maxPage = Math.ceil(totalItems / size);
    const newPage = pagination.page > maxPage ? maxPage || 1 : pagination.page;
    setPagination({ page: newPage, pageSize: size });
  };

  return (
    <div className="flex flex-col gap-4 mt-4 sm:mt-6">
      {/* Item count and info - Always visible */}
      <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing {totalItems > 0 ? `${startItem}-${endItem} of ` : ""}
        {totalItems} items
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Page navigation buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start order-2 sm:order-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(1)}
            disabled={pagination.page <= 1}
            className="hidden sm:flex"
          >
            First
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1 px-2">
            <span className="text-sm whitespace-nowrap">
              Page {pagination.page} of {totalPages || 1}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
          >
            Next
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(totalPages)}
            disabled={pagination.page >= totalPages}
            className="hidden sm:flex"
          >
            Last
          </Button>
        </div>

        {/* Items per page selector */}
        <div className="w-full sm:w-auto order-1 sm:order-2">
          <Select
            value={String(pagination.pageSize)}
            onValueChange={changePageSize}
          >
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
