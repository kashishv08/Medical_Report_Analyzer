import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(), // Clerk user ID
  email: z.string().email(), // Must be valid email
  name: z.string().min(1, "Name required"),
  dob: z.string().optional(), // ISO date string (yyyy-mm-dd)
});
