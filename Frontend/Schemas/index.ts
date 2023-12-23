import { z, ZodError } from "zod";

export const Loginschema = z.object({
    email: z.string().email("Invalid email format").min(1),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Signupschema = z.object({
    email: z.string().email("Invalid email format").min(1),
    name: z.string().min(1, "Name is mandatory"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    cpassword: z.string().min(6, "Password must be at least 6 characters"),
});