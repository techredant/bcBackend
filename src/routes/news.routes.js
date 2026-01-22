// routes/news.js
import express from "express";
import News from "../models/news.js";

const router = express.Router();

// ------------------- GET all news -------------------
router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        console.error("Error fetching news:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ------------------- POST new article -------------------
router.post("/", async (req, res) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNews = await News.create({ title, content, image });
        res.status(201).json(newNews);
    } catch (err) {
        console.error("Error creating news:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
