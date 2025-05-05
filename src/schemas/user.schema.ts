import { z } from "zod";
import { RoleSchema } from "./role.schema";

export const UserCreateSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: RoleSchema.default("SUPERADMIN"),
});

export const UserUpdateSchema = UserCreateSchema.partial().omit({ password: true });

export const UserPasswordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "Password saat ini harus diisi"),
  newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
  confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine(
  data => data.newPassword === data.confirmPassword,
  {
    message: "Password baru dan konfirmasi password harus sama",
    path: ["confirmPassword"],
  }
);

export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: RoleSchema,
  lastLoggedIn: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserPasswordUpdate = z.infer<typeof UserPasswordUpdateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;