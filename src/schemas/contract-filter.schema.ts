import { z } from "zod";
import { PaginationSchema } from "./pagination.schema";

export const ContractFilterSchema = PaginationSchema.extend({
  search: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  sumberDana: z.string().optional(),
  hasKendala: z.boolean().optional(),
  sortBy: z.enum([
    'namaPaket', 
    'tanggalKontrak', 
    'nilaiKontrak',
    'createdAt'
  ]).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
}).refine(data => {
  if (data.startDate && data.endDate) {
    return data.startDate <= data.endDate;
  }
  return true;
}, {
  message: "Start date must be before end date",
  path: ["startDate"]
});

export type ContractFilter = z.infer<typeof ContractFilterSchema>;