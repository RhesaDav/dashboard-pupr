"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function StatsCard({ title, value, icon, footer, className }: StatsCardProps) {
  // Determine if the value needs truncation
  const valueStr = String(value);
  const needsTruncation = valueStr.length > 10; // Adjust threshold as needed

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium truncate">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {needsTruncation ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-2xl font-bold truncate" title={valueStr}>
                {valueStr}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[300px] break-words">{valueStr}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="text-2xl font-bold">{valueStr}</div>
        )}
        {footer && <div className="mt-2">{footer}</div>}
      </CardContent>
    </Card>
  );
}