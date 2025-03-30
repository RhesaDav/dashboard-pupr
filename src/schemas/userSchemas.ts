import { UserRole } from "@prisma/client";
import { z } from "zod";

export const UserRoleEnum = z.enum(["ADMIN", "USER"]);

export const CreateUserSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

export const UpdateUserSchema = CreateUserSchema.extend({
  id: z.string().uuid(),
});

export const UserIdSchema = z.object({
  id: z.string().uuid(),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
export type UserIdType = z.infer<typeof UserIdSchema>;
