"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TablePaginationProps {
  totalPages?: number;
}

export default function Pagination({ totalPages = 1 }: TablePaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const setQueryParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setQueryParams("page", currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setQueryParams("page", currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className="w-full sm:w-auto">
        <Select 
          value={String(pageSize)} 
          onValueChange={(value) => setQueryParams("pageSize", value)}
        >
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}