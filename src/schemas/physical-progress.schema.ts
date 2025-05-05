import { z } from "zod";

export const PhysicalProgressCreateSchema = z.object({
  contractId: z
    .string()
    .uuid({ message: "Contract ID harus berupa UUID yang valid" }),
  month: z.string().min(1, "Bulan harus diisi"),
  week: z
    .number()
    .int()
    .positive({ message: "Minggu harus berupa angka positif" }),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  rencana: z
    .number()
    .nonnegative({ message: "Nilai rencana tidak boleh negatif" })
    .min(0, "Nilai rencana tidak boleh negatif")
    .max(100, "Nilai rencana tidak boleh lebih dari 100%"),
  realisasi: z
    .number()
    .nonnegative({ message: "Nilai realisasi tidak boleh negatif" })
    .min(0, "Nilai realisasi tidak boleh negatif")
    .max(100, "Nilai realisasi tidak boleh lebih dari 100%"),
  deviasi: z.number(),
  bermasalah: z.boolean(),
  deskripsiMasalah: z.string().nullable().optional(),
  keterangan: z.string().nullable().optional()
});

export const PhysicalProgressUpdateSchema = PhysicalProgressCreateSchema.extend(
  {
    id: z.string().uuid(),
  }
);

export const PhysicalProgressResponseSchema =
  PhysicalProgressCreateSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

export type PhysicalProgressCreate = z.infer<
  typeof PhysicalProgressCreateSchema
>;
export type PhysicalProgressUpdate = z.infer<
  typeof PhysicalProgressUpdateSchema
>;
export type PhysicalProgressResponse = z.infer<
  typeof PhysicalProgressResponseSchema
>;
