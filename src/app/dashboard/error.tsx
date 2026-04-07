"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Runtime Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-6">
      <div className="bg-destructive/10 p-4 rounded-full">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Terjadi Kesalahan Server</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Maaf, terjadi kendala saat memuat halaman ini. Hal ini mungkin disebabkan oleh gangguan koneksi database atau sesi login yang berakhir.
        </p>
        <div className="mt-4 p-3 bg-muted rounded-md text-xs font-mono break-all text-left max-w-lg mx-auto overflow-auto max-h-32">
          <p className="font-semibold mb-1 text-destructive">Error Trace ID:</p>
          {error.digest || "N/A"}
          <p className="font-semibold mt-2 mb-1 text-destructive">Message:</p>
          {error.message}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => reset()} variant="default" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Coba Lagi
        </Button>
        <Button variant="outline" asChild className="flex items-center gap-2">
          <Link href="/dashboard/home">
            <Home className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground pt-4 border-t w-full max-w-md">
        Jika masalah berlanjut, silakan hubungi administrator sistem atau coba bersihkan cache browser Anda.
      </p>
    </div>
  );
}
