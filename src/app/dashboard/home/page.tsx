import { getCurrentUser } from "@/actions/auth";
import { getDashboardReport } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

export default async function HomePage() {
  const data = await getDashboardReport();

  if (!data.report) return <div>Data not found</div>;
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Selamat Datang di Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Paket</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{data.report.jumlahPaket}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nilai Kontrak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {formatRupiah(data.report.nilaiKontrak)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nilai Anggaran</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {formatRupiah(data.report.nilaiAnggaran)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Fisik</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{data.report.progressFisik}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Keuangan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{data.report.progressKeuangan}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
