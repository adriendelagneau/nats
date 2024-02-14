import mongoose, { Document } from "mongoose";

export interface Category extends Document {
  name: string;
}

const categorySchema = new mongoose.Schema<Category>({
  name: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<Category>("Category", categorySchema);
