"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Selamat Datang di Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Paket</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">120</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nilai Kontrak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">Rp 5.000.000.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nilai Anggaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">Rp 10.000.000.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Fisik</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">75%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Keuangan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">60%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
