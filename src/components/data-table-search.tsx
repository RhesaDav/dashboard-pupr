// DataTableSearch.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
  className = "w-full md:w-[250px]",
}: DataTableSearchProps) {
  return (
    <Input
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}