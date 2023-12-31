import { z } from "zod";

export const Loginschema = z.object({
    email: z.string().email("Invalid email format").min(1),
    password: z.string().regex(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$")).min(8, "Password must be at least 8 characters"),
});

export const Signupschema = z.object({
    email: z.string().email("Invalid email format").min(1),
    name: z.string().min(1, "Name is mandatory"),
    password: z.string().regex(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$")).min(8, "Password must be at least 8 characters"),
    cpassword: z.string().regex(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$")).min(8, "Password must be at least 8 characters"),
});


export const Verifyschema = z.object({
    email: z.string().email("Invalid email format").min(1),
    otp: z.string().min(6, "OTP must be at least 6 characters"),
});

export const Forgetschema = z.object({
    email: z.string().email("Invalid email format").min(1),
});

export const Resetschema = z.object({
    password: z.string().regex(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$")).min(8, "Password must be at least 8 characters"),
    cpassword: z.string().regex(new RegExp("^[a-zA-Z0-9!@#$%^&*()_]{3,30}$")).min(8, "Password must be at least 8 characters"),
});