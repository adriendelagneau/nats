import mongoose, { Document } from "mongoose";

export interface Article extends Document {
  title: string;
  content: string;
  category: mongoose.Schema.Types.ObjectId;
  subcategory?: mongoose.Schema.Types.ObjectId;
  author: string;
  images: string[];
}

const articleSchema = new mongoose.Schema<Article>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
  author: { type: String, required: true },
  images: [{ type: String }], // Assuming the image paths or URLs are stored as strings
});

export default mongoose.models.Article || mongoose.model<Article>("Article", articleSchema);
