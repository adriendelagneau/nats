'use server'

import { dbConnect } from "@/lib/dbConnect";
import Category from "@/lib/models/Category";

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export const getCategories = async () => {

    await dbConnect()

   

    try {
        const category = await Category.find()
        
        return category

    } catch (err) {
        return { error: 'Failed to fetch category.' }
    }
};