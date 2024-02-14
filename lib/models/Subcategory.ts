import mongoose, { Document } from "mongoose";

export interface Subcategory extends Document {
  name: string;
}

const subcategorySchema = new mongoose.Schema<Subcategory>({
  name: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<Subcategory>("Category", subcategorySchema);
