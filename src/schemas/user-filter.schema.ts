import { z } from "zod";
import { PaginationSchema } from "./pagination.schema";
import { RoleSchema } from "./role.schema";

export const UserFilterSchema = z.object({
  search: z.string().optional(),
  role: RoleSchema.optional(),
}).merge(PaginationSchema);

export type UserFilter = z.infer<typeof UserFilterSchema>;