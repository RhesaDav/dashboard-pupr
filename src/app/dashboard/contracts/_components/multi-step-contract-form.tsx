"use client";
import { LocationCombobox } from "@/components/location-combobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateContractSchema, CreateContractType } from "@/schemas/contractSchemas";
import { Map, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateContractFormProps {
  type: "create" | "update" | "detail";
}

const steps = [
  { id: 1, title: "Data Kontrak Dasar" },
  { id: 2, title: "Detail Pelaksanaan" },
  { id: 3, title: "Informasi Supervisi" },
  { id: 4, title: "Addendum" },
  { id: 5, title: "Dokumentasi & Review" },
];

export default function MultiStepContractForm({
  type,
}: CreateContractFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<CreateContractType>({
    resolver: zodResolver(CreateContractSchema),
    defaultValues: {
      namaPaket: "",
      namaPenyedia: "",
      subKegiatan: "",
      ppk: "",
      nipPPK: "",
      korwaslap: "",
      nipKorwaslap: "",
      pengawasLapangan: "",
      nipPengawasLapangan: "",
      paguAnggaran: "",
      sumberDana: "",
      nomorKontrak: "",
      tanggalKontrak: "",
      masaPelaksanaan: 0,
      volumeKontrak: "",
      satuanKontrak: "",
      konsultanSupervisi: "",
      nomorKontrakSupervisi: "",
      nilaiKontrakSupervisi: 0,
      tanggalKontrakSupervisi: "",
      masaPelaksanaanSupervisi: 0,
      hasAddendum: false,
      addendum: [],
      pemberianKesempatan: false,
      hasilProdukAkhir: "",
      dimensi: "",
      kendala: false,
      permasalahan: "",
      keterangan: "",
      nilaiKontrak: 0,
      dokumentasiAwal: "",
      dokumentasiTengah: "",
      dokumentasiAkhir: "",
      location: {
        distrik: "",
        kota: "",
        kampung: "",
        koordinatAwal: "",
        koordinatAkhir: "",
      },
      financialProgress: {
        uangMuka: 0,
        termin1: 0,
        termin2: 0,
        termin3: 0,
        termin4: 0,
      },
    },
  });

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const getPageTitle = () => {
    switch (type) {
      case "create":
        return "Buat Data Kontrak Baru";
      case "update":
        return "Edit Data Kontrak";
      case "detail":
        return "Detail Data Kontrak";
      default:
        return "Data Kontrak";
    }
  };

  const addAddendumItem = () => {
    const currentAddendum = form.watch("addendum") || [];
    form.setValue("addendum", [
      ...currentAddendum,
      {
        id: uuidv4(),
        name: "",
        tipe: "",
        hari: "",
        volume: "",
        satuan: "",
        pemberianKesempatan: false,
      },
    ]);
  };

  const removeAddendumItem = (index: number) => {
    const currentAddendum = form.watch("addendum") || [];
    const newAddendum = [...currentAddendum];
    newAddendum.splice(index, 1);
    form.setValue("addendum", newAddendum);
  };

  const handleSubmit = async (data:CreateContractType) => {
    console.log(data)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <Card
              key={step.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                currentStep === step.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : ""
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <CardHeader className="p-3">
                <CardTitle className="flex items-center gap-3 text-sm font-medium">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-sm ${
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted"
                    }`}
                  >
                    {step.id}
                  </span>
                  <span>{step.title}</span>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Main Form Content */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/50">
              <CardTitle className="text-xl">
                {steps.find((s) => s.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-6">
                {/* Step 1: Data Kontrak Dasar */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="namaPaket" className="font-medium">
                        Nama Paket
                      </Label>
                      <Input
                        id="namaPaket"
                        {...form.register("namaPaket")}
                        placeholder="Masukkan nama paket"
                      />
                      {form.formState.errors.namaPaket && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.namaPaket.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="namaPenyedia" className="font-medium">
                        Nama Penyedia
                      </Label>
                      <Input
                        id="namaPenyedia"
                        {...form.register("namaPenyedia")}
                        placeholder="Masukkan nama penyedia"
                      />
                      {form.formState.errors.namaPenyedia && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.namaPenyedia.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="subKegiatan" className="font-medium">
                        Sub Kegiatan
                      </Label>
                      <Input
                        id="subKegiatan"
                        {...form.register("subKegiatan")}
                        placeholder="Masukkan sub kegiatan"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <LocationCombobox
                        layout="vertical"
                        onSelectionChange={(data) => {
                          form.setValue("location.distrik", data.distrik);
                          form.setValue("location.kota", data.kota);
                        }}
                        defaultValue={{
                          distrik: form.watch("location.distrik") as string,
                          kota: form.watch("location.kota") as string,
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="koordinatAwal" className="font-medium">
                        Titik Koordinat Awal
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="koordinatAwal"
                          {...form.register("location.koordinatAwal")}
                          placeholder="cth: -6.123456,106.789012"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          title="Buka di Google Maps"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/place/${form.watch(
                                "location.koordinatAwal"
                              )}`
                            )
                          }
                        >
                          <Map className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="koordinatAkhir" className="font-medium">
                        Titik Koordinat Akhir
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="koordinatAkhir"
                          {...form.register("location.koordinatAkhir")}
                          placeholder="cth: -6.123456,106.789012"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          title="Buka di Google Maps"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/place/${form.watch(
                                "location.koordinatAkhir"
                              )}`
                            )
                          }
                        >
                          <Map className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nomorKontrak" className="font-medium">
                        Nomor Kontrak
                      </Label>
                      <Input
                        id="nomorKontrak"
                        {...form.register("nomorKontrak")}
                        placeholder="Masukkan nomor kontrak"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tanggalKontrak" className="font-medium">
                        Tanggal Kontrak
                      </Label>
                      <Input
                        id="tanggalKontrak"
                        type="date"
                        {...form.register("tanggalKontrak")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nilaiKontrak" className="font-medium">
                        Nilai Kontrak (Rp)
                      </Label>
                      <Input
                        id="nilaiKontrak"
                        type="number"
                        {...form.register("nilaiKontrak", {
                          valueAsNumber: true,
                        })}
                        placeholder="0"
                      />
                      {form.formState.errors.nilaiKontrak && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.nilaiKontrak.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paguAnggaran" className="font-medium">
                        Pagu Anggaran (Rp)
                      </Label>
                      <Input
                        id="paguAnggaran"
                        {...form.register("paguAnggaran")}
                        placeholder="Masukkan pagu anggaran"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sumberDana" className="font-medium">
                        Sumber Dana
                      </Label>
                      <Input
                        id="sumberDana"
                        {...form.register("sumberDana")}
                        placeholder="Masukkan sumber dana"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Detail Pelaksanaan */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="masaPelaksanaan" className="font-medium">
                        Masa Pelaksanaan (Hari)
                      </Label>
                      <Input
                        id="masaPelaksanaan"
                        type="number"
                        {...form.register("masaPelaksanaan", {
                          valueAsNumber: true,
                        })}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="volumeKontrak" className="font-medium">
                        Volume Kontrak
                      </Label>
                      <Input
                        id="volumeKontrak"
                        {...form.register("volumeKontrak")}
                        placeholder="Masukkan volume kontrak"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="satuanKontrak" className="font-medium">
                        Satuan Kontrak
                      </Label>
                      <Input
                        id="satuanKontrak"
                        {...form.register("satuanKontrak")}
                        placeholder="cth: m², km, unit"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ppk" className="font-medium">
                        PPK
                      </Label>
                      <Input
                        id="ppk"
                        {...form.register("ppk")}
                        placeholder="Nama PPK"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nipPPK" className="font-medium">
                        NIP PPK
                      </Label>
                      <Input
                        id="nipPPK"
                        {...form.register("nipPPK")}
                        placeholder="NIP PPK"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="korwaslap" className="font-medium">
                        Korwaslap
                      </Label>
                      <Input
                        id="korwaslap"
                        {...form.register("korwaslap")}
                        placeholder="Nama Korwaslap"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nipKorwaslap" className="font-medium">
                        NIP Korwaslap
                      </Label>
                      <Input
                        id="nipKorwaslap"
                        {...form.register("nipKorwaslap")}
                        placeholder="NIP Korwaslap"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pengawasLapangan" className="font-medium">
                        Pengawas Lapangan
                      </Label>
                      <Input
                        id="pengawasLapangan"
                        {...form.register("pengawasLapangan")}
                        placeholder="Nama Pengawas Lapangan"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="nipPengawasLapangan"
                        className="font-medium"
                      >
                        NIP Pengawas Lapangan
                      </Label>
                      <Input
                        id="nipPengawasLapangan"
                        {...form.register("nipPengawasLapangan")}
                        placeholder="NIP Pengawas Lapangan"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-semibold mb-4 border-b pb-2">
                        Terminasi Pembayaran
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="uangMuka" className="font-medium">
                            Uang Muka (%)
                          </Label>
                          <Input
                            id="uangMuka"
                            type="number"
                            {...form.register("financialProgress.uangMuka", {
                              valueAsNumber: true,
                            })}
                            placeholder="0"
                          />
                          {form.formState.errors.financialProgress?.uangMuka && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.financialProgress?.uangMuka.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="termin1" className="font-medium">
                            Termin 1 (%)
                          </Label>
                          <Input
                            id="termin1"
                            type="number"
                            {...form.register("financialProgress.termin1", {
                              valueAsNumber: true,
                            })}
                            placeholder="0"
                          />
                          {form.formState.errors.financialProgress?.termin1 && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.financialProgress.termin1.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="termin2" className="font-medium">
                            Termin 2 (%)
                          </Label>
                          <Input
                            id="termin2"
                            type="number"
                            {...form.register("financialProgress.termin2", {
                              valueAsNumber: true,
                            })}
                            placeholder="0"
                          />
                          {form.formState.errors.financialProgress?.termin2 && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.financialProgress.termin2.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="termin3" className="font-medium">
                            Termin 3 (%)
                          </Label>
                          <Input
                            id="termin3"
                            type="number"
                            {...form.register("financialProgress.termin3", {
                              valueAsNumber: true,
                            })}
                            placeholder="0"
                          />
                          {form.formState.errors.financialProgress?.termin3 && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.financialProgress.termin3.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="termin4" className="font-medium">
                            Termin 4 (%)
                          </Label>
                          <Input
                            id="termin4"
                            type="number"
                            {...form.register("financialProgress.termin4", {
                              valueAsNumber: true,
                            })}
                            placeholder="0"
                          />
                          {form.formState.errors.financialProgress?.termin4 && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.financialProgress.termin4.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Informasi Supervisi */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="konsultanSupervisi"
                        className="font-medium"
                      >
                        Konsultan Supervisi
                      </Label>
                      <Input
                        id="konsultanSupervisi"
                        {...form.register("konsultanSupervisi")}
                        placeholder="Nama Konsultan Supervisi"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="nomorKontrakSupervisi"
                        className="font-medium"
                      >
                        Nomor Kontrak Supervisi
                      </Label>
                      <Input
                        id="nomorKontrakSupervisi"
                        {...form.register("nomorKontrakSupervisi")}
                        placeholder="Masukkan nomor kontrak supervisi"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="nilaiKontrakSupervisi"
                        className="font-medium"
                      >
                        Nilai Kontrak Supervisi (Rp)
                      </Label>
                      <Input
                        id="nilaiKontrakSupervisi"
                        type="number"
                        {...form.register("nilaiKontrakSupervisi", {
                          valueAsNumber: true,
                        })}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="tanggalKontrakSupervisi"
                        className="font-medium"
                      >
                        Tanggal Kontrak Supervisi
                      </Label>
                      <Input
                        id="tanggalKontrakSupervisi"
                        type="date"
                        {...form.register("tanggalKontrakSupervisi")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="masaPelaksanaanSupervisi"
                        className="font-medium"
                      >
                        Masa Pelaksanaan Supervisi (Hari)
                      </Label>
                      <Input
                        id="masaPelaksanaanSupervisi"
                        type="number"
                        {...form.register("masaPelaksanaanSupervisi", {
                          valueAsNumber: true,
                        })}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hasilProdukAkhir" className="font-medium">
                        Hasil Produk Akhir
                      </Label>
                      <Input
                        id="hasilProdukAkhir"
                        {...form.register("hasilProdukAkhir")}
                        placeholder="Masukkan hasil produk akhir"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensi" className="font-medium">
                        Dimensi
                      </Label>
                      <Input
                        id="dimensi"
                        {...form.register("dimensi")}
                        placeholder="Masukkan dimensi"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="kendala"
                          checked={form.watch("kendala")}
                          onCheckedChange={(checked) =>
                            form.setValue("kendala", checked as boolean)
                          }
                        />
                        <Label htmlFor="kendala" className="font-medium">
                          Ada Kendala
                        </Label>
                      </div>
                    </div>

                    {form.watch("kendala") && (
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="permasalahan" className="font-medium">
                          Permasalahan
                        </Label>
                        <Textarea
                          id="permasalahan"
                          {...form.register("permasalahan")}
                          placeholder="Deskripsikan permasalahan yang dihadapi"
                          rows={4}
                        />
                      </div>
                    )}

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="keterangan" className="font-medium">
                        Keterangan
                      </Label>
                      <Textarea
                        id="keterangan"
                        {...form.register("keterangan")}
                        placeholder="Masukkan keterangan tambahan"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Addendum */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="font-medium">Addendum</Label>
                      <RadioGroup
                        value={form.watch("hasAddendum") ? "ada" : "tidak ada"}
                        onValueChange={(value) =>
                          form.setValue(
                            "hasAddendum",
                            value === "ada" ? true : false
                          )
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ada" id="ada" />
                          <Label htmlFor="ada">Ada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tidak ada" id="tidak-ada" />
                          <Label htmlFor="tidak-ada">Tidak Ada</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {form.watch("hasAddendum") && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Detail Addendum</h3>
                          <Button
                            type="button"
                            onClick={addAddendumItem}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Plus className="h-4 w-4" /> Tambah
                          </Button>
                        </div>

                        {(form.watch("addendum") || []).length === 0 && (
                          <div className="text-center p-6 border rounded-md bg-muted/20">
                            <p className="text-muted-foreground">
                              Belum ada data addendum. Klik tombol Tambah untuk
                              menambahkan.
                            </p>
                          </div>
                        )}

                        {(form.watch("addendum") || []).map((_, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between mb-4">
                              <h4 className="font-medium">
                                Addendum #{index + 1}
                              </h4>
                              <Button
                                type="button"
                                onClick={() => removeAddendumItem(index)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`addendum.${index}.name`}
                                  className="font-medium"
                                >
                                  Nama Addendum
                                </Label>
                                <Input
                                  id={`addendum.${index}.name`}
                                  {...form.register(
                                    `addendum.${index}.name` as any
                                  )}
                                  placeholder="Nama addendum"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor={`addendum.${index}.tipe`}
                                  className="font-medium"
                                >
                                  Tipe Addendum
                                </Label>
                                <Input
                                  id={`addendum.${index}.tipe`}
                                  {...form.register(
                                    `addendum.${index}.tipe` as any
                                  )}
                                  placeholder="Tipe addendum"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor={`addendum.${index}.hari`}
                                  className="font-medium"
                                >
                                  Hari
                                </Label>
                                <Input
                                  id={`addendum.${index}.hari`}
                                  {...form.register(
                                    `addendum.${index}.hari` as any
                                  )}
                                  placeholder="Jumlah hari"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`addendum.${index}.volume`}
                                  className="font-medium"
                                >
                                  Volume
                                </Label>
                                <Input
                                  id={`addendum.${index}.volume`}
                                  {...form.register(
                                    `addendum.${index}.volume` as any
                                  )}
                                  placeholder="Volume addendum"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor={`addendum.${index}.satuan`}
                                  className="font-medium"
                                >
                                  Satuan
                                </Label>
                                <Input
                                  id={`addendum.${index}.satuan`}
                                  {...form.register(
                                    `addendum.${index}.satuan` as any
                                  )}
                                  placeholder="Satuan"
                                />
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`addendum.${index}.pemberianKesempatan`}
                                    checked={form.watch(
                                      `addendum.${index}.pemberianKesempatan` as any
                                    )}
                                    onCheckedChange={(checked) =>
                                      form.setValue(
                                        `addendum.${index}.pemberianKesempatan` as any,
                                        checked as boolean
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor={`addendum.${index}.pemberianKesempatan`}
                                    className="font-medium"
                                  >
                                    Pemberian Kesempatan
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2 pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pemberianKesempatan"
                          checked={form.watch("pemberianKesempatan")}
                          onCheckedChange={(checked) =>
                            form.setValue(
                              "pemberianKesempatan",
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor="pemberianKesempatan"
                          className="font-medium"
                        >
                          Pemberian Kesempatan
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pilih opsi ini jika terdapat pemberian kesempatan diluar
                        addendum
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Dokumentasi & Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="dokumentasiAwal"
                          className="font-medium"
                        >
                          Dokumentasi Awal
                        </Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Input
                            id="dokumentasiAwal"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                form.setValue(
                                  "dokumentasiAwal",
                                  URL.createObjectURL(file)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor="dokumentasiAwal"
                            className="cursor-pointer"
                          >
                            {form.watch("dokumentasiAwal") ? (
                              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                                <img
                                  src={form.watch("dokumentasiAwal") as string}
                                  alt="Dokumentasi awal"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4">
                                <div className="rounded-full bg-primary/10 p-2 mb-2">
                                  <Plus className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-sm font-medium">
                                  Upload Foto
                                </span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  Klik untuk memilih
                                </span>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="dokumentasiTengah"
                          className="font-medium"
                        >
                          Dokumentasi Tengah
                        </Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Input
                            id="dokumentasiTengah"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                form.setValue(
                                  "dokumentasiTengah",
                                  URL.createObjectURL(file)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor="dokumentasiTengah"
                            className="cursor-pointer"
                          >
                            {form.watch("dokumentasiTengah") ? (
                              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                                <img
                                  src={form.watch("dokumentasiTengah") as string}
                                  alt="Dokumentasi tengah"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4">
                                <div className="rounded-full bg-primary/10 p-2 mb-2">
                                  <Plus className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-sm font-medium">
                                  Upload Foto
                                </span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  Klik untuk memilih
                                </span>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="dokumentasiAkhir"
                          className="font-medium"
                        >
                          Dokumentasi Akhir
                        </Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Input
                            id="dokumentasiAkhir"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                form.setValue(
                                  "dokumentasiAkhir",
                                  URL.createObjectURL(file)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor="dokumentasiAkhir"
                            className="cursor-pointer"
                          >
                            {form.watch("dokumentasiAkhir") ? (
                              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                                <img
                                  src={form.watch("dokumentasiAkhir") as string}
                                  alt="Dokumentasi akhir"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4">
                                <div className="rounded-full bg-primary/10 p-2 mb-2">
                                  <Plus className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-sm font-medium">
                                  Upload Foto
                                </span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  Klik untuk memilih
                                </span>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Review Summary */}
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">
                        Ringkasan Data Kontrak
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Nama Paket
                          </h4>
                          <p>{form.watch("namaPaket") || "-"}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Nama Penyedia
                          </h4>
                          <p>{form.watch("namaPenyedia") || "-"}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Lokasi
                          </h4>
                          <p>
                            {[
                              form.watch("location.kampung"),
                              form.watch("location.distrik"),
                              form.watch("location.kota"),
                            ]
                              .filter(Boolean)
                              .join(", ") || "-"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Nilai Kontrak
                          </h4>
                          <p>
                            {form.watch("nilaiKontrak")
                              ? `Rp ${form
                                  .watch("nilaiKontrak")
                                  .toLocaleString("id-ID")}`
                              : "-"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Nomor Kontrak
                          </h4>
                          <p>{form.watch("nomorKontrak") || "-"}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Tanggal Kontrak
                          </h4>
                          <p>{form.watch("tanggalKontrak") || "-"}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Masa Pelaksanaan
                          </h4>
                          <p>
                            {form.watch("masaPelaksanaan")
                              ? `${form.watch("masaPelaksanaan")} Hari`
                              : "-"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            PPK
                          </h4>
                          <p>{form.watch("ppk") || "-"}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Addendum
                          </h4>
                          <p>
                            {form.watch("hasAddendum")
                              ? `Ada (${(form.watch("addendum") || []).length})`
                              : "Tidak Ada"}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            Pemberian Kesempatan
                          </h4>
                          <p>
                            {form.watch("pemberianKesempatan") ? "Ya" : "Tidak"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t mt-8">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Kembali
                  </Button>
                  {currentStep < steps.length ? (
                    <Button type="button" onClick={nextStep}>
                      Lanjut
                    </Button>
                  ) : (
                    <Button onClick={form.handleSubmit(handleSubmit)} type="button">Simpan Kontrak</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
