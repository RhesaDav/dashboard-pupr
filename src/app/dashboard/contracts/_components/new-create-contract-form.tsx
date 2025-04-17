"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addDays, format, parse } from "date-fns";
import { Calendar, Plus, Minus, Map, Percent } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { romanize } from "@/lib/utils";
import {
  CreateContractSchema,
  CreateContractType,
} from "@/schemas/contractSchemas";
import { createContract, editContract } from "@/actions/contract";
import { Addendum, Contract } from "@prisma/client";
import { InputCurrency } from "@/components/input-currency";
import { LocationCombobox } from "@/components/location-combobox";

type ContactFormType = {
  id?: string;
  type?: "create" | "update" | "detail";
  initialData?: Contract & { addendum: Addendum[] };
  progressTotal?: {
    rencana: number;
    realisasi: number;
    deviasi: number;
  };
};

export default function ContractForm({
  id,
  type = "create",
  initialData,
  progressTotal,
}: ContactFormType) {
  const router = useRouter();
  const form = useForm<CreateContractType>({
    resolver: zodResolver(
      CreateContractSchema.refine(
        (data) => {
          const totalPercentage =
            (data.uangMuka || 0) +
            (data.termin1 || 0) +
            (data.termin2 || 0) +
            (data.termin3 || 0) +
            (data.termin4 || 0);
          return totalPercentage <= 100;
        },
        {
          message:
            "Total persentase Uang Muka dan Termin 1-4 tidak boleh melebihi 100%",
          path: ["termin4"],
        }
      )
    ),
    defaultValues: {
      distrik: initialData?.distrik || "",
      dokumentasiAkhir: initialData?.dokumentasiAkhir || "",
      dokumentasiAwal: initialData?.dokumentasiAwal || "",
      dokumentasiTengah: initialData?.dokumentasiTengah || "",
      kampung: initialData?.kampung || "",
      koordinatAkhir: initialData?.koordinatAkhir || "",
      koordinatAwal: initialData?.koordinatAwal || "",
      korwaslap: initialData?.korwaslap || "",
      kota: initialData?.kota || "",
      namaPaket: initialData?.namaPaket || "",
      subKegiatan: initialData?.subKegiatan || "",
      namaPenyedia: initialData?.namaPenyedia || "",
      nipKorwaslap: initialData?.nipKorwaslap || "",
      nipPengawasLapangan: initialData?.nipPengawasLapangan || "",
      nipPPK: initialData?.nipPPK || "",
      paguAnggaran: initialData?.paguAnggaran || "",
      pengawasLapangan: initialData?.pengawasLapangan || "",
      ppk: initialData?.ppk || "",
      addendum: initialData?.addendum || [],
      dimensi: initialData?.dimensi || "",
      hasilProdukAkhir: initialData?.hasilProdukAkhir || "",
      kendala: initialData?.kendala ?? false, // Boolean pakai `??`
      keterangan: initialData?.keterangan || "",
      konsultanSupervisi: initialData?.konsultanSupervisi || "",
      nilaiKontrakSupervisi: initialData?.nilaiKontrakSupervisi || 0,
      masaPelaksanaan: initialData?.masaPelaksanaan ?? 0, // Number pakai `??`
      masaPelaksanaanSupervisi: initialData?.masaPelaksanaanSupervisi ?? 0,
      nilaiKontrak: initialData?.nilaiKontrak ?? 0,
      nomorKontrak: initialData?.nomorKontrak || "",
      nomorKontrakSupervisi: initialData?.nomorKontrakSupervisi || "",
      pemberianKesempatan: initialData?.pemberianKesempatan ?? false,
      permasalahan: initialData?.permasalahan || "",
      satuanKontrak: initialData?.satuanKontrak || "",
      sumberDana: initialData?.sumberDana || "",
      tanggalKontrak: initialData?.tanggalKontrak
        ? format(new Date(initialData.tanggalKontrak), "dd-MM-yyyy")
        : format(new Date(), "dd-MM-yyyy"),
      tanggalKontrakSupervisi: initialData?.tanggalKontrakSupervisi
        ? format(new Date(initialData.tanggalKontrakSupervisi), "dd-MM-yyyy")
        : format(new Date(), "dd-MM-yyyy"),
      termin1: initialData?.termin1 ?? 0,
      termin2: initialData?.termin2 ?? 0,
      termin3: initialData?.termin3 ?? 0,
      termin4: initialData?.termin4 ?? 0,
      uangMuka: initialData?.uangMuka ?? 0,
      volumeKontrak: initialData?.volumeKontrak || "",
      hasAddendum:
        (initialData?.hasAddendum as "ada" | "tidak ada") || "tidak ada",
    },
    // mode: "onBlur",
    disabled: type === "detail",
  });

  const hasAddendum = form.watch("hasAddendum");
  const addendumItems = form.watch("addendum");

  const onSubmit = async (data: CreateContractType) => {
    try {
      if (type === "update" && id) {
        const updatedData = await editContract(id, data);

        if (updatedData.success) {
          router.push("/dashboard/contracts")
          toast.success("Contract updated successfully");
        } else {
          toast.error(updatedData.error || "failed");
        }
      } else {
        const createdData = await createContract(data);

        if (createdData.success) {
          router.push("/dashboard/contracts")
          toast.success("Contract created successfully");
        } else {
          toast.error(createdData.error || "failed");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.message);
      }
      toast.error("Something wrong");
    }
  };

  const addAddendumItem = () => {
    const currentItems = form.getValues("addendum") || [];

    form.setValue("addendum", [
      ...currentItems,
      {
        id: uuid(),
        name: "",
        tipe: "",
        hari: "",
        satuan: "",
        volume: "",
        pemberianKesempatan: false,
      },
    ]);
  };

  const removeAddendumItem = (id: string) => {
    const currentItems = form.getValues("addendum");
    if (currentItems && currentItems.length > 1) {
      form.setValue(
        "addendum",
        currentItems.filter((item) => item.id !== id)
      );
    }
  };

  const updateAddendumItem = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    const currentItems = form.getValues("addendum");
    const updatedItems = currentItems?.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    form.setValue("addendum", updatedItems);
  };

  const updateAddendumType = (id: string, type: "waktu" | "volume") => {
    const currentItems = form.getValues("addendum");
    console.log(currentItems, type);
    const updatedItems = currentItems?.map((item) =>
      item.id === id
        ? type === "waktu"
          ? {
              ...item,
              tipe: type,
              hari: "",
              volume: undefined,
              satuan: undefined,
            }
          : { ...item, tipe: type, hari: undefined, volume: "", satuan: "" }
        : item
    );

    form.setValue("addendum", updatedItems);
  };

  useEffect(() => {
    if (hasAddendum === "tidak ada") {
      form.setValue("addendum", []);
    } else {
      form.setValue(
        "addendum",
        form.getValues().addendum || [
          {
            id: uuid(),
            name: "",
            tipe: "",
            hari: "",
            satuan: "",
            volume: "",
            pemberianKesempatan: false,
          },
        ]
      );
    }
  }, [hasAddendum, form]);

  const totalPercentage = () => {
    const values = form.getValues();
    return (
      (values.uangMuka || 0) +
      (values.termin1 || 0) +
      (values.termin2 || 0) +
      (values.termin3 || 0) +
      (values.termin4 || 0)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">{type === "create" ? "Buat Data Kontrak Baru" : type === "update" ? "Edit Data Kontrak" : "Detail Data Kontrak"}</h1>
      {/* <Progress value={(1 / 6) * 100} className="mb-6" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Data Kontrak Dasar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <Label>Nama Paket</Label>
                <Input {...form.register("namaPaket")} />
                {form.formState.errors.namaPaket && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.namaPaket.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Nama Penyedia</Label>
                <Input {...form.register("namaPenyedia")} />
                {form.formState.errors.namaPenyedia && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.namaPenyedia.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <LocationCombobox
                  layout="vertical"
                  onSelectionChange={(data) => {
                    form.setValue("distrik", data.distrik);
                    form.setValue("kota", data.kota);
                  }}
                  defaultValue={{
                    distrik: form.watch("distrik"),
                    kota: form.watch("kota"),
                  }}
                />
              </div>

              {/* <div className="space-y-2 mb-6">
                <Label>Kabupaten / Kota</Label>
                <Input {...form.register("kota")} />
                {form.formState.errors.kota && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.kota.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Distrik</Label>
                <Input {...form.register("distrik")} />
                {form.formState.errors.distrik && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.distrik.message}
                  </p>
                )}{" "}
              </div> */}

              <div className="space-y-2 mb-6">
                <Label>Kampung</Label>
                <Input {...form.register("kampung")} />
                {form.formState.errors.kampung && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.kampung.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Titik Koordinat Awal</Label>
                <div className="grid grid-cols-10 gap-2">
                  <Input
                    className="col-span-9"
                    {...form.register("koordinatAwal")}
                  />
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/place/${form.watch(
                          "koordinatAwal"
                        )}`
                      )
                    }
                  >
                    <Map />
                  </Button>
                </div>
                {form.formState.errors.koordinatAwal && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.koordinatAwal.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Titik Koordinat Akhir</Label>
                <div className="grid grid-cols-10 gap-2">
                  <Input
                    className="col-span-9"
                    {...form.register("koordinatAkhir")}
                  />
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/place/${form.watch(
                          "koordinatAkhir"
                        )}`
                      )
                    }
                  >
                    <Map />
                  </Button>
                </div>
                {form.formState.errors.koordinatAkhir && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.koordinatAkhir.message}
                  </p>
                )}{" "}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detail Kontrak</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="nilaiKontrak">Nilai Kontrak</Label>
                  <InputCurrency
                    id="nilaiKontrak"
                    value={form.watch("nilaiKontrak")}
                    onValueChange={(value) =>
                      form.setValue("nilaiKontrak", value)
                    }
                  />
                  <input type="hidden" {...form.register("nilaiKontrak")} />
                  {form.formState.errors.nilaiKontrak && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.nilaiKontrak.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nilaiKontrak">Sub Kegiatan</Label>
                  <Select
                    defaultValue={form.watch("subKegiatan")}
                    onValueChange={(value: string) =>
                      form.setValue("subKegiatan", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Subkegiatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pengawasan Penyelenggaraan Jalan Kewenangan Provinsi">
                        Pengawasan Penyelenggaraan Jalan Kewenangan Provinsi
                      </SelectItem>
                      <SelectItem value="Pemantauan dan Evaluasi Penyelenggaraan Jalan/Jembatan">
                        Pemantauan dan Evaluasi Penyelenggaraan Jalan/Jembatan
                      </SelectItem>
                      <SelectItem value="Rehabilitasi Jalan">
                        Rehabilitasi Jalan
                      </SelectItem>
                      <SelectItem value="Rekonstruksi Jalan">
                        Rekonstruksi Jalan
                      </SelectItem>
                      <SelectItem value="Pembangunan Jembatan">
                        Pembangunan Jembatan
                      </SelectItem>
                      <SelectItem value="Pemeliharaan Berkala Jalan">
                        Pemeliharaan Berkala Jalan
                      </SelectItem>
                      <SelectItem value="Penyusunan Rencana, Kebijakan, Strategi dan Teknis Pengembangan Jaringan Jalan serta Perencanaan Teknis Penyelenggaraan Jalan dan Jembatan">
                        Penyusunan Rencana, Kebijakan, Strategi dan Teknis
                        Pengembangan Jaringan Jalan serta Perencanaan Teknis
                        Penyelenggaraan Jalan dan Jembatan
                      </SelectItem>
                      <SelectItem value="Pembangunan Jalan">
                        Pembangunan Jalan
                      </SelectItem>
                      <SelectItem value="Survey Kondisi Jalan/Jembatan">
                        Survey Kondisi Jalan/Jembatan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...form.register("subKegiatan")} />
                  {form.formState.errors.subKegiatan && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.subKegiatan.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sumberDana">Sumber Dana</Label>
                  <Input id="sumberDana" {...form.register("sumberDana")} />
                  {form.formState.errors.sumberDana && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.sumberDana.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomorKontrak">Nomor Kontrak</Label>
                  <Input id="nomorKontrak" {...form.register("nomorKontrak")} />
                  {form.formState.errors.nomorKontrak && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.nomorKontrak.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contractDate">Tanggal Kontrak</Label>
                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {form.watch("tanggalKontrak") ? (
                              form.watch("tanggalKontrak")
                            ) : (
                              <span className="text-muted-foreground">
                                DD-MM-YYYY
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            onSelect={(date) =>
                              form.setValue(
                                "tanggalKontrak",
                                date ? format(date, "dd-MM-yyyy") : ""
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {form.formState.errors.tanggalKontrak && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.tanggalKontrak.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="masaPelaksanaan">
                      Masa Pelaksanaan ( Hari )
                    </Label>
                    <Input
                      id="masaPelaksanaan"
                      type="number"
                      {...form.register("masaPelaksanaan", {
                        valueAsNumber: true,
                      })}
                    />
                    {form.formState.errors.masaPelaksanaan && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.masaPelaksanaan.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volumeKontrak">Volume Kontrak</Label>
                    <Input
                      id="volumeKontrak"
                      type="number"
                      {...form.register("volumeKontrak")}
                    />
                    {form.formState.errors.volumeKontrak && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.volumeKontrak.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="satuanKontrak">Satuan Kontrak</Label>
                    <Input
                      id="satuanKontrak"
                      {...form.register("satuanKontrak")}
                    />
                    {form.formState.errors.satuanKontrak && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.satuanKontrak.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Addendum Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Addendum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Status Addendum</Label>
                  <Select
                    defaultValue={form.watch("hasAddendum")}
                    onValueChange={(value: "ada" | "tidak ada") =>
                      form.setValue("hasAddendum", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status Addendum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ada">Ada</SelectItem>
                      <SelectItem value="tidak ada">Tidak Ada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {hasAddendum === "ada" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Total Item: {addendumItems?.length}</Label>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={addAddendumItem}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (addendumItems) {
                              removeAddendumItem(
                                addendumItems[addendumItems.length - 1].id || ""
                              );
                            }
                          }}
                          disabled={addendumItems!.length <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {addendumItems?.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-4 border rounded space-y-3 relative"
                      >
                        <div className="space-y-2">
                          <Label htmlFor={`addendum-text-${item.id}`}>
                            Nomor Addendum
                          </Label>
                          <Input
                            id={`addendum-text-${item.id}`}
                            value={item.name || ""}
                            onChange={(e) =>
                              updateAddendumItem(
                                item.id || "",
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`addendum-type-${item.id}`}>
                            Tipe Addendum
                          </Label>
                          <Select
                            value={item.tipe || ""}
                            onValueChange={(value: "waktu" | "volume") =>
                              updateAddendumType(item.id || "", value)
                            }
                          >
                            <SelectTrigger id={`addendum-type-${item.id}`}>
                              <SelectValue placeholder="Pilih Tipe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="waktu">Waktu</SelectItem>
                              <SelectItem value="volume">Volume</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {item.tipe === "waktu" && (
                          <div className="space-y-2">
                            <Label htmlFor={`addendum-days-${item.id}`}>
                              Jumlah Hari
                            </Label>
                            <Input
                              id={`addendum-days-${item.id}`}
                              value={item.hari || ""}
                              onChange={(e) =>
                                updateAddendumItem(
                                  item.id || "",
                                  "hari",
                                  e.target.value
                                )
                              }
                              type="number"
                            />
                          </div>
                        )}

                        {item.tipe === "volume" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`addendum-amount-${item.id}`}>
                                Jumlah
                              </Label>
                              <Input
                                id={`addendum-amount-${item.id}`}
                                value={item.volume || ""}
                                onChange={(e) =>
                                  updateAddendumItem(
                                    item.id || "",
                                    "volume",
                                    e.target.value
                                  )
                                }
                                type="number"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`addendum-unit-${item.id}`}>
                                Satuan
                              </Label>
                              <Input
                                id={`addendum-unit-${item.id}`}
                                value={item.satuan || ""}
                                onChange={(e) =>
                                  updateAddendumItem(
                                    item.id || "",
                                    "satuan",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}

                        {/* Checkbox untuk Pemberian Kesempatan di kanan bawah */}
                        <div className="flex justify-end items-end mt-4">
                          <Label
                            htmlFor={`addendum-opportunity-${item.id}`}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`addendum-opportunity-${item.id}`}
                              checked={item.pemberianKesempatan || false}
                              onCheckedChange={(checked) =>
                                updateAddendumItem(
                                  item.id || "",
                                  "pemberianKesempatan",
                                  checked
                                )
                              }
                            />
                            <span>Pemberian Kesempatan</span>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <Label>Hasil Produk Akhir</Label>
                <Select
                  defaultValue={form.getValues().hasilProdukAkhir}
                  onValueChange={(value) =>
                    form.setValue("hasilProdukAkhir", value)
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Pilih hasil produk akhir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="HRS WC">HRS WC</SelectItem>
                      <SelectItem value="HRS BASE">HRS BASE</SelectItem>
                      <SelectItem value="Lapen">Lapen</SelectItem>
                      <SelectItem value="Rigid">Rigid</SelectItem>
                      <SelectItem value="Urpil">Urpil</SelectItem>
                      <SelectItem value="AC WC">AC WC</SelectItem>
                      <SelectItem value="Talud">Talud</SelectItem>
                      <SelectItem value="Bronjong">Bronjong</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {form.formState.errors.hasilProdukAkhir && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.hasilProdukAkhir.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Dimensi</Label>
                <Input {...form.register("dimensi")} />
                {form.formState.errors.dimensi && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.dimensi.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6 flex gap-2">
                <Checkbox
                  id="terms"
                  type="button"
                  checked={form.watch("kendala")}
                  onCheckedChange={(checked) =>
                    form.setValue("kendala", Boolean(checked))
                  }
                />{" "}
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Kendala
                </label>
              </div>

              {form.watch("kendala") && (
                <div>
                  <div className="space-y-2 mb-6">
                    <Label>Permasalahan</Label>
                    <Textarea
                      {...form.register("permasalahan")}
                      className="min-h-32"
                    />
                    {form.formState.errors.permasalahan && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.permasalahan.message}
                      </p>
                    )}{" "}
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label>Keterangan</Label>
                    <Textarea
                      {...form.register("keterangan")}
                      className="min-h-32"
                    />
                    {form.formState.errors.keterangan && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.keterangan.message}
                      </p>
                    )}{" "}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Data Pendukung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <Label>PPK</Label>
                <Input {...form.register("ppk")} />
                {form.formState.errors.ppk && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.ppk.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <Label>NIP PPK</Label>
                <Input {...form.register("nipPPK")} />
                {form.formState.errors.nipPPK && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.nipPPK.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Korwaslap</Label>
                <Input {...form.register("korwaslap")} />
                {form.formState.errors.korwaslap && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.korwaslap.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>NIP Korwaslap</Label>
                <Input {...form.register("nipKorwaslap")} />
                {form.formState.errors.nipKorwaslap && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.nipKorwaslap.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Pengawas Lapangan</Label>
                <Input {...form.register("pengawasLapangan")} />
                {form.formState.errors.pengawasLapangan && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.pengawasLapangan.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>NIP Pengawas Lapangan</Label>
                <Input {...form.register("nipPengawasLapangan")} />
                {form.formState.errors.nipPengawasLapangan && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.nipPengawasLapangan.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Pagu Anggaran</Label>
                {/* <Input {...form.register("paguAnggaran")} /> */}
                <InputCurrency
                    id="paguAnggaran"
                    value={form.watch("paguAnggaran")}
                    onValueChange={(value) =>
                      form.setValue("paguAnggaran", String(value))
                    }
                  />
                {form.formState.errors.paguAnggaran && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.paguAnggaran.message}
                  </p>
                )}{" "}
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Masa Kontrak{" "}
                <span className="bg-gray-100 p-2 rounded-md">
                  {form.watch("masaPelaksanaan") +
                    (form
                      .watch("addendum")
                      ?.reduce(
                        (acc, item) => acc + Number(item.hari || 0),
                        0
                      ) || 0)}{" "}
                  Hari
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Akhir Kontrak Asli */}
                <div className="grid grid-cols-12 gap-2 items-center text-sm">
                  <div className="col-span-4 font-medium">
                    Akhir Kontrak Asli
                  </div>
                  <div className="col-span-5">
                    :{" "}
                    {form.watch("tanggalKontrak")
                      ? format(
                          addDays(
                            parse(
                              form.watch("tanggalKontrak") ||
                                format(new Date(), "dd-MM-yyyy"),
                              "dd-MM-yyyy",
                              new Date()
                            ),
                            form.watch("masaPelaksanaan") || 0
                          ),
                          "dd-MM-yyyy"
                        )
                      : "-"}
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="px-2 py-1 bg-gray-100 rounded-md">
                      {1 + form.watch("masaPelaksanaan") || "0"} Hari
                    </span>
                  </div>
                </div>

                {/* Akhir Kontrak Addendum (Waktu, Non-Kesempatan) */}
                {form
                  .watch("addendum")
                  ?.filter((item) => !item.pemberianKesempatan)
                  .map((item, index, array) => {
                    const totalDays =
                      (form.watch("masaPelaksanaan") || 0) +
                      array
                        .slice(0, index + 1)
                        .reduce((acc, item) => acc + Number(item.hari || 0), 0);

                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-2 items-center text-sm"
                      >
                        <div className="col-span-4 font-medium">
                          Akhir Kontrak ADD {romanize(index + 1)}
                        </div>
                        <div className="col-span-5">
                          :{" "}
                          {form.watch("tanggalKontrak")
                            ? format(
                                addDays(
                                  parse(
                                    form.watch("tanggalKontrak") ||
                                      format(new Date(), "dd-MM-yyyy"),
                                    "dd-MM-yyyy",
                                    new Date()
                                  ),
                                  totalDays
                                ),
                                "dd-MM-yyyy"
                              )
                            : "-"}
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="px-2 py-1 bg-gray-100 rounded-md">
                            {item.hari} Hari
                          </span>
                        </div>
                      </div>
                    );
                  })}

                {/* Divider ketika ada addendum pemberian kesempatan */}
                {form
                  .watch("addendum")
                  ?.some((item) => item.pemberianKesempatan) && (
                  <div className="border-t border-gray-200 my-2"></div>
                )}

                {/* Addendum Pemberian Kesempatan */}
                {form
                  .watch("addendum")
                  ?.filter((item) => item.pemberianKesempatan)
                  .map((item, index, array) => {
                    const totalNonKesempatanDays =
                      (form.watch("masaPelaksanaan") || 0) +
                      (form.watch("addendum") ?? [])
                        .filter((add) => !add.pemberianKesempatan)
                        .reduce((acc, add) => acc + Number(add.hari || 0), 0);

                    const totalDays =
                      totalNonKesempatanDays +
                      array
                        .slice(0, index + 1)
                        .reduce((acc, add) => acc + Number(add.hari || 0), 0);

                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-2 items-center text-sm bg-gray-50 p-2 rounded-md"
                      >
                        <div className="col-span-4 font-medium">
                          Pemberian Kesempatan {romanize(index + 1)}
                        </div>
                        <div className="col-span-5">
                          :{" "}
                          {form.watch("tanggalKontrak")
                            ? format(
                                addDays(
                                  parse(
                                    form.watch("tanggalKontrak") ||
                                      format(new Date(), "dd-MM-yyyy"),
                                    "dd-MM-yyyy",
                                    new Date()
                                  ),
                                  totalDays
                                ),
                                "dd-MM-yyyy"
                              )
                            : "-"}
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="px-2 py-1 bg-white rounded-md">
                            {item.hari} Hari
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Supervisi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <Label>Konsultan Supervisi</Label>
                <Input {...form.register("konsultanSupervisi")} />
                {form.formState.errors.konsultanSupervisi && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.konsultanSupervisi.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Nomor Kontrak Supervisi</Label>
                <Input {...form.register("nomorKontrakSupervisi")} />
                {form.formState.errors.nomorKontrakSupervisi && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.nomorKontrakSupervisi.message}
                  </p>
                )}{" "}
              </div>

              <div className="space-y-2 mb-6">
                <Label>Nilai Kontrak Supervisi</Label>
                <Input
                  type="number"
                  {...form.register("nilaiKontrakSupervisi", {
                    valueAsNumber: true,
                  })}
                />
                {form.formState.errors.nilaiKontrakSupervisi && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.nilaiKontrakSupervisi.message}
                  </p>
                )}{" "}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <Label>Mulai Kontrak</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {form.watch("tanggalKontrakSupervisi") ? (
                          form.watch("tanggalKontrakSupervisi")
                        ) : (
                          <span className="text-muted-foreground">
                            DD-MM-YYYY
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        onSelect={(date) =>
                          form.setValue(
                            "tanggalKontrakSupervisi",
                            date ? format(date, "dd-MM-yyyy") : ""
                          )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.tanggalKontrakSupervisi && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.tanggalKontrakSupervisi.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>Masa Pelaksanaan ( Hari )</Label>
                  <Input
                    {...form.register("masaPelaksanaanSupervisi", {
                      valueAsNumber: true,
                    })}
                    type="number"
                  />
                  {form.formState.errors.masaPelaksanaanSupervisi && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.masaPelaksanaanSupervisi.message}
                    </p>
                  )}{" "}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Progress Kemajuan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Label className="block">Progress Fisik (%)</Label>
                <div className="flex flex-wrap gap-4 justify-between">
                  {["Rencana", "Realisasi", "Deviasi"].map((label, i) => {
                    const value = [
                      progressTotal?.rencana,
                      progressTotal?.realisasi,
                      progressTotal?.deviasi,
                    ][i];
                    return (
                      <div
                        key={label}
                        className="flex-1 min-w-[100px] flex flex-col items-center justify-center border rounded px-6 py-4"
                      >
                        <span className="font-medium">{label}</span>
                        <span className={`text-lg ${(value && value < 0) ? "text-red-500 font-bold" : "font-semibold"}`}>
                          {value ?? 0} %
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border rounded p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm mb-2 font-medium">
                      Progress Keuangan
                    </p>
                    <p className="text-lg font-semibold">
                      {form.watch("termin1") +
                        form.watch("uangMuka") +
                        form.watch("termin2") +
                        form.watch("termin3") +
                        form.watch("termin4") || 0}{" "}
                      %
                    </p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm mb-2 font-medium">
                      Keuangan Terbayar
                    </p>
                    <p className="text-lg font-semibold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(
                        Math.round(
                          (((form.watch("nilaiKontrak") || 0) *
                            (form.watch("uangMuka") || 0)) /
                            100 +
                            ((form.watch("nilaiKontrak") || 0) *
                              (form.watch("termin1") || 0)) /
                              100 +
                            ((form.watch("nilaiKontrak") || 0) *
                              (form.watch("termin2") || 0)) /
                              100 +
                            ((form.watch("nilaiKontrak") || 0) *
                              (form.watch("termin3") || 0)) /
                              100 +
                            ((form.watch("nilaiKontrak") || 0) *
                              (form.watch("termin4") || 0)) /
                              100) *
                            100
                        ) / 100
                      )}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <Label className="text-xs" htmlFor="uangMuka">
                    Uang Muka
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Percent className="h-4 w-4" />
                      </div>
                      <Input
                        id="uangMuka"
                        className="h-8"
                        type="number"
                        {...form.register("uangMuka", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <Input
                      className="h-8"
                      disabled
                      value={
                        ((form.watch("nilaiKontrak") || 0) *
                          (form.watch("uangMuka") || 0)) /
                        100
                      }
                    />
                  </div>
                  {form.formState.errors.uangMuka && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.uangMuka.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <Label className="text-xs" htmlFor="termin1">
                    Termin 1
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Percent className="h-4 w-4" />
                      </div>
                      <Input
                        id="termin1"
                        className="h-8"
                        type="number"
                        {...form.register("termin1", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <Input
                      className="h-8"
                      disabled
                      value={
                        ((form.watch("nilaiKontrak") || 0) *
                          (form.watch("termin1") || 0)) /
                        100
                      }
                    />
                  </div>
                  {form.formState.errors.termin1 && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.termin1.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <Label className="text-xs" htmlFor="termin2">
                    Termin 2
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Percent className="h-4 w-4" />
                      </div>
                      <Input
                        id="termin2"
                        className="h-8"
                        type="number"
                        {...form.register("termin2", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <Input
                      className="h-8"
                      disabled
                      value={
                        ((form.watch("nilaiKontrak") || 0) *
                          (form.watch("termin2") || 0)) /
                        100
                      }
                    />
                  </div>
                  {form.formState.errors.termin2 && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.termin2.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <Label className="text-xs" htmlFor="termin3">
                    Termin 3
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Percent className="h-4 w-4" />
                      </div>
                      <Input
                        id="termin3"
                        className="h-8"
                        type="number"
                        {...form.register("termin3", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <Input
                      className="h-8"
                      disabled
                      value={
                        ((form.watch("nilaiKontrak") || 0) *
                          (form.watch("termin3") || 0)) /
                        100
                      }
                    />
                  </div>
                  {form.formState.errors.termin3 && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.termin3.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <Label className="text-xs" htmlFor="termin4">
                    Termin 4
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Percent className="h-4 w-4" />
                      </div>
                      <Input
                        id="termin4"
                        className="h-8"
                        type="number"
                        {...form.register("termin4", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <Input
                      className="h-8"
                      disabled
                      value={
                        ((form.watch("nilaiKontrak") || 0) *
                          (form.watch("termin4") || 0)) /
                        100
                      }
                    />
                  </div>
                  {form.formState.errors.termin4 && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.termin4.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Dokumentasi Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded p-4 text-center">
              <p className="text-sm mb-2">Foto Dokumentasi 0%</p>
              <Button variant="ghost" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Upload Foto
              </Button>
            </div>
            <div className="border rounded p-4 text-center">
              <p className="text-sm mb-2">Foto Dokumentasi 50%</p>
              <Button variant="ghost" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Upload Foto
              </Button>
            </div>
            <div className="border rounded p-4 text-center">
              <p className="text-sm mb-2">Foto Dokumentasi 100%</p>
              <Button variant="ghost" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Upload Foto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {type !== "detail" && (
        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" className="mr-4">
            Cancel
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save Contract
          </Button>
        </div>
      )}
    </div>
  );
}
