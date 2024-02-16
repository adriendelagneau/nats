import mongoose, { Document } from "mongoose";


const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);
