import { z } from "zod";

export const IdSchema = z.object({
  id: z.string().uuid({ message: "ID harus berupa UUID yang valid" }),
});
export type IdParam = z.infer<typeof IdSchema>;