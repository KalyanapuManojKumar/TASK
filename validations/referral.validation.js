import { z } from "zod";

export const createReferralSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),

  email: z.string().email("Invalid email"),

  contactNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Contact number must be 10 digits"),

  referralType: z.string().min(1, "Referral type is required"),

  clientProfession: z.string().min(1, "Client profession is required"),

  propertyType: z.string().min(1, "Property type is required"),

  amenities: z.array(z.string()).optional(),

  budgetRange: z.string().optional(),

  clientDetails: z
    .string()
    .min(5, "Client details must be at least 5 characters"),
});
