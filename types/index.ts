import { TArticle } from "@/lib/models/Article";
import { loginSchema, signUpSchema } from "@/lib/zod/schema";
import { z } from "zod";

// Define Custom session user interface 
export interface TCustomSessionUser {
    _id: string;
    provider: string;
    role: string;
}
 
// based on Zod schema
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;

// jwt payload
export interface TokenPayload {
    user: TSignUpSchema;
}
  

export interface VerifyPageProps {
    searchParams: {
      token?: string;
    };
}
  

///////////////


export interface TSubcategory {
  _id: string;
  name: string;

  // Add other properties if your subcategory data has more fields
}

export interface TCategory {
  _id: string;
  name: string;
  sub: TSubcategory[]; // Optional subcategories

  // Add other properties if your category data has more fields
}

export interface MainCardProps {
  article: TArticle;
}

export interface IGetArticlesResponse {
  msg: string;
  error?: string;
  data?: TArticle[]; // The array of articles
  totalPages: number;
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  query?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
}

