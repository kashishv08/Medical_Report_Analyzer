import { z } from "zod";

export const subsPlanSchema = z
  .enum(["free", "monthly", "yearly"])
  .default("free");

export const UserSchema = z.object({
  id: z.string(), // Clerk user ID
  email: z.string().email(), // Must be valid email
  name: z.string().min(1, "Name required"),
  dob: z.string().optional().nullable(), // ISO date string (yyyy-mm-dd)
  subscription_plan: subsPlanSchema,
  stripe_subscription_id: z.string().nullable(),
  stripe_customer_id: z.string().nullable(),
  subscription_status: z.boolean().default(false),
  subscription_end: z.string().nullable(),
  subscription_start: z.string().nullable(),
});
