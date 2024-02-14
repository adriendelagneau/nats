import { loginSchema, registerSchema } from "@/lib/zod/schema";
import { z } from "zod";

// Define Custom session user interface 
export interface TCustomSessionUser {
    _id: string;
    provider: string;
    role: string;
}
 
// based on Zod schema
export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;

// jwt payload
export interface TokenPayload {
    user: TRegisterSchema;
}
  