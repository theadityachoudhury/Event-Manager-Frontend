import { Forgetschema, Loginschema, Resetschema, Signupschema, Verifyschema } from "@/Schemas";
import { z } from "zod";

export type loginFormData = z.infer<typeof Loginschema>;
export type signupFormData = z.infer<typeof Signupschema>;
export type VerifyFormData = z.infer<typeof Verifyschema>;
export type ForgetFormData = z.infer<typeof Forgetschema>;
export type ResetFormData = z.infer<typeof Resetschema>;


export type User = {
    id: string;
    email: string;
    name: string;
    role: string;
    verified: boolean;
};