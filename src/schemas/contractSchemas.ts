import { z } from "zod";

export const CreateContractSchema = z.object({
  // namaPaket: z.string().min(1, { message: "Nama paket tidak boleh kosong" }),
  // namaPenyedia: z
  //   .string()
  //   .min(1, { message: "Nama penyedia tidak boleh kosong" }),
  // kota: z.string().min(1, { message: "Kota tidak boleh kosong" }),
  // distrik: z.string().min(1, { message: "Distrik tidak boleh kosong" }),
  // kampung: z.string().min(1, { message: "Kampung tidak boleh kosong" }),
  // koordinatAwal: z
  //   .string()
  //   .min(1, { message: "Koordinat awal tidak boleh kosong" }),
  // koordinatAkhir: z
  //   .string()
  //   .min(1, { message: "Koordinat akhir tidak boleh kosong" }),
  // ppk: z.string().min(1, { message: "PPK tidak boleh kosong" }),
  // nipPPK: z.string().min(1, { message: "NIP PPK tidak boleh kosong" }),
  // korwaslap: z.string().min(1, { message: "Korwaslap tidak boleh kosong" }),
  // nipKorwaslap: z
  //   .string()
  //   .min(1, { message: "NIP Korwaslap tidak boleh kosong" }),
  // pengawasLapangan: z
  //   .string()
  //   .min(1, { message: "Pengawas lapangan tidak boleh kosong" }),
  // nipPengawasLapangan: z
  //   .string()
  //   .min(1, { message: "NIP Pengawas lapangan tidak boleh kosong" }),
  // paguAnggaran: z
  //   .string()
  //   .min(1, { message: "Pagu anggaran tidak boleh kosong" }),
  // nilaiKontrak: z
  //   .number()
  //   .min(1, { message: "Nilai kontrak harus lebih dari 0" }),
  // sumberDana: z.string().min(1, { message: "Sumber dana tidak boleh kosong" }),
  // nomorKontrak: z
  //   .string()
  //   .min(1, { message: "Nomor kontrak tidak boleh kosong" }),
  // tanggalKontrak: z.string().min(1, { message: "Tanggal kontrak harus valid" }),
  // masaPelaksanaan: z
  //   .number()
  //   .min(1, { message: "Masa pelaksanaan harus lebih dari 0 hari" }),
  // volumeKontrak: z
  //   .string()
  //   .min(1, { message: "Volume kontrak tidak boleh kosong" }),
  // satuanKontrak: z
  //   .string()
  //   .min(1, { message: "Satuan kontrak tidak boleh kosong" }),
  // konsultanSupervisi: z
  //   .string()
  //   .min(1, { message: "Nama konsultan supervisi tidak boleh kosong" }),
  // nomorKontrakSupervisi: z
  //   .string()
  //   .min(1, { message: "Nomor kontrak supervisi tidak boleh kosong" }),
  // tanggalKontrakSupervisi: z
  //   .string()
  //   .min(1, { message: "Tanggal kontrak supervisi harus valid" }),
  // masaPelaksanaanSupervisi: z
  //   .number()
  //   .min(0, { message: "Masa pelaksanaan supervisi tidak boleh negatif" }),

  // hasAddendum: z.enum(["ada", "tidak ada"], {
  //   message: "Pilihan hanya bisa 'ada' atau 'tidak ada'",
  // }),

  // addendum: z
  //   .array(
  //     z.object({
  //       id: z.string().uuid({ message: "ID harus berupa UUID yang valid" }),
  //       name: z
  //         .string()
  //         .min(1, { message: "Nama addendum tidak boleh kosong" }),
  //       tipe: z
  //         .string()
  //         .min(1, { message: "Tipe addendum tidak boleh kosong" }),
  //       hari: z.string().nullable().optional(),
  //       volume: z.string().nullable().optional(),
  //       satuan: z.string().nullable().optional(),
  //       pemberianKesempatan: z.boolean().default(false),
  //     })
  //   )
  //   .optional(),

  // pemberianKesempatan: z.boolean().default(false),
  // hasilProdukAkhir: z
  //   .string()
  //   .min(1, { message: "Hasil produk akhir tidak boleh kosong" }),
  // dimensi: z.string().min(1, { message: "Dimensi tidak boleh kosong" }),
  // kendala: z.boolean().default(false),

  // permasalahan: z.string().optional(),
  // keterangan: z.string().optional(),

  // uangMuka: z
  //   .number()
  //   .min(0, { message: "Uang muka tidak boleh negatif" })
  //   .max(100, { message: "Uang muka maksimal 100" }),
  // termin1: z
  //   .number()
  //   .min(0, { message: "Termin 1 tidak boleh negatif" })
  //   .max(100, { message: "Termin 1 maksimal 100" }),
  // termin2: z
  //   .number()
  //   .min(0, { message: "Termin 2 tidak boleh negatif" })
  //   .max(100, { message: "Termin 2 maksimal 100" }),
  // termin3: z
  //   .number()
  //   .min(0, { message: "Termin 3 tidak boleh negatif" })
  //   .max(100, { message: "Termin 3 maksimal 100" }),
  // termin4: z
  //   .number()
  //   .min(0, { message: "Termin 4 tidak boleh negatif" })
  //   .max(100, { message: "Termin 4 maksimal 100" }),

  // dokumentasiAwal: z.string().optional(),
  // dokumentasiTengah: z.string().optional(),
  // dokumentasiAkhir: z.string().optional(),
  namaPaket: z.string().min(1, { message: "Nama paket tidak boleh kosong" }),
  namaPenyedia: z.string().optional(),
  kota: z.string().optional(),
  distrik: z.string().optional(),
  kampung: z.string().optional(),
  koordinatAwal: z.string().optional(),
  koordinatAkhir: z.string().optional(),
  ppk: z.string().optional(),
  nipPPK: z.string().optional(),
  korwaslap: z.string().optional(),
  nipKorwaslap: z.string().optional(),
  pengawasLapangan: z.string().optional(),
  nipPengawasLapangan: z.string().optional(),
  paguAnggaran: z.string().optional(),
  sumberDana: z.string().optional(),
  nomorKontrak: z.string().optional(),
  tanggalKontrak: z.string().optional(),
  masaPelaksanaan: z.number().optional().default(0),
  volumeKontrak: z.string().optional(),
  satuanKontrak: z.string().optional(),
  konsultanSupervisi: z.string().optional(),
  nomorKontrakSupervisi: z.string().optional(),
  nilaiKontrakSupervisi: z.number().optional().default(0),
  tanggalKontrakSupervisi: z.string().optional(),
  masaPelaksanaanSupervisi: z.number().optional().default(0),

  hasAddendum: z.enum(["ada", "tidak ada"]).optional().default("tidak ada"),

  addendum: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().nullable().optional(),
        tipe: z.string().nullable().optional(),
        hari: z.string().nullable().optional(),
        volume: z.string().nullable().optional(),
        satuan: z.string().nullable().optional(),
        pemberianKesempatan: z.boolean().optional().default(false),
      })
    )
    .optional(),

  pemberianKesempatan: z.boolean().optional().default(false),
  hasilProdukAkhir: z.string().optional(),
  dimensi: z.string().optional(),
  kendala: z.boolean().optional().default(false),
  permasalahan: z.string().optional(),
  keterangan: z.string().optional(),

  nilaiKontrak: z.number().min(1, { message: "Nilai kontrak harus lebih dari 0" }),
    uangMuka: z.number()
        .min(0, { message: "Uang muka (%) tidak boleh negatif" })
        .max(100, { message: "Uang muka (%) tidak boleh > 100"}),
    termin1: z.number()
        .min(0, { message: "Termin 1 (%) tidak boleh negatif" })
        .max(100, { message: "Termin 1 (%) tidak boleh > 100"}),
    termin2: z.number()
        .min(0, { message: "Termin 2 (%) tidak boleh negatif" })
        .max(100, { message: "Termin 2 (%) tidak boleh > 100"}),
    termin3: z.number()
        .min(0, { message: "Termin 3 (%) tidak boleh negatif" })
        .max(100, { message: "Termin 3 (%) tidak boleh > 100"}),
    termin4: z.number()
        .min(0, { message: "Termin 4 (%) tidak boleh negatif" })
        .max(100, { message: "Termin 4 (%) tidak boleh > 100"}),

  dokumentasiAwal: z.string().optional(),
  dokumentasiTengah: z.string().optional(),
  dokumentasiAkhir: z.string().optional(),
})

export const UpdateContractSchema = CreateContractSchema.extend({
  id: z.string().uuid(),
});

export const ContractIdSchema = z.object({
  id: z.string().uuid(),
});

export type CreateContractType = z.infer<typeof CreateContractSchema>;
export type UpdateContractType = z.infer<typeof UpdateContractSchema>;
export type ContractIdType = z.infer<typeof ContractIdSchema>