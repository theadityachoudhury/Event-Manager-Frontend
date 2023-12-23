import { Loginschema, Signupschema } from "@/Schemas";
import { z } from "zod";

export type loginFormData = z.infer<typeof Loginschema>;
export type signupFormData = z.infer<typeof Signupschema>;

