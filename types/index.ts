import { z } from "zod";

import { loginSchema, signUpSchema } from "@/lib/zod/schema";


// Articles

export interface TArticle  {
  _id?: string;
  title: string;
  content: string[];
  category: TCategory
  subcategory?: TSubcategory
  author: string;
  images: TImage[];
  createdAt: Date; // Include the createdAt field
}

export interface TImage {
  url: string;
  legend: string;
}




export interface SinglePageProps {
  params: {
    _id: string;
    name: string;
  };
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

export type SlideerProps = {
  articles?: TArticle[];
};

export interface SliderCardData {
  title: string;
  content: string[];
  category: TCategory;
  subcategory?: TSubcategory; // Optional subcategory
  author: string;
  images: TImage[];
  createdAt: Date;
  // Add other relevant properties
}
