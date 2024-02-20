'use server'
import { dbConnect } from "@/lib/dbConnect";
import Article  from "@/lib/models/Article";
import Author from "@/lib/models/Author";
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
      filter['category.slug'] = category; // Update to use category.slug
    }
    if (subcategory) {
      filter['subcategory.slug'] = subcategory; // Update to use subcategory.slug
    }

    // Build the search criteria for name, category, and description
    const searchCriteria = query
      ? {
          $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { slug: { $regex: new RegExp(query, 'i') } },
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
    if (sort) {
      // Implement your sorting logic based on the sort parameter
      switch (sort) {
        case 'createdAt':
          sortOptions.createdAt = 1; // Ascending order
          break;
        case '-createdAt':
          sortOptions.createdAt = -1; // Descending order
          break;
        // Add more sorting options as needed
        default:
          break;
      }
    } else {
      // Use default sorting (e.g., based on createdAt)
      sortOptions.createdAt = -1; // Default: Descending order
    }

    const result = await Article.find(combinedFilter)
      .skip(skipCount)
      .limit(limit)
      .sort(sortOptions)
      .populate({
        path: 'author',
        select: 'name'
      })
      .lean();

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




export const getArticleBySlug = async (slug: string): Promise<TArticle> => {
  await dbConnect();

  try {
    // Use Mongoose findOne to retrieve an article by its slug
    const article = await Article.findOne({ slug })
      .populate({
        path: 'category',
        select: 'name'
      })
      .populate({
        path: 'author', // Assuming 'author' is the field in the Article schema
        select: 'name image' // Select the fields you want to populate
      })
      .lean()
      .exec();

      // If the article is not found, you may want to handle this case accordingly
      if (!article) {
        throw new Error("Article not found");
    }
    
    // Convert the MongoDB object to a plain JavaScript object
    const plainObject = JSON.parse(JSON.stringify(article));
    
    // Return the article as a plain object
    return plainObject;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it at a higher level
  }
};


export const createArticle = async () => {

  try {
    
    const newOne = await Article.create({
        title: "Sample Article",
        slug: "a-readable-title",
        content: ["Lorem ipsum dolor sit amet. Consectetur adipiscing elit.","Lorem ipsum dolor sit amet. Consectetur adipiscing elit.","Lorem ipsum dolor sit amet. Consectetur adipiscing elit.","Lorem ipsum dolor sit amet. Consectetur adipiscing elit."],
        category: {
            id: "65cf414ba41d45a37ae6ddcb",
            slug: "sport", // You need to replace this with the actual slug
          },
          subcategory: {
              id: "65cf50d6a41d45a37ae6ddfe",
              slug: "football", // You need to replace this with the actual slug
            },
            author: "65d462b2dbe4f677fb35a1d0",
            images: [
                { url: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708374346/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_e0sk65.jpg", legend: "Image 1" },
                { url: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708205392/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_2_faukim.jpg", legend: "Image 2" },
              ],
              createdAt: new Date(),
            })
            return true
          } catch (err) {
              console.log(err);
              throw err; // Rethrow the error to handle it at a higher level
          }
          
          
          }
          
          export const getArticleById = async (id: string): Promise<TArticle> => {
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
          
          
          
export const createAuthor = async () => {
  await dbConnect()
  try {
    const newAuthor = await Author.create({
      name: "John Doe",
      image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1708205392/LeCanard/cute-arctic-mammal-walking-frozen-ice-generated-by-ai_2_faukim.jpg",
      articles: []
    })
    return true
  } catch (err) {
    console.log(err);
          //       throw err; // Rethrow the error to handle it at a higher level
  }
          }
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          





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


