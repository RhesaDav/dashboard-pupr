"use client"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, XCircle } from "lucide-react"
import Image from "next/image"
import { useFormContext } from "react-hook-form"
import { CreateContractType } from "@/schemas/contractSchemas"

export default function ReviewStep() {
  const form = useFormContext<CreateContractType>()
  const data = form.getValues()
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["basic-info"]}>
        <AccordionItem value="basic-info">
          <AccordionTrigger>Informasi Dasar</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nama Paket</p>
                <p className="text-sm sm:text-base">{data.namaPaket}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nama Penyedia</p>
                <p className="text-sm sm:text-base">{data.namaPenyedia || "-"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="personnel">
          <AccordionTrigger>Personel</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">PPK</p>
                <p className="text-sm sm:text-base">{data.ppk || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">NIP PPK</p>
                <p className="text-sm sm:text-base">{data.nipPPK || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Korwaslap</p>
                <p className="text-sm sm:text-base">{data.korwaslap || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">NIP Korwaslap</p>
                <p className="text-sm sm:text-base">{data.nipKorwaslap || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pengawas Lapangan</p>
                <p className="text-sm sm:text-base">{data.pengawasLapangan || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">NIP Pengawas Lapangan</p>
                <p className="text-sm sm:text-base">{data.nipPengawasLapangan || "-"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="financial">
          <AccordionTrigger>Keuangan</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagu Anggaran</p>
                <p className="text-sm sm:text-base">{data.paguAnggaran || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nilai Kontrak</p>
                <p className="text-sm sm:text-base">{data.nilaiKontrak?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sumber Dana</p>
                <p className="text-sm sm:text-base">{data.sumberDana || "-"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contract-details">
          <AccordionTrigger>Detail Kontrak</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nomor Kontrak</p>
                <p className="text-sm sm:text-base">{data.nomorKontrak || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tanggal Kontrak</p>
                <p className="text-sm sm:text-base">{data.tanggalKontrak || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Masa Pelaksanaan</p>
                <p className="text-sm sm:text-base">{data.masaPelaksanaan || "0"} hari</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sub Kegiatan</p>
                <p className="text-sm sm:text-base">{data.subKegiatan || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Volume Kontrak</p>
                <p className="text-sm sm:text-base">{data.volumeKontrak || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satuan Kontrak</p>
                <p className="text-sm sm:text-base">{data.satuanKontrak || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tanggal Mulai</p>
                <p className="text-sm sm:text-base">
                  {data.startDate ? format(new Date(data.startDate), "dd MMMM yyyy") : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tanggal Selesai</p>
                <p className="text-sm sm:text-base">
                  {data.endDate ? format(new Date(data.endDate), "dd MMMM yyyy") : "-"}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="supervision">
          <AccordionTrigger>Supervisi</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Konsultan Supervisi</p>
                <p className="text-sm sm:text-base">{data.konsultanSupervisi || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nomor Kontrak Supervisi</p>
                <p className="text-sm sm:text-base">{data.nomorKontrakSupervisi || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nilai Kontrak Supervisi</p>
                <p className="text-sm sm:text-base">{data.nilaiKontrakSupervisi?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tanggal Kontrak Supervisi</p>
                <p className="text-sm sm:text-base">{data.tanggalKontrakSupervisi || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Masa Pelaksanaan Supervisi</p>
                <p className="text-sm sm:text-base">{data.masaPelaksanaanSupervisi || "0"} hari</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="additional-details">
          <AccordionTrigger>Detail Tambahan</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pemberian Kesempatan</p>
                <p className="text-sm sm:text-base flex items-center">
                  {data.pemberianKesempatan ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" /> Ya
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500 mr-1" /> Tidak
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hasil Produk Akhir</p>
                <p className="text-sm sm:text-base">{data.hasilProdukAkhir || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dimensi</p>
                <p className="text-sm sm:text-base">{data.dimensi || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ada Kendala</p>
                <p className="text-sm sm:text-base flex items-center">
                  {data.kendala ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" /> Ya
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500 mr-1" /> Tidak
                    </>
                  )}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Permasalahan</p>
                <p className="text-sm sm:text-base">{data.permasalahan || "-"}</p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Keterangan</p>
                <p className="text-sm sm:text-base">{data.keterangan || "-"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="documentation">
          <AccordionTrigger>Dokumentasi</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Dokumentasi Awal</p>
                {data.dokumentasiAwal ? (
                  <div className="relative w-full h-48 border rounded-md overflow-hidden">
                    <Image
                      src={data.dokumentasiAwal || "/placeholder.svg"}
                      alt="Dokumentasi awal"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Tidak ada dokumentasi</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Dokumentasi Tengah</p>
                {data.dokumentasiTengah ? (
                  <div className="relative w-full h-48 border rounded-md overflow-hidden">
                    <Image
                      src={data.dokumentasiTengah || "/placeholder.svg"}
                      alt="Dokumentasi tengah"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Tidak ada dokumentasi</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Dokumentasi Akhir</p>
                {data.dokumentasiAkhir ? (
                  <div className="relative w-full h-48 border rounded-md overflow-hidden">
                    <Image
                      src={data.dokumentasiAkhir || "/placeholder.svg"}
                      alt="Dokumentasi akhir"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Tidak ada dokumentasi</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>Lokasi</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kota</p>
                <p className="text-sm sm:text-base">{data.location?.kota || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Distrik</p>
                <p className="text-sm sm:text-base">{data.location?.distrik || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kampung</p>
                <p className="text-sm sm:text-base">{data.location?.kampung || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Koordinat Awal</p>
                <p className="text-sm sm:text-base">{data.location?.koordinatAwal || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Koordinat Akhir</p>
                <p className="text-sm sm:text-base">{data.location?.koordinatAkhir || "-"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="financial-progress">
          <AccordionTrigger>Progress Keuangan</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Progress</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.totalProgress || "0"}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payment</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.totalPayment?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uang Muka</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.uangMuka?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Termin 1</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.termin1?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Termin 2</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.termin2?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Termin 3</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.termin3?.toLocaleString() || "0"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Termin 4</p>
                <p className="text-sm sm:text-base">{data.financialProgress?.termin4?.toLocaleString() || "0"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="physical-progress">
          <AccordionTrigger>Progress Fisik</AccordionTrigger>
          <AccordionContent>
            {data.physicalProgress && data.physicalProgress.length > 0 ? (
              <div className="space-y-4">
                {data.physicalProgress.map((progress, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Progress #{index + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Bulan</p>
                        <p className="text-sm sm:text-base">{progress.month || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Minggu</p>
                        <p className="text-sm sm:text-base">{progress.week || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tanggal Mulai</p>
                        <p className="text-sm sm:text-base">
                          {progress.startDate ? format(new Date(progress.startDate), "dd MMMM yyyy") : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tanggal Selesai</p>
                        <p className="text-sm sm:text-base">
                          {progress.endDate ? format(new Date(progress.endDate), "dd MMMM yyyy") : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Rencana</p>
                        <p className="text-sm sm:text-base">{progress.rencana || "0"}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Realisasi</p>
                        <p className="text-sm sm:text-base">{progress.realisasi || "0"}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Deviasi</p>
                        <p className="text-sm sm:text-base">{progress.deviasi || "0"}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Tidak ada data progress fisik</p>
            )}
          </AccordionContent>
        </AccordionItem>

        {data.hasAddendum && data.addendum && data.addendum.length > 0 && (
          <AccordionItem value="addendum">
            <AccordionTrigger>Addendum</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {data.addendum.map((item, index) => (
                  <div key={item.id} className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Addendum #{index + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Nama</p>
                        <p className="text-sm sm:text-base">{item.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tipe</p>
                        <p className="text-sm sm:text-base">{item.tipe || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Hari</p>
                        <p className="text-sm sm:text-base">{item.hari || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Volume</p>
                        <p className="text-sm sm:text-base">{item.volume || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Satuan</p>
                        <p className="text-sm sm:text-base">{item.satuan || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pemberian Kesempatan</p>
                        <p className="text-sm sm:text-base flex items-center">
                          {item.pemberianKesempatan ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" /> Ya
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-500 mr-1" /> Tidak
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}
