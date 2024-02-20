import { z } from "zod";

import { loginSchema, signUpSchema } from "@/lib/zod/schema";

// Subcategory
export interface TSubcategory {
  _id?: string;
  name: string;
}

// Category
export interface TCategory {
  _id?: string;
  name: string;
  sub: TSubcategory[]; 
}

// Author
export interface TAuthor {
  _id?: string;
  name: string;
  image: string;
  articles: string[]; 
}

// Article
export interface TImage {
  url: string;
  legend: string;
}

export interface TArticle {
  _id?: string;
  title: string;
  slug: string;
  content: string[];
  category: {
    id: string;
    slug: string;
  };
  subcategory?: {
    id: string;
    slug: string;
  };
  author:  TAuthor ;
  images: TImage[];
  createdAt: Date; 
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  query?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
}

export interface IGetArticlesResponse {
  data?: TArticle[]; 
  totalPages: number;
}







// SESSION
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

///////////////



