import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  url: { type: String, required: true },
  legend: { type: String, required: true },
});

const contentSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: [contentSchema],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
  author: { type: String, required: true },
  images: [imageSchema],
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
