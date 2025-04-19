import { z } from "zod";

export const CreateContractSchema = z.object({
  namaPaket: z.string().min(1, "Nama paket is required"),
  namaPenyedia: z.string().optional().nullable(),

  // Officials
  ppk: z.string().optional().nullable(),
  nipPPK: z.string().optional().nullable(),
  korwaslap: z.string().optional().nullable(),
  nipKorwaslap: z.string().optional().nullable(),
  pengawasLapangan: z.string().optional().nullable(),
  nipPengawasLapangan: z.string().optional().nullable(),

  // Financial details
  paguAnggaran: z.string().optional().nullable(),
  nilaiKontrak: z.number().optional().default(0.0),
  sumberDana: z.string().optional().nullable(),

  // Contract details
  nomorKontrak: z.string().optional().nullable(),
  tanggalKontrak:z.string().optional().nullable(),
  masaPelaksanaan: z.number().optional().default(0),
  subKegiatan: z.string().optional().nullable(),
  volumeKontrak: z.string().optional().nullable(),
  satuanKontrak: z.string().optional().nullable(),

  // Supervision details
  konsultanSupervisi: z.string().optional().nullable(),
  nomorKontrakSupervisi: z.string().optional().nullable(),
  nilaiKontrakSupervisi: z.number().optional().default(0.0),
  tanggalKontrakSupervisi: z.string().optional().nullable(),
  masaPelaksanaanSupervisi: z.number().optional().default(0),

  // Project status and completion
  pemberianKesempatan: z.boolean().optional().default(false),
  hasilProdukAkhir: z.string().optional().nullable(),
  dimensi: z.string().optional().nullable(),
  kendala: z.boolean().optional().default(false),
  permasalahan: z.string().optional().nullable(),
  keterangan: z.string().optional().nullable(),

  // Documentation
  dokumentasiAwal: z.string().optional().nullable(),
  dokumentasiTengah: z.string().optional().nullable(),
  dokumentasiAkhir: z.string().optional().nullable(),

  // Timestamps for tracking progression
  startDate: z.string().optional().nullable().transform(val => val ? new Date(val) : null),
  endDate: z.string().optional().nullable().transform(val => val ? new Date(val) : null),

  // Addendum handling
  hasAddendum: z.boolean().optional().default(false),

  // Related models
  location: z.object({
    kota: z.string().optional().nullable(),
    distrik: z.string().optional().nullable(),
    kampung: z.string().optional().nullable(),
    koordinatAwal: z.string().optional().nullable(),
    koordinatAkhir: z.string().optional().nullable(),
  }).optional(),

  financialProgress: z.object({
    totalProgress: z.number().optional().default(0.0),
    totalPayment: z.number().optional().default(0.0),
    uangMuka: z.number().optional().default(0.0),
    termin1: z.number().optional().default(0.0),
    termin2: z.number().optional().default(0.0),
    termin3: z.number().optional().default(0.0),
    termin4: z.number().optional().default(0.0),
  }).optional(),

  // Initial physical progress if needed
  physicalProgress: z.array(
    z.object({
      month: z.string(),
      week: z.number(),
      startDate: z.string().optional().nullable().transform(val => val ? new Date(val) : null),
      endDate: z.string().optional().nullable().transform(val => val ? new Date(val) : null),
      rencana: z.number(),
      realisasi: z.number(),
      deviasi: z.number(),
    })
  ).optional(),

  // Initial addendums if needed
  addendum: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      tipe: z.string().optional().nullable(),
      hari: z.string().optional().nullable(),
      volume: z.string().optional().nullable(),
      satuan: z.string().optional().nullable(),
      pemberianKesempatan: z.boolean().default(false),
    })
  ).optional(),

  // Access control
  contractAccess: z.array(
    z.object({
      userId: z.string().uuid(),
    })
  ).optional(),
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