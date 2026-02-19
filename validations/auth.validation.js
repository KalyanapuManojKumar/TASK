import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),

  category: z.enum(["pg-hostel", "gated-community", "college"]).optional(),
});
