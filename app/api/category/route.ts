import { dbConnect } from '@/lib/dbConnect';
import Category from '@/lib/models/Category';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async () => {

    await dbConnect()

    try {
        const categoriesWithSubcategories = await Category.find();
        return NextResponse.json(categoriesWithSubcategories );
      } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
        throw error;
      }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log({ body });

  // Do something

  return NextResponse.json({ message: 'Operation successful' }, { status: 200 });
};
