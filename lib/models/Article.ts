import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  url: { type: String, required: true },
  legend: { type: String, required: true },
});



const articleSchema = new Schema({
  title: { type: String, required: true },
  content: [{ type: String, required: true }],
  category: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    slug: { type: String, required: true },
  },
  subcategory: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    slug: { type: String },
  },
  author: { type: String, required: true },
  images: [imageSchema],
}, { timestamps: true });

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);


  

