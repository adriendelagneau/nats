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
        return categoriesWithSubcategories;
      } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
        throw error;
      }
};

export const createSub = async () => {
  try {
    const newSub = await Subcategory.create({
      name:"combat"
    })
    return {msg: "success"}
  } catch (err) {
    console.log(err)
  }
}

export const createCat = async () => {
  try {
    const newSub = await Category.create({
      name: "sport",
      sub: ["65cf4125a41d45a37ae6ddc5"]
    })
    return {msg: "success"}
  } catch (err) {
    console.log(err)
  }
}