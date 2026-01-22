// routes/news.js
import express from "express";
import newsController from "../controllers/newsController.js";

const router = express.Router();

// GET all news
router.get("/", newsController.getAllNews);

// POST new article
router.post("/", newsController.createNews);

export default router;
