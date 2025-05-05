import { z } from "zod";
import { UserResponseSchema } from "./user.schema";

export const LoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
});

export const LoginResponseSchema = z.object({
  user: UserResponseSchema,
  token: z.string(),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;