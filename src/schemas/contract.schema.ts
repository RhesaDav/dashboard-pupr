import { z } from "zod";
import { FinancialProgressCreateSchema, FinancialProgressResponseSchema } from "./financial-progress.schema";
import { LocationCreateSchema, LocationResponseSchema } from "./location.schema";
import { PhysicalProgressCreateSchema, PhysicalProgressResponseSchema } from "./physical-progress.schema";
import { AddendumCreateSchema, AddendumResponseSchema } from "./addendum.schema";
import { UserResponseSchema } from "./user.schema";

export const ContractCreateSchema = z.object({
  namaPaket: z.string().min(1, "Nama paket harus diisi"),
  namaPenyedia: z.string().nullable().optional(),
  ppk: z.string().nullable().optional(),
  nipPPK: z.string().nullable().optional(),
  korwaslap: z.string().nullable().optional(),
  nipKorwaslap: z.string().nullable().optional(),
  pengawasLapangan: z.string().nullable().optional(),
  nipPengawasLapangan: z.string().nullable().optional(),
  paguAnggaran: z.number().nonnegative().nullable().optional().default(0.0),
  nilaiKontrak: z.number().nonnegative().nullable().optional().default(0.0),
  sumberDana: z.string().nullable().optional(),
  nomorKontrak: z.string().nullable().optional(),
  tanggalKontrak: z.date().nullable().optional(),
  masaPelaksanaan: z.number().int().nonnegative().nullable().optional().default(0),
  tanggalSelesaiAwal: z.date().nullable().optional(),
  tanggalSelesaiAkhir: z.date().nullable().optional(),
  totalAddendumWaktu: z.number().optional().default(0),
  subKegiatan: z.string().nullable().optional(),
  volumeKontrak: z.string().nullable().optional(),
  satuanKontrak: z.string().nullable().optional(),
  konsultanSupervisi: z.string().nullable().optional(),
  nomorKontrakSupervisi: z.string().nullable().optional(),
  nilaiKontrakSupervisi: z.number().nonnegative().nullable().optional().default(0.0),
  tanggalKontrakSupervisi: z.date().nullable().optional(),
  masaPelaksanaanSupervisi: z.number().int().nonnegative().nullable().optional().default(0),
  hasilProdukAkhir: z.string().nullable().optional(),
  dimensi: z.string().nullable().optional(),
  dokumentasiAwal: z.string().nullable().optional(),
  dokumentasiTengah: z.string().nullable().optional(),
  dokumentasiAkhir: z.string().nullable().optional(),
  dokumenPendukung: z.string().nullable().optional(),
  hasAddendum: z.boolean().nullable().optional().default(false),
});

export const ContractUpdateSchema = ContractCreateSchema.partial();

export const ContractResponseSchema = ContractCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CompleteContractCreateSchema = ContractCreateSchema.extend({
  financialProgress: z.lazy(() => FinancialProgressCreateSchema.omit({ contractId: true })).optional(),
  location: z.lazy(() => LocationCreateSchema.omit({ contractId: true })).optional(),
  physicalProgress: z.array(z.lazy(() => PhysicalProgressCreateSchema.omit({ contractId: true }))).optional(),
  addendum: z.array(z.lazy(() => AddendumCreateSchema.omit({ contractId: true }))).optional(),
  accessUserIds: z.array(z.string().uuid()).optional(),
});

export const ContractWithRelationsResponseSchema = ContractResponseSchema.extend({
  financialProgress: z.lazy(() => FinancialProgressResponseSchema.nullable()),
  location: z.lazy(() => LocationResponseSchema.nullable()),
  physicalProgress: z.array(z.lazy(() => PhysicalProgressResponseSchema)),
  addendum: z.array(z.lazy(() => AddendumResponseSchema)),
  contractAccess: z.array(z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    user: z.lazy(() => UserResponseSchema),
  })),
});

export type ContractCreate = z.infer<typeof ContractCreateSchema>;
export type ContractUpdate = z.infer<typeof ContractUpdateSchema>;
export type ContractResponse = z.infer<typeof ContractResponseSchema>;
export type CompleteContractCreate = z.infer<typeof CompleteContractCreateSchema>;
export type ContractWithRelationsResponse = z.infer<typeof ContractWithRelationsResponseSchema>;