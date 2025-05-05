// DataTableFilter.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  value: string;
  label: string;
}

interface DataTableFilterProps {
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
  buttonLabel?: string;
}

export function DataTableFilter({
  options,
  selectedValues,
  onChange,
  label = "Filter",
  buttonLabel = "Filter",
}: DataTableFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          {buttonLabel}
          {selectedValues.length > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {selectedValues.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={(checked) => {
              const newValues = checked
                ? [...selectedValues, option.value]
                : selectedValues.filter((v) => v !== option.value);
              onChange(newValues);
            }}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}