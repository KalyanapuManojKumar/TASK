import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),

  category: z.enum(["user", "agent", "admin"]).optional(),

  referralType: z.string().min(1),
  clientProfession: z.string().min(1),
  propertyType: z.string().min(1),

  amenities: z.array(z.string()).optional(),

  budgetRange: z.string().optional(),

  clientDetails: z.string().min(5),
});
