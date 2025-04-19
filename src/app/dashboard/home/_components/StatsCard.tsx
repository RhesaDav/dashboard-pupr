"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  footer?: ReactNode;
}

export function StatsCard({ title, value, icon, footer }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold truncate hover:text-clip hover:overflow-visible" title={value.toString()}>
          {value}
        </div>
        {footer}
      </CardContent>
    </Card>
  );
}