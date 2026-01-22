import mongoose from "mongoose";

const { Schema } = mongoose;

// ------------------- Product Schema -------------------
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // array of image URLs
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "sold"],
      default: "new",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ------------------- Product Model -------------------
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
