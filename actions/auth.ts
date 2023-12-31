"use server";

import { Loginschema } from "@/Schemas";
import axios from "axios";
import * as z from "zod";

export const login = (values: z.infer<typeof Loginschema>) => {
    console.log(values);
    return;
}
