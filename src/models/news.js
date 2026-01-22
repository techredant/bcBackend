import mongoose from "mongoose";

const { Schema } = mongoose;

// ------------------- News Schema -------------------
const newsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // optional, adds createdAt & updatedAt automatically
);

// ------------------- News Model -------------------
const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;
