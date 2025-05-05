import { z } from "zod";

export const LocationCreateSchema = z.object({
  contractId: z.string().uuid({ message: "Contract ID harus berupa UUID yang valid" }),
  kota: z.string().nullable().optional(),
  distrik: z.string().nullable().optional(),
  kampung: z.string().nullable().optional(),
  koordinatAwal: z.string().nullable().optional(),
  koordinatAkhir: z.string().nullable().optional(),
});

export const LocationUpdateSchema = LocationCreateSchema.partial();

export const LocationResponseSchema = LocationCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type LocationCreate = z.infer<typeof LocationCreateSchema>;
export type LocationUpdate = z.infer<typeof LocationUpdateSchema>;
export type LocationResponse = z.infer<typeof LocationResponseSchema>;