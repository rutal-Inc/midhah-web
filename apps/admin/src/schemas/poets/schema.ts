import { z } from "zod";

export const poetSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  isPublished: z.boolean().optional(),
});
