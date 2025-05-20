"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  BarChart3,
  DollarSign,
  MapPin,
  FileText,
  AlertTriangle,
  Camera,
  Percent,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { getContractById } from "@/actions/contract";
import {
  Addendum,
  Contract,
  FinancialProgress,
  PhysicalProgress,
  Location,
} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ExtendedContract extends Contract {
  addendum?: Addendum[];
  location?: Location | null;
  physicalProgress?: PhysicalProgress[];
  financialProgress?: FinancialProgress | null;
}

export default function ContractDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("general");

  const params = useParams();
  const contractId = params.id as string;
  const { data, isLoading, error } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => getContractById(contractId),
  });
  const contract = data?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message}. Silakan coba lagi nanti.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Tidak tersedia";
    return format(new Date(date), "dd MMMM yyyy");
  };

  const formatMoney = (amount?: number | null) => {
    if (!amount) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const latestProgress =
    contract?.physicalProgress && contract?.physicalProgress?.length > 0
      ? contract?.physicalProgress[contract.physicalProgress.length - 1]
      : null;

  const maxRealisasiEntry = contract?.physicalProgress.reduce(
    (prev, current) => {
      return prev.realisasi > current.realisasi ? prev : current;
    }
  );
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detail Kontrak</h1>
          <p className="text-gray-500">
            {contract?.namaPaket || "Kontrak tidak tersedia"}
          </p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Kembali
        </Button>
      </div>

      <Tabs
        defaultValue="general"
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="general">Informasi Umum</TabsTrigger>
          <TabsTrigger value="progress">Progres</TabsTrigger>
          <TabsTrigger value="location-docs">Lokasi & Dokumentasi</TabsTrigger>
        </TabsList>

        {/* General Information Tab */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contract Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informasi Kontrak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nama Paket
                  </h3>
                  <p>{contract?.namaPaket || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nama Penyedia
                  </h3>
                  <p>{contract?.namaPenyedia || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nomor Kontrak
                  </h3>
                  <p>{contract?.nomorKontrak || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Tanggal Kontrak
                  </h3>
                  <p>
                    {contract?.tanggalKontrak
                      ? formatDate(contract.tanggalKontrak)
                      : "Tidak tersedia"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Masa Pelaksanaan
                  </h3>
                  <p>
                    {contract?.masaPelaksanaan
                      ? `${contract.masaPelaksanaan} hari`
                      : "Tidak tersedia"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Sub Kegiatan
                  </h3>
                  <p>{contract?.subKegiatan || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Volume & Satuan
                  </h3>
                  <p>{`${contract?.volumeKontrak || "-"} ${
                    contract?.satuanKontrak || ""
                  }`}</p>
                </div>
              </CardContent>
            </Card>

            {/* Officials Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pejabat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">PPK</h3>
                  <p>{contract?.ppk || "Tidak tersedia"}</p>
                  <p className="text-xs text-gray-500">
                    {contract?.nipPPK ? `NIP: ${contract.nipPPK}` : ""}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Koordinator Washlap
                  </h3>
                  <p>{contract?.korwaslap || "Tidak tersedia"}</p>
                  <p className="text-xs text-gray-500">
                    {contract?.nipKorwaslap
                      ? `NIP: ${contract.nipKorwaslap}`
                      : ""}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Pengawas Lapangan
                  </h3>
                  <p>{contract?.pengawasLapangan || "Tidak tersedia"}</p>
                  <p className="text-xs text-gray-500">
                    {contract?.nipPengawasLapangan
                      ? `NIP: ${contract.nipPengawasLapangan}`
                      : ""}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Informasi Keuangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Pagu Anggaran
                  </h3>
                  <p>{contract?.paguAnggaran || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nilai Kontrak
                  </h3>
                  <p>{formatMoney(contract?.nilaiKontrak)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Sumber Dana
                  </h3>
                  <p>{contract?.sumberDana || "Tidak tersedia"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Supervision Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Konsultan Supervisi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nama Konsultan
                  </h3>
                  <p>{contract?.konsultanSupervisi || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nomor Kontrak
                  </h3>
                  <p>{contract?.nomorKontrakSupervisi || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Nilai Kontrak
                  </h3>
                  <p>{formatMoney(contract?.nilaiKontrakSupervisi)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Tanggal Kontrak
                  </h3>
                  <p>
                    {contract?.tanggalKontrakSupervisi
                      ? formatDate(contract.tanggalKontrakSupervisi)
                      : "Tidak tersedia"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Masa Pelaksanaan
                  </h3>
                  <p>
                    {contract?.masaPelaksanaanSupervisi
                      ? `${contract.masaPelaksanaanSupervisi} hari`
                      : "Tidak tersedia"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Project Status Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Status Proyek</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <h3 className="font-medium text-sm text-gray-500">Pemberian Kesempatan</h3>
                    <Badge variant={contract?.pemberianKesempatan ? "default" : "outline"}>
                      {contract?.pemberianKesempatan ? "Ya" : "Tidak"}
                    </Badge>
                  </div> */}
                  {/* <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Kendala
                    </h3>
                    <Badge
                      variant={contract?.kendala ? "destructive" : "outline"}
                    >
                      {contract?.kendala ? "Ada" : "Tidak Ada"}
                    </Badge>
                  </div> */}
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Hasil Produk Akhir
                    </h3>
                    <p>{contract?.hasilProdukAkhir || "Belum ada"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Dimensi
                    </h3>
                    <p>{contract?.dimensi || "Tidak tersedia"}</p>
                  </div>
                  {/* <div className="md:col-span-2">
                    <h3 className="font-medium text-sm text-gray-500">
                      Permasalahan
                    </h3>
                    <p>{contract?.permasalahan || "Tidak ada permasalahan"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-sm text-gray-500">
                      Keterangan
                    </h3>
                    <p>{contract?.keterangan || "Tidak ada keterangan"}</p>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Addendum Information Card */}
            {contract?.hasAddendum && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Addendum</CardTitle>
                </CardHeader>
                <CardContent>
                  {contract?.addendum && contract?.addendum?.length > 0 ? (
                    <div className="space-y-4">
                      {contract.addendum.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md">
                          <h3 className="font-medium">
                            Addendum {index + 1}: {item.name}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div>
                              <span className="text-sm text-gray-500">
                                Tipe:
                              </span>{" "}
                              {item.tipe || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">
                                Hari:
                              </span>{" "}
                              {item.hari || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">
                                Volume:
                              </span>{" "}
                              {item.volume || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">
                                Satuan:
                              </span>{" "}
                              {item.satuan || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">
                                Pemberian Kesempatan:
                              </span>{" "}
                              {item.pemberianKesempatan ? "Ya" : "Tidak"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Tidak ada data addendum</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Physical Progress Card */}
            <Card className="flex-1 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      Progress Fisik
                    </CardTitle>
                    <CardDescription>
                      Kemajuan pembangunan fisik proyek
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Progress Keseluruhan
                      </span>
                      <span className="text-sm font-medium">
                        {maxRealisasiEntry?.realisasi}%
                      </span>
                    </div>
                    <Progress
                      value={maxRealisasiEntry?.realisasi}
                      className="h-2"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-500 mb-1">Rencana</p>
                      <p className="text-xl font-semibold">
                        {maxRealisasiEntry?.rencana}%
                      </p>
                    </div>

                    <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-500 mb-1">Realisasi</p>
                      <p className="text-xl font-semibold">
                        {maxRealisasiEntry?.realisasi}%
                      </p>
                    </div>

                    <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-500 mb-1">Deviasi</p>
                      <div className="flex items-center justify-center">
                        {(maxRealisasiEntry?.deviasi || 0) < 0 ? (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        )}
                        <span
                          className={`text-xl font-semibold ${
                            (maxRealisasiEntry?.deviasi || 0) < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {Math.abs(maxRealisasiEntry?.deviasi || 0).toFixed(2)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Progress Keuangan
                    </CardTitle>
                    <CardDescription>
                      Status keuangan proyek saat ini
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-500 mb-1">Nilai Kontrak</p>
                    <p className="text-xl font-semibold">
                      {formatMoney(contract?.nilaiKontrak)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-500 mb-1">
                        Progress Keuangan
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="text-xl font-semibold">
                          {contract?.financialProgress?.totalProgress}
                        </span>
                        <Percent className="h-5 w-5 text-blue-500 mr-1" />
                      </div>
                    </div>

                    <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-500 mb-1">
                        Keuangan Terbayar
                      </p>
                      <p className="text-xl font-semibold">
                        {formatMoney(contract?.financialProgress?.totalPayment)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Location & Documentation Tab */}
        <TabsContent value="location-docs">
          <div className="space-y-6">
            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lokasi Proyek
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contract?.location ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-gray-500">
                          Kota/Kabupaten
                        </h3>
                        <p>{contract.location.kota || "Tidak tersedia"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-500">
                          Distrik
                        </h3>
                        <p>{contract.location.distrik || "Tidak tersedia"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-500">
                          Kampung
                        </h3>
                        <p>{contract.location.kampung || "Tidak tersedia"}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-gray-500">
                          Koordinat Awal
                        </h3>
                        <p className="font-mono">
                          {contract.location.koordinatAwal || "Tidak tersedia"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-500">
                          Koordinat Akhir
                        </h3>
                        <p className="font-mono">
                          {contract.location.koordinatAkhir || "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="md:col-span-2 bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center">
                      <p className="text-gray-500">
                        Peta akan ditampilkan di sini
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>Belum ada data lokasi</p>
                )}
              </CardContent>
            </Card>
            {/* Documentation Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Dokumentasi Proyek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["awal", "tengah", "akhir"].map((type) => {
                    const docKey =
                      `dokumentasi${type.charAt(0).toUpperCase() + type.slice(1)}` as
                        | "dokumentasiAwal"
                        | "dokumentasiTengah"
                        | "dokumentasiAkhir";
                    const imageUrl = contract?.[docKey];

                    return (
                      <div key={type} className="space-y-2">
                        <h3 className="font-medium mb-2 capitalize">
                          Dokumentasi {type}
                        </h3>
                        <div className="relative aspect-video rounded-md overflow-hidden border bg-gray-100">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={`Dokumentasi ${type}`}
                              fill
                              className="object-cover"
                              unoptimized
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-sm text-gray-500 text-center p-4">
                                Belum ada dokumentasi {type}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>{" "}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
