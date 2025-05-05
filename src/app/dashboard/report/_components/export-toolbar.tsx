"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface ExportToolbarProps {
  onExport: () => void;
  isExporting: boolean;
  disabled: boolean;
  selectedCount: number;
  totalCount: number;
  children?: React.ReactNode;
}

export function ExportToolbar({
  onExport,
  isExporting,
  disabled,
  selectedCount,
  totalCount,
  children,
}: ExportToolbarProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-sm">
          {selectedCount > 0 ? (
            <span className="font-medium">
              {selectedCount} item terpilih
            </span>
          ) : (
            <span className="text-muted-foreground">
              {totalCount} item tersedia
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          {children}

          <Button
            size="sm"
            disabled={disabled || isExporting}
            onClick={onExport}
            className="gap-2"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}