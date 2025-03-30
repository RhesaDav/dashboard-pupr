import { z } from "zod";

export const ContractSchema = z.object({
  namaPaket: z.string().min(1, { message: "Nama Paket harus diisi" }),
  kabupatenKota: z.string().min(1, { message: "Kabupaten/Kota harus diisi" }),
  distrik: z.string().min(1, { message: "Distrik harus diisi" }),
  kampung: z.string().min(1, { message: "Kampung harus diisi" }),
  titikKoordinat: z.string().optional(),

  pejabatPembuatKomitmen: z.string().min(1, { message: "Pejabat Pembuat Komitmen harus diisi" }),
  nipPejabatPembuatKomitmen: z.string().min(1, { message: "NIP Pejabat Pembuat Komitmen harus diisi" }),

  nomorKontrak: z.string().min(1, { message: "Nomor Kontrak harus diisi" }),
  namaPenyedia: z.string().min(1, { message: "Nama Penyedia harus diisi" }),

  nilaiKontrak: z
    .string()
    .min(1, { message: "Nilai Kontrak harus diisi" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Nilai Kontrak harus berupa angka positif",
    }),

  nilaiAnggaran: z
    .string()
    .min(1, { message: "Nilai Anggaran harus diisi" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Nilai Anggaran harus berupa angka positif",
    }),

  sumberDana: z.string().min(1, { message: "Sumber Dana harus diisi" }),

  tanggalKontrak: z
    .string()
    .min(1, { message: "Tanggal Kontrak harus diisi" })
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Tanggal Kontrak tidak valid, format harus berupa tanggal",
    }),

  volumeKontrak: z
    .string()
    .min(1, { message: "Volume Kontrak harus diisi" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Volume Kontrak harus berupa angka positif",
    }),

  satuanKontrak: z.string().min(1, { message: "Satuan Kontrak harus diisi" }),

  korwaslap: z.string().min(1, { message: "Korwaslap harus diisi" }),
  nipKorwaslap: z.string().min(1, { message: "NIP Korwaslap harus diisi" }),

  pengawasLapangan: z.string().min(1, { message: "Pengawas Lapangan harus diisi" }),
  nipPengawasLapangan: z.string().min(1, { message: "NIP Pengawas Lapangan harus diisi" }),

  hasilProdukAkhir: z.string().optional(),

  progresFisik: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 0))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Progres Fisik harus berupa angka antara 0% - 100%",
    }),

  progresKeuangan: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 0))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Progres Keuangan harus berupa angka antara 0% - 100%",
    }),

  keuanganTerbayar: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 0))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Keuangan Terbayar harus berupa angka positif",
    }),

  volumeCapaian: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 0))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Volume Capaian harus berupa angka positif",
    }),

  satuanCapaian: z.string().optional(),
});


export type ContractFormData = z.infer<typeof ContractSchema>;
