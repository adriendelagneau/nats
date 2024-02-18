'use server'
import { dbConnect } from "@/lib/dbConnect";
import Article  from "@/lib/models/Article";
import { GetArticlesParams, IGetArticlesResponse, TArticle } from "@/types";





export const getArticles = async ({
  page = 1,
  limit = 10, // You can set a default limit if needed
  query,
  category,
  subcategory,
  sort,
}: GetArticlesParams = {}): Promise<IGetArticlesResponse> => {
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
    // Add your sorting logic here

    const result = await Article.find(combinedFilter)
      .skip(skipCount)
      .limit(limit)
      .sort(sortOptions);

    const totalArticles = await Article.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalArticles / limit);

    // Convert MongoDB objects to plain objects
    const plainObject = JSON.parse(JSON.stringify(result));

    // Return the articles along with total pages
    return { data: plainObject, totalPages };
  } catch (err) {
    console.error('Error in getArticles:', err);
    throw new Error('An unexpected error occurred while fetching articles.');
  }
};


export const getArticleById = async (id: string): Promise<TArticle | null> => {
  await dbConnect();

  try {
      // Use Mongoose findById to retrieve a product by its ID
      const article = await Article.findById(id).populate({
        path: 'category',
        select: 'name'
      }).lean().exec();

      // If the product is not found, you may want to handle this case accordingly
      if (!article) {
          throw new Error("Product not found");
      }

      // Convert the MongoDB object to a plain JavaScript object
      const plainObject = JSON.parse(JSON.stringify(article));

      // Return the product as a plain object
      return plainObject;
  } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to handle it at a higher level
  }
};
































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


