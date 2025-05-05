import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(10),
});
export type Pagination = z.infer<typeof PaginationSchema>;