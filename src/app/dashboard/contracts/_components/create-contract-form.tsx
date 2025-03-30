"use client"
import { createContract } from "@/actions/contract";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateContractSchema,
  CreateContractType,
} from "@/schemas/contractSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateContractDialog() {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateContractType>({
    resolver: zodResolver(CreateContractSchema),
    defaultValues: {
      namaPaket: "",
      kabupatenKota: "",
      distrik: "",
      kampung: "",
      titikKoordinat: "",
      
      pejabatPembuatKomitmen: "",
      nipPejabatPembuatKomitmen: "",
      
      nomorKontrak: "",
      namaPenyedia: "",
      
      nilaiKontrak: 0,
      nilaiAnggaran: 0,
      sumberDana: "",
      
      tanggalKontrak: new Date(),
      
      volumeKontrak: 0,
      satuanKontrak: "",
      
      korwaslap: "",
      nipKorwaslap: "",
      
      pengawasLapangan: "",
      nipPengawasLapangan: "",
      
      hasilProdukAkhir: "",
      progresFisik: 0,
      progresKeuangan: 0,
      
      keuanganTerbayar: 0,
      volumeCapaian: 0,
      satuanCapaian: "",
    },
  });

  const onSubmit = async (values: CreateContractType) => {
    setLoading(true);
    const formData = new FormData();
    
    // Append all form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    try {
      const res = await createContract(formData);
      setLoading(false);

      if (res.success) {
        toast.success("Kontrak berhasil dibuat!");
        form.reset();
      } else {
        toast.error(res.error || "Terjadi kesalahan");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Terjadi kesalahan sistem");
      console.error(error);
    }
  };

  return (

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bagian Data Paket */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Paket</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="namaPaket">Nama Paket</Label>
              <Input id="namaPaket" {...form.register("namaPaket")} />
              {form.formState.errors.namaPaket && (
                <p className="text-red-500 text-sm">{form.formState.errors.namaPaket.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="kabupatenKota">Kabupaten/Kota</Label>
                <Input id="kabupatenKota" {...form.register("kabupatenKota")} />
                {form.formState.errors.kabupatenKota && (
                  <p className="text-red-500 text-sm">{form.formState.errors.kabupatenKota.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="distrik">Distrik</Label>
                <Input id="distrik" {...form.register("distrik")} />
                {form.formState.errors.distrik && (
                  <p className="text-red-500 text-sm">{form.formState.errors.distrik.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="kampung">Kampung</Label>
                <Input id="kampung" {...form.register("kampung")} />
                {form.formState.errors.kampung && (
                  <p className="text-red-500 text-sm">{form.formState.errors.kampung.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="titikKoordinat">Titik Koordinat (Opsional)</Label>
              <Input id="titikKoordinat" {...form.register("titikKoordinat")} />
            </div>
          </div>
          
          {/* Bagian Pejabat Pembuat Komitmen */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pejabat Pembuat Komitmen</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pejabatPembuatKomitmen">Nama Pejabat</Label>
                <Input id="pejabatPembuatKomitmen" {...form.register("pejabatPembuatKomitmen")} />
                {form.formState.errors.pejabatPembuatKomitmen && (
                  <p className="text-red-500 text-sm">{form.formState.errors.pejabatPembuatKomitmen.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="nipPejabatPembuatKomitmen">NIP</Label>
                <Input id="nipPejabatPembuatKomitmen" {...form.register("nipPejabatPembuatKomitmen")} />
                {form.formState.errors.nipPejabatPembuatKomitmen && (
                  <p className="text-red-500 text-sm">{form.formState.errors.nipPejabatPembuatKomitmen.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Bagian Kontrak */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Kontrak</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nomorKontrak">Nomor Kontrak</Label>
                <Input id="nomorKontrak" {...form.register("nomorKontrak")} />
                {form.formState.errors.nomorKontrak && (
                  <p className="text-red-500 text-sm">{form.formState.errors.nomorKontrak.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="namaPenyedia">Nama Penyedia</Label>
                <Input id="namaPenyedia" {...form.register("namaPenyedia")} />
                {form.formState.errors.namaPenyedia && (
                  <p className="text-red-500 text-sm">{form.formState.errors.namaPenyedia.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nilaiKontrak">Nilai Kontrak (Rp)</Label>
                <Input 
                  id="nilaiKontrak" 
                  type="number" 
                  {...form.register("nilaiKontrak", { valueAsNumber: true })} 
                />
                {form.formState.errors.nilaiKontrak && (
                  <p className="text-red-500 text-sm">{form.formState.errors.nilaiKontrak.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="nilaiAnggaran">Nilai Anggaran (Rp)</Label>
                <Input 
                  id="nilaiAnggaran" 
                  type="number" 
                  {...form.register("nilaiAnggaran", { valueAsNumber: true })} 
                />
                {form.formState.errors.nilaiAnggaran && (
                  <p className="text-red-500 text-sm">{form.formState.errors.nilaiAnggaran.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="sumberDana">Sumber Dana</Label>
                <Input id="sumberDana" {...form.register("sumberDana")} />
                {form.formState.errors.sumberDana && (
                  <p className="text-red-500 text-sm">{form.formState.errors.sumberDana.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tanggalKontrak">Tanggal Kontrak</Label>
                <DatePicker 
                  selected={form.getValues("tanggalKontrak")} 
                  onSelect={(date) => date && form.setValue("tanggalKontrak", date)} 
                />
                {form.formState.errors.tanggalKontrak && (
                  <p className="text-red-500 text-sm">{form.formState.errors.tanggalKontrak.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="volumeKontrak">Volume Kontrak</Label>
                <Input 
                  id="volumeKontrak" 
                  type="number" 
                  {...form.register("volumeKontrak", { valueAsNumber: true })} 
                />
                {form.formState.errors.volumeKontrak && (
                  <p className="text-red-500 text-sm">{form.formState.errors.volumeKontrak.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="satuanKontrak">Satuan Kontrak</Label>
                <Input id="satuanKontrak" {...form.register("satuanKontrak")} />
                {form.formState.errors.satuanKontrak && (
                  <p className="text-red-500 text-sm">{form.formState.errors.satuanKontrak.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Bagian Pengawas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Pengawas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="korwaslap">Koordinator Pengawas Lapangan</Label>
                <Input id="korwaslap" {...form.register("korwaslap")} />
                {form.formState.errors.korwaslap && (
                  <p className="text-red-500 text-sm">{form.formState.errors.korwaslap.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="nipKorwaslap">NIP Koordinator</Label>
                <Input id="nipKorwaslap" {...form.register("nipKorwaslap")} />
                {form.formState.errors.nipKorwaslap && (
                  <p className="text-red-500 text-sm">{form.formState.errors.nipKorwaslap.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pengawasLapangan">Pengawas Lapangan</Label>
                <Input id="pengawasLapangan" {...form.register("pengawasLapangan")} />
                {form.formState.errors.pengawasLapangan && (
                  <p className="text-red-500 text-sm">{form.formState.errors.pengawasLapangan.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="nipPengawasLapangan">NIP Pengawas</Label>
                <Input id="nipPengawasLapangan" {...form.register("nipPengawasLapangan")} />
                {form.formState.errors.nipPengawasLapangan && (
                  <p className="text-red-500 text-sm">{form.formState.errors.nipPengawasLapangan.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Bagian Progres (Opsional) */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Progres (Opsional)</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="hasilProdukAkhir">Hasil Produk Akhir</Label>
              <Input id="hasilProdukAkhir" {...form.register("hasilProdukAkhir")} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="progresFisik">Progres Fisik (%)</Label>
                <Input 
                  id="progresFisik" 
                  type="number" 
                  min="0" 
                  max="100" 
                  {...form.register("progresFisik", { valueAsNumber: true })} 
                />
                {form.formState.errors.progresFisik && (
                  <p className="text-red-500 text-sm">{form.formState.errors.progresFisik.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="progresKeuangan">Progres Keuangan (%)</Label>
                <Input 
                  id="progresKeuangan" 
                  type="number" 
                  min="0" 
                  max="100" 
                  {...form.register("progresKeuangan", { valueAsNumber: true })} 
                />
                {form.formState.errors.progresKeuangan && (
                  <p className="text-red-500 text-sm">{form.formState.errors.progresKeuangan.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="keuanganTerbayar">Keuangan Terbayar (Rp)</Label>
                <Input 
                  id="keuanganTerbayar" 
                  type="number" 
                  {...form.register("keuanganTerbayar", { valueAsNumber: true })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="volumeCapaian">Volume Capaian</Label>
                <Input 
                  id="volumeCapaian" 
                  type="number" 
                  {...form.register("volumeCapaian", { valueAsNumber: true })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="satuanCapaian">Satuan Capaian</Label>
                <Input id="satuanCapaian" {...form.register("satuanCapaian")} />
              </div>
            </div>
          </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              Buat Kontrak Baru
            </Button>
        </form>
  )
}