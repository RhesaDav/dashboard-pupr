import { z } from "zod";

export const AddendumCreateSchema = z.object({
  contractId: z.string().uuid({ message: "Contract ID harus berupa UUID yang valid" }),
  name: z.string().nullable().optional(),
  tipe: z.string().nullable().optional(),
  hari: z.number().nullable().optional(),
  tanggal: z.date().nullable().optional(),
  alasan: z.string().nullable().optional(),
  volume: z.string().nullable().optional(),
  satuan: z.string().nullable().optional(),
  pemberianKesempatan: z.boolean().default(false),
});

export const AddendumUpdateSchema = AddendumCreateSchema.partial();

export const AddendumResponseSchema = AddendumCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AddendumCreate = z.infer<typeof AddendumCreateSchema>;
export type AddendumUpdate = z.infer<typeof AddendumUpdateSchema>;
export type AddendumResponse = z.infer<typeof AddendumResponseSchema>;