"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { User } from "@prisma/client";
import { Clock, FileCheck } from "lucide-react";

interface DashboardHeaderProps {
  greeting: string;
  currentTime: string;
  user: User | null;
}

export function DashboardHeader({ greeting, currentTime, user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Selamat {greeting}, {user?.name || user?.email || ""}</h1>
        <p className="text-muted-foreground flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          {currentTime}
        </p>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <FileCheck className="h-4 w-4" />
        Generate Report
      </Button>
    </div>
  );
}