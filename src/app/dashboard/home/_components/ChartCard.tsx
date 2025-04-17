"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function ChartCard({ title, icon, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {children}
      </CardContent>
    </Card>
  );
}