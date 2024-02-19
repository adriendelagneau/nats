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

// Article
export interface TContent {
  title: string;
  text: string;
}

export interface TImage {
  url: string;
  legend: string;
}

export interface TArticle  {
  _id?: string;
  title: string;
  content: TContent[];
  category: TCategory
  subcategory?: TSubcategory
  author: string;
  images: TImage[];
  createdAt: Date; 
}


///
export interface GetArticlesParams {
  page?: number;
  limit?: number;
  query?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
}


export interface IGetArticlesResponse {
  data?: TArticle[]; // The array of articles
  totalPages: number;
}


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
  

// export interface VerifyPageProps {
//     searchParams: {
//       token?: string;
//     };
// }
  

///////////////



