import { z } from "zod";

export const ContractAccessCreateSchema = z.object({
  userId: z.string().uuid({ message: "User ID harus berupa UUID yang valid" }),
  contractId: z.string().uuid({ message: "Contract ID harus berupa UUID yang valid" }),
});

export type ContractAccessCreate = z.infer<typeof ContractAccessCreateSchema>;