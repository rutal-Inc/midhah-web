import { z } from "zod";

const startOfToday = new Date();
startOfToday.setDate(startOfToday.getDate());

export const deleteUserSchema = z.object({
  userId: z
    .number()
    .int("User ID must be a whole number")
    .min(1, "User ID is required"),
  reason: z
    .string()
    .min(1, "Reason is required")
    .max(255, "Reason is too long"),
  scheduledDeleteAt: z.date().min(startOfToday, "Date must be in the future"),
});
