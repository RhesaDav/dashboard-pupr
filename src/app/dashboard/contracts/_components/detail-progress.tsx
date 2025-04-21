"use client"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, BarChart3, DollarSign, MapPin, FileText, AlertTriangle, Camera } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { getContractById } from "@/actions/contract";
import { Addendum, Contract, FinancialProgress, PhysicalProgress, Location } from "@prisma/client";

interface ExtendedContract extends Contract {
  addendum?: Addendum[];
  location?: Location | null;
  physicalProgress?: PhysicalProgress[];
  financialProgress?: FinancialProgress | null;
}

export default function ContractDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [contract, setContract] = useState<ExtendedContract | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadContractData = async () => {
      try {
        setIsLoading(true);
        const data = await getContractById(String(id));
        if (data.data?.contract) {
            setContract(data.data.contract);
        }
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message || "Failed to load contract details");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContractData();
  }, [id]);

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
            {error}. Silakan coba lagi nanti.
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
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const latestProgress = contract?.physicalProgress && contract?.physicalProgress?.length > 0 
    ? contract?.physicalProgress[contract.physicalProgress.length - 1] 
    : null;

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

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="general">Informasi Umum</TabsTrigger>
          <TabsTrigger value="progress">Progres</TabsTrigger>
          <TabsTrigger value="financial">Keuangan</TabsTrigger>
          <TabsTrigger value="location">Lokasi</TabsTrigger>
          <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
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
                  <h3 className="font-medium text-sm text-gray-500">Nama Paket</h3>
                  <p>{contract?.namaPaket || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Nama Penyedia</h3>
                  <p>{contract?.namaPenyedia || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Nomor Kontrak</h3>
                  <p>{contract?.nomorKontrak || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Tanggal Kontrak</h3>
                  <p>{contract?.tanggalKontrak ? formatDate(contract.tanggalKontrak) : "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Masa Pelaksanaan</h3>
                  <p>{contract?.masaPelaksanaan ? `${contract.masaPelaksanaan} hari` : "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Sub Kegiatan</h3>
                  <p>{contract?.subKegiatan || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Volume & Satuan</h3>
                  <p>{`${contract?.volumeKontrak || "-"} ${contract?.satuanKontrak || ""}`}</p>
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
                  <p className="text-xs text-gray-500">{contract?.nipPPK ? `NIP: ${contract.nipPPK}` : ""}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Koordinator Washlap</h3>
                  <p>{contract?.korwaslap || "Tidak tersedia"}</p>
                  <p className="text-xs text-gray-500">{contract?.nipKorwaslap ? `NIP: ${contract.nipKorwaslap}` : ""}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Pengawas Lapangan</h3>
                  <p>{contract?.pengawasLapangan || "Tidak tersedia"}</p>
                  <p className="text-xs text-gray-500">{contract?.nipPengawasLapangan ? `NIP: ${contract.nipPengawasLapangan}` : ""}</p>
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
                  <h3 className="font-medium text-sm text-gray-500">Pagu Anggaran</h3>
                  <p>{contract?.paguAnggaran || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Nilai Kontrak</h3>
                  <p>{formatMoney(contract?.nilaiKontrak)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Sumber Dana</h3>
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
                  <h3 className="font-medium text-sm text-gray-500">Nama Konsultan</h3>
                  <p>{contract?.konsultanSupervisi || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Nomor Kontrak</h3>
                  <p>{contract?.nomorKontrakSupervisi || "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Nilai Kontrak</h3>
                  <p>{formatMoney(contract?.nilaiKontrakSupervisi)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Tanggal Kontrak</h3>
                  <p>{contract?.tanggalKontrakSupervisi ? formatDate(contract.tanggalKontrakSupervisi) : "Tidak tersedia"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Masa Pelaksanaan</h3>
                  <p>{contract?.masaPelaksanaanSupervisi ? `${contract.masaPelaksanaanSupervisi} hari` : "Tidak tersedia"}</p>
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
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Pemberian Kesempatan</h3>
                    <Badge variant={contract?.pemberianKesempatan ? "default" : "outline"}>
                      {contract?.pemberianKesempatan ? "Ya" : "Tidak"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Kendala</h3>
                    <Badge variant={contract?.kendala ? "destructive" : "outline"}>
                      {contract?.kendala ? "Ada" : "Tidak Ada"}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Hasil Produk Akhir</h3>
                    <p>{contract?.hasilProdukAkhir || "Belum ada"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Dimensi</h3>
                    <p>{contract?.dimensi || "Tidak tersedia"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-sm text-gray-500">Permasalahan</h3>
                    <p>{contract?.permasalahan || "Tidak ada permasalahan"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-sm text-gray-500">Keterangan</h3>
                    <p>{contract?.keterangan || "Tidak ada keterangan"}</p>
                  </div>
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
                          <h3 className="font-medium">Addendum {index + 1}: {item.name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div>
                              <span className="text-sm text-gray-500">Tipe:</span> {item.tipe || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Hari:</span> {item.hari || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Volume:</span> {item.volume || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Satuan:</span> {item.satuan || "-"}
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Pemberian Kesempatan:</span> {item.pemberianKesempatan ? "Ya" : "Tidak"}
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
        
        {/* Progress Tab */}
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Progres Fisik
              </CardTitle>
              {latestProgress && (
                <CardDescription>
                  Progres terakhir: Minggu {latestProgress.week}, {latestProgress.month} ({formatDate(latestProgress.endDate)})
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {contract?.physicalProgress && contract?.physicalProgress.length > 0 ? (
                <div className="space-y-6">
                  {/* Overall Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progres Keseluruhan</span>
                      <span className="text-sm font-medium">
                        {latestProgress?.realisasi.toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={latestProgress?.realisasi || 0} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Rencana: {latestProgress?.rencana.toFixed(2)}%</span>
                      <span>Deviasi: {latestProgress?.deviasi.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  {/* Progress By Week Table */}
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium">Bulan</th>
                          <th className="px-4 py-2 text-left font-medium">Minggu</th>
                          <th className="px-4 py-2 text-left font-medium">Periode</th>
                          <th className="px-4 py-2 text-right font-medium">Rencana</th>
                          <th className="px-4 py-2 text-right font-medium">Realisasi</th>
                          <th className="px-4 py-2 text-right font-medium">Deviasi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {contract?.physicalProgress?.map((progress) => (
                          <tr key={`${progress.month}-${progress.week}`} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{progress.month}</td>
                            <td className="px-4 py-2">{progress.week}</td>
                            <td className="px-4 py-2">
                              {progress.startDate && progress.endDate
                                ? `${formatDate(progress.startDate)} - ${formatDate(progress.endDate)}`
                                : "-"}
                            </td>
                            <td className="px-4 py-2 text-right">{progress.rencana.toFixed(2)}%</td>
                            <td className="px-4 py-2 text-right">{progress.realisasi.toFixed(2)}%</td>
                            <td className={`px-4 py-2 text-right ${progress.deviasi < 0 ? "text-red-500" : "text-green-500"}`}>
                              {progress.deviasi.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p>Belum ada data progres fisik</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Financial Tab */}
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Progres Keuangan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contract?.financialProgress ? (
                <div className="space-y-6">
                  {/* Total Progress Bar */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total Progres Keuangan</span>
                      <span className="text-sm font-medium">
                        {contract.financialProgress.totalProgress ? 
                          (contract.financialProgress.totalProgress * 100).toFixed(2) + "%" : 
                          "0%"}
                      </span>
                    </div>
                    <Progress 
                      value={contract.financialProgress.totalProgress ? 
                        contract.financialProgress.totalProgress * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                  
                  {/* Payment Details */}
                  <div className="border rounded-md p-4 space-y-4">
                    <div>
                      <h3 className="font-medium">Total Pembayaran</h3>
                      <p className="text-lg font-semibold">{formatMoney(contract.financialProgress.totalPayment || 0)}</p>
                      <p className="text-sm text-gray-500">
                        Dari total nilai kontrak: {formatMoney(contract.nilaiKontrak || 0)}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    {/* Termin Details */}
                    <div className="space-y-3">
                      <h3 className="font-medium">Pembayaran Per Termin</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contract.financialProgress.uangMuka && contract.financialProgress.uangMuka > 0 && (
                          <div className="p-3 border rounded-md">
                            <h4 className="text-sm font-medium">Uang Muka</h4>
                            <p className="text-lg">{formatMoney(contract.financialProgress.uangMuka)}</p>
                          </div>
                        )}
                        
                        {contract.financialProgress.termin1 && contract.financialProgress.termin1 > 0 && (
                          <div className="p-3 border rounded-md">
                            <h4 className="text-sm font-medium">Termin 1</h4>
                            <p className="text-lg">{formatMoney(contract.financialProgress.termin1)}</p>
                          </div>
                        )}
                        
                        {contract.financialProgress.termin2 && contract.financialProgress.termin2 > 0 && (
                          <div className="p-3 border rounded-md">
                            <h4 className="text-sm font-medium">Termin 2</h4>
                            <p className="text-lg">{formatMoney(contract.financialProgress.termin2)}</p>
                          </div>
                        )}
                        
                        {contract.financialProgress.termin3 && contract.financialProgress.termin3 > 0 && (
                          <div className="p-3 border rounded-md">
                            <h4 className="text-sm font-medium">Termin 3</h4>
                            <p className="text-lg">{formatMoney(contract.financialProgress.termin3)}</p>
                          </div>
                        )}
                        
                        {contract.financialProgress.termin4 && contract.financialProgress.termin4 > 0 && (
                          <div className="p-3 border rounded-md">
                            <h4 className="text-sm font-medium">Termin 4</h4>
                            <p className="text-lg">{formatMoney(contract.financialProgress.termin4)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Belum ada data progres keuangan</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Location Tab */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi Proyek
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contract?.location ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Detail Lokasi</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Kota/Kabupaten:</span> 
                          <p>{contract.location.kota || "Tidak tersedia"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Distrik:</span> 
                          <p>{contract.location.distrik || "Tidak tersedia"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Kampung:</span> 
                          <p>{contract.location.kampung || "Tidak tersedia"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Koordinat</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Titik Awal:</span>
                          <p className="font-mono">{contract.location.koordinatAwal || "Tidak tersedia"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Titik Akhir:</span>
                          <p className="font-mono">{contract.location.koordinatAkhir || "Tidak tersedia"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Placeholder - In real app, you would integrate a map component here */}
                  <div className="bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center">
                    <p className="text-gray-500">Peta akan ditampilkan di sini</p>
                  </div>
                </div>
              ) : (
                <p>Belum ada data lokasi</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Dokumentasi Proyek
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Documentation Awal */}
                <div>
                  <h3 className="font-medium mb-4">Dokumentasi Awal</h3>
                  {contract?.dokumentasiAwal ? (
                    <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
                      <p className="text-gray-500">Gambar Dokumentasi Awal</p>
                    </div>
                  ) : (
                    <p>Belum ada dokumentasi awal</p>
                  )}
                </div>
                
                {/* Documentation Tengah */}
                <div>
                  <h3 className="font-medium mb-4">Dokumentasi Tengah</h3>
                  {contract?.dokumentasiTengah ? (
                    <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
                      <p className="text-gray-500">Gambar Dokumentasi Tengah</p>
                    </div>
                  ) : (
                    <p>Belum ada dokumentasi tengah</p>
                  )}
                </div>
                
                {/* Documentation Akhir */}
                <div>
                  <h3 className="font-medium mb-4">Dokumentasi Akhir</h3>
                  {contract?.dokumentasiAkhir ? (
                    <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
                      <p className="text-gray-500">Gambar Dokumentasi Akhir</p>
                    </div>
                  ) : (
                    <p>Belum ada dokumentasi akhir</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}