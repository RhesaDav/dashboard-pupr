import { z } from "zod";

export const CreateContractSchema = z.object({
  namaPaket: z.string().min(1, "Nama paket tidak boleh kosong"),
  kabupatenKota: z.string().min(1, "Kabupaten/kota tidak boleh kosong"),
  distrik: z.string().min(1, "Distrik tidak boleh kosong"),
  kampung: z.string().min(1, "Kampung tidak boleh kosong"),
  titikKoordinat: z.string().optional(),

  pejabatPembuatKomitmen: z.string().min(1, "Pejabat Pembuat Komitmen tidak boleh kosong"),
  nipPejabatPembuatKomitmen: z.string().min(1, "NIP Pejabat Pembuat Komitmen tidak boleh kosong"),

  nomorKontrak: z.string().min(1, "Nomor kontrak tidak boleh kosong"),
  namaPenyedia: z.string().min(1, "Nama penyedia tidak boleh kosong"),

  nilaiKontrak: z.number().positive("Nilai kontrak harus lebih dari 0"),
  nilaiAnggaran: z.number().positive("Nilai anggaran harus lebih dari 0"),
  sumberDana: z.string().min(1, "Sumber dana tidak boleh kosong"),

  tanggalKontrak: z.coerce.date(),

  volumeKontrak: z.number().positive("Volume kontrak harus lebih dari 0"),
  satuanKontrak: z.string().min(1, "Satuan kontrak tidak boleh kosong"),

  korwaslap: z.string().min(1, "Koordinator Pengawas Lapangan tidak boleh kosong"),
  nipKorwaslap: z.string().min(1, "NIP Koordinator Pengawas Lapangan tidak boleh kosong"),

  pengawasLapangan: z.string().min(1, "Pengawas Lapangan tidak boleh kosong"),
  nipPengawasLapangan: z.string().min(1, "NIP Pengawas Lapangan tidak boleh kosong"),

  hasilProdukAkhir: z.string().optional(),
  progresFisik: z.number().min(0).max(100).optional(),
  progresKeuangan: z.number().min(0).max(100).optional(),

  keuanganTerbayar: z.number().optional(),
  volumeCapaian: z.number().optional(),
  satuanCapaian: z.string().optional(),

});

export const UpdateContractSchema = CreateContractSchema.extend({
  id: z.string().uuid(),
});

export const ContractIdSchema = z.object({
  id: z.string().uuid(),
});

export type CreateContractType = z.infer<typeof CreateContractSchema>;
export type UpdateContractType = z.infer<typeof UpdateContractSchema>;
export type ContractIdType = z.infer<typeof ContractIdSchema>