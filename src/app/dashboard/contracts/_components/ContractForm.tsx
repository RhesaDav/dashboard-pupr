"use client";
import toast from "react-hot-toast";
import FormInput from "./FormInput";
import {
  createContract,
  editContract,
  getContractById,
} from "../actions/contract";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ContractFormData, ContractSchema } from "@/schemas/contractSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Contract } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface Props {
  type: "create" | "edit" | "detail";
  id?: string;
  initialData?: Contract
}
const ContactForm = ({ type, id, initialData }: Props) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContractFormData>({
    // resolver: zodResolver(ContractSchema),
    defaultValues: {
        namaPaket: initialData?.namaPaket || "",
        kabupatenKota: initialData?.kabupatenKota || "",
        distrik: initialData?.distrik || "",
        kampung: initialData?.kampung || "",
        titikKoordinat: initialData?.titikKoordinat || "",
  
        pejabatPembuatKomitmen: initialData?.pejabatPembuatKomitmen || "",
        nipPejabatPembuatKomitmen: initialData?.nipPejabatPembuatKomitmen || "",
  
        nomorKontrak: initialData?.nomorKontrak || "",
        namaPenyedia: initialData?.namaPenyedia || "",
  
        nilaiKontrak: initialData?.nilaiKontrak ?? 0,
        nilaiAnggaran: initialData?.nilaiAnggaran ?? 0,
        sumberDana: initialData?.sumberDana || "",
  
        tanggalKontrak: initialData?.tanggalKontrak ? new Date(initialData.tanggalKontrak) : new Date(),
  
        volumeKontrak: initialData?.volumeKontrak ?? 0,
        satuanKontrak: initialData?.satuanKontrak || "",
  
        korwaslap: initialData?.korwaslap || "",
        nipKorwaslap: initialData?.nipKorwaslap || "",
  
        pengawasLapangan: initialData?.pengawasLapangan || "",
        nipPengawasLapangan: initialData?.nipPengawasLapangan || "",
  
        hasilProdukAkhir: initialData?.hasilProdukAkhir || "",
        progresFisik: initialData?.progresFisik ?? 0,
        progresKeuangan: initialData?.progresKeuangan ?? 0,
  
        keuanganTerbayar: initialData?.keuanganTerbayar ?? 0,
        volumeCapaian: initialData?.volumeCapaian ?? 0,
        satuanCapaian: initialData?.satuanCapaian || "",  
    },
  });

  const onSubmit = async (data: ContractFormData) => {
    try {
      const submitData = {
        ...data,
        nilaiKontrak: String(data.nilaiKontrak) || "",
        nilaiAnggaran: String(data.nilaiAnggaran) || "",
        tanggalKontrak: String(data.tanggalKontrak),
        volumeKontrak: String(data.volumeKontrak.toString()) || "",
        progresFisik: String(data.progresFisik!.toString()) || "",
        progresKeuangan: String(data.progresKeuangan!.toString()) || "",
        keuanganTerbayar: String(data.keuanganTerbayar!.toString()) || "",
        volumeCapaian: String(data.volumeCapaian!.toString()) || "",

      };

      if (type === "edit" && id) {
        const result = await editContract(id, submitData);
        console.log(result)
        if (result.success) {
          toast.success("Kontrak berhasil diedit");
          router.push("/dashboard/contracts");
        } else {
          toast.error(result.details?.[0].message || "Gagal membuat kontrak");
        }
      } else {
        const result = await createContract(submitData);
        if (result.success) {
          toast.success("Kontrak berhasil dibuat");
          router.push("/dashboard/contracts");
        } else {
          toast.error(result.details?.[0].message || "Gagal membuat kontrak");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Terjadi kesalahan");
    }
  };

  if (type === "edit" && !initialData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {type === "create" ? "Buat Kontrak Baru" : type === "edit" ? "Edit Kontrak" : "Lihat Kontrak"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Data Kontrak Dasar
              </h2>
              <FormInput
                name="namaPaket"
                label="Nama Paket"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="kabupatenKota"
                label="Kabupaten/Kota"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="distrik"
                label="Distrik"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="kampung"
                label="Kampung"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="titikKoordinat"
                label="Titik Koordinat"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Data Pejabat
              </h2>
              <FormInput
                name="pejabatPembuatKomitmen"
                label="Pejabat Pembuat Komitmen"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="nipPejabatPembuatKomitmen"
                label="NIP Pejabat"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="nomorKontrak"
                label="Nomor Kontrak"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="tanggalKontrak"
                label="Tanggal Kontrak"
                type="date"
                control={control}
                errors={errors}
                disabled={type === "detail"}
                defaultValue={new Date()}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Detail Keuangan
              </h2>
              <FormInput
                name="namaPenyedia"
                label="Nama Penyedia"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="nilaiKontrak"
                label="Nilai Kontrak"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="nilaiAnggaran"
                label="Nilai Anggaran"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="sumberDana"
                label="Sumber Dana"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Volume dan Pengawasan
              </h2>
              <FormInput
                name="volumeKontrak"
                label="Volume Kontrak"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="satuanKontrak"
                label="Satuan Kontrak"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="korwaslap"
                label="Korwaslap"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="nipKorwaslap"
                label="NIP Korwaslap"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Pengawas Lapangan
              </h2>
              <FormInput
                name="pengawasLapangan"
                label="Nama Pengawas Lapangan"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="nipPengawasLapangan"
                label="NIP Pengawas Lapangan"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="hasilProdukAkhir"
                label="Hasil Produk Akhir"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Progres dan Capaian
              </h2>
              <FormInput
                name="progresFisik"
                label="Progres Fisik (%)"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="progresKeuangan"
                label="Progres Keuangan (%)"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="keuanganTerbayar"
                label="Keuangan Terbayar"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="volumeCapaian"
                label="Volume Capaian"
                type="number"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
              <FormInput
                name="satuanCapaian"
                label="Satuan Capaian"
                control={control}
                errors={errors}
                disabled={type === "detail"}
              />
            </div>
          </div>

        {type !== "detail" && (
          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              onClick={() => router.push("/contracts")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Kontrak"}
            </Button>
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
