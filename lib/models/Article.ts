import mongoose, { Document, Schema } from "mongoose";



const imageSchema = new Schema({
  url: { type: String, required: true },
  legend: { type: String, required: true },
});

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
  author: { type: String, required: true },
  images: [imageSchema], // Array of objects with url and legend
});

export default mongoose.models.Article || mongoose.model("Article", articleSchema);

