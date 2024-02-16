import mongoose, { Document, Schema, Types } from "mongoose";


interface Category extends Document {
  name: string;
  sub: Schema.Types.ObjectId[];
}

const categorySchema = new mongoose.Schema<Category>({
  name: { type: String, required: true },
  sub: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);



