// models/category.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// ------------------- Category Schema -------------------
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // prevent duplicate names
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ------------------- Category Model -------------------
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
