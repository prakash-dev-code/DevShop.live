import { z } from "zod";

// ✅ Sign In Schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Sign Up Schema

export const signUpSchema = z
  .object({
    name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should not contain numbers or special characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// ✅ Export inferred types at the bottom (optional)
export type AuthSchemas = {
  SignInSchema: z.infer<typeof signInSchema>;
  SignUpSchema: z.infer<typeof signUpSchema>;
};
