import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function DashboardError() {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold">Gagal memuat data dashboard</h2>
        <p className="text-muted-foreground">Silakan coba beberapa saat lagi</p>
        <Button onClick={() => window.location.reload()}>Muat Ulang</Button>
      </div>
    );
  }