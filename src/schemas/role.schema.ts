import { z } from "zod";

export const RoleSchema = z.enum(["ADMIN", "SUPERADMIN", "CONSULTANT"]);
export type Role = z.infer<typeof RoleSchema>;