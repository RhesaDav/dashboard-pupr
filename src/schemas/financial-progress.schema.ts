import { z } from "zod";

export const FinancialProgressCreateSchema = z.object({
  contractId: z
    .string()
    .uuid({ message: "Contract ID harus berupa UUID yang valid" }),
  totalProgress: z.number().nonnegative().nullable().optional().default(0.0),
  totalPayment: z.number().nonnegative().nullable().optional().default(0.0),
  uangMuka: z
    .number()
    .min(0, "Tidak boleh negatif")
    .max(100, "Tidak boleh lebih dari 100%")
    .nullable()
    .optional()
    .default(0.0),
  termin1: z
    .number()
    .min(0, "Tidak boleh negatif")
    .max(100, "Tidak boleh lebih dari 100%")
    .nullable()
    .optional()
    .default(0.0),
  termin2: z
    .number()
    .min(0, "Tidak boleh negatif")
    .max(100, "Tidak boleh lebih dari 100%")
    .nullable()
    .optional()
    .default(0.0),
  termin3: z
    .number()
    .min(0, "Tidak boleh negatif")
    .max(100, "Tidak boleh lebih dari 100%")
    .nullable()
    .optional()
    .default(0.0),
  termin4: z
    .number()
    .min(0, "Tidak boleh negatif")
    .max(100, "Tidak boleh lebih dari 100%")
    .nullable()
    .optional()
    .default(0.0),
});

export const FinancialProgressUpdateSchema =
  FinancialProgressCreateSchema.partial();

export const FinancialProgressResponseSchema =
  FinancialProgressCreateSchema.extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

export type FinancialProgressCreate = z.infer<
  typeof FinancialProgressCreateSchema
>;
export type FinancialProgressUpdate = z.infer<
  typeof FinancialProgressUpdateSchema
>;
export type FinancialProgressResponse = z.infer<
  typeof FinancialProgressResponseSchema
>;
