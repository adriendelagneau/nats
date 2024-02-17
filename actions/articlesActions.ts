'use server'
import { dbConnect } from "@/lib/dbConnect";
import Article, { TArticle } from "@/lib/models/Article";
import { GetArticlesParams, GetArticlesResult, IGetArticlesResponse } from "@/types";



// export const getArticles = async ({
//     page = 1,
//     limit,
//     query,
//     category,
//     subcategory,
//     sort,
// }: GetArticlesParams): Promise<GetArticlesResult> => {
//     await dbConnect();
//     try {
//         // Build the filter object based on the provided parameters
//         const filter: any = {};
//         if (category) {
//             filter.category = category;
//         }
//         if (subcategory) {
//             filter.subcategory = subcategory;
//         }

//         // Build the search criteria for name, category, and description
//         const searchCriteria = query
//             ? {
//                 $or: [
//                     { name: { $regex: new RegExp(query, 'i') } },
//                     { category: { $regex: new RegExp(query, 'i') } },
//                     { subcategory: { $regex: new RegExp(query, 'i') } },
//                     { description: { $regex: new RegExp(query, 'i') } },
//                 ],
//             }
//             : {};

//         // Combine the filter and search criteria
//         const combinedFilter = { ...filter, ...searchCriteria };

//         // Calculate skipCount
//         const skipCount = (page - 1) * limit;

//         // Build the sort object based on the provided sort parameter or use default sorting options
//         let sortOptions: any = {};
//         // if (sort === 'priceDes') {
//         //     sortOptions = { price: 1 };
//         // } else if (sort === 'priceAsc') {
//         //     sortOptions = { price: -1 };
//         // } else {
//         //     sortOptions = { createdAt: 1 };
//         // }

//         const result = await Article.find(combinedFilter)
//         .skip(skipCount)
//         .limit(limit)
//         .sort(sortOptions);
    
//         const totalArticles = await Article.countDocuments(combinedFilter);
//         const totalPages = Math.ceil(totalArticles / limit);

//         // Convert MongoDB objects to plain objects
//         const plainObject = JSON.parse(JSON.stringify(result));

//         // Return the articles along with total pages
//         return { articles: plainObject, totalPages };
//     } catch (err) {
//         console.error('Error in getArticles:', err);
//         throw new Error('An unexpected error occurred while fetching articles.');
//     }
// };



// export const createArticle = async () => {
//     try {
//       const newArticle: TArticle = await Article.create({
//         title: "Sample Article",
//         content: ["Lorem ipsum content"],
//         category: "65cf8f87c472cd33efbc9c88",
//         author: "John Doe",
//         images: [{url : "https://res.cloudinary.com/dos8mey8r/image/upload/v1708163477/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_nuwyj0.jpg", legend: "une description imagée de la photos"}],
//       });
  
//       return { msg: "success", article: newArticle };
//     } catch (err) {
//       console.error(err);
//       return { msg: "error", error: err.message };
//     }
// };



  
export const getArticles = async (): Promise<IGetArticlesResponse> => {
  await dbConnect();
  try {
    const res = await Article.find();
    const articles = JSON.parse(JSON.stringify(res)) as TArticle[];
    return { msg: "success", data: articles };
  } catch (err) {
    const errorMessage = (err as Error).message; // Use type assertion to cast 'err' to 'Error'
    return { msg: "error", error: errorMessage };
  }
};