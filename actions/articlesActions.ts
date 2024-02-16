'use server'
import { dbConnect } from "@/lib/dbConnect";
import Article, { TArticle } from "@/lib/models/Article";
import { GetArticlesParams, GetArticlesResult } from "@/types";



export const getArticles = async ({
    page = 1,
    limit,
    query,
    category,
    subcategory,
    sort,
}: GetArticlesParams): Promise<GetArticlesResult> => {
    await dbConnect();
    try {
        // Build the filter object based on the provided parameters
        const filter: any = {};
        if (category) {
            filter.category = category;
        }
        if (subcategory) {
            filter.subcategory = subcategory;
        }

        // Build the search criteria for name, category, and description
        const searchCriteria = query
            ? {
                $or: [
                    { name: { $regex: new RegExp(query, 'i') } },
                    { category: { $regex: new RegExp(query, 'i') } },
                    { subcategory: { $regex: new RegExp(query, 'i') } },
                    { description: { $regex: new RegExp(query, 'i') } },
                ],
            }
            : {};

        // Combine the filter and search criteria
        const combinedFilter = { ...filter, ...searchCriteria };

        // Calculate skipCount
        const skipCount = (page - 1) * limit;

        // Build the sort object based on the provided sort parameter or use default sorting options
        let sortOptions: any = {};
        // if (sort === 'priceDes') {
        //     sortOptions = { price: 1 };
        // } else if (sort === 'priceAsc') {
        //     sortOptions = { price: -1 };
        // } else {
        //     sortOptions = { createdAt: 1 };
        // }

        const result = await Article.find(combinedFilter)
        .skip(skipCount)
        .limit(limit)
        .sort(sortOptions);
    
        const totalArticles = await Article.countDocuments(combinedFilter);
        const totalPages = Math.ceil(totalArticles / limit);

        // Convert MongoDB objects to plain objects
        const plainObject = JSON.parse(JSON.stringify(result));

        // Return the articles along with total pages
        return { articles: plainObject, totalPages };
    } catch (err) {
        console.error('Error in getArticles:', err);
        throw new Error('An unexpected error occurred while fetching articles.');
    }
};
