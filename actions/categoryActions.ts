'use server'

import { dbConnect } from "@/lib/dbConnect";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export const getCategories = async () => {

    await dbConnect()

    try {
      const categoriesWithSubcategories = await Category.find().populate({
        path: 'sub',
        select: 'name'
      }).lean().exec();
        return JSON.parse(JSON.stringify(categoriesWithSubcategories)) ;
      } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
        throw error;
      }
};

export const createSub = async () => {
  try {
    const newSub = await Subcategory.create({
      name:"international"
    })
    return {msg: "success"}
  } catch (err) {
    console.log(err)
  }
}

export const createCat = async () => {
  try {
    const newSub = await Category.create({
      name: "politique",
      sub: []
    })
    return {msg: "success"}
  } catch (err) {
    console.log(err)
  }
}