import { z } from 'zod';

// Password strength validation
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });

// Authentication schemas
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
});

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: passwordSchema,
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be less than 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(100, { message: "Full name must be less than 100 characters" })
});

// Profile update schema
export const profileUpdateSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(100, { message: "Full name must be less than 100 characters" })
    .optional(),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be less than 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
    .optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-\(\)]+$/, { message: "Please enter a valid phone number" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .optional()
    .nullable()
});

// Contact inquiry schema
export const contactInquirySchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be less than 100 characters" }),
  user_email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  user_phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-\(\)]+$/, { message: "Please enter a valid phone number" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .optional()
    .nullable(),
  dish_name: z
    .string()
    .trim()
    .min(1, { message: "Dish name is required" })
    .max(200, { message: "Dish name must be less than 200 characters" }),
  serving_size: z
    .string()
    .trim()
    .max(100, { message: "Serving size must be less than 100 characters" })
    .optional()
    .nullable(),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1" })
    .max(100, { message: "Quantity cannot exceed 100" }),
  special_requests: z
    .string()
    .trim()
    .max(1000, { message: "Special requests must be less than 1000 characters" })
    .optional()
    .nullable()
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;