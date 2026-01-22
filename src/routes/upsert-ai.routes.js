import express from "express";
import { StreamChat } from "stream-chat";

const router = express.Router();

const client = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET // SERVER ONLY
);

// POST /api/stream/upsert-ai
router.post("/upsert-ai", async (req, res) => {
    try {
        await client.upsertUser({
            id: "ai-assistant",
            name: "AI Assistant",
            image: "https://i.imgur.com/IC7Zz11.png",
            role: "user",
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Upsert AI error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to upsert AI user" });
    }
});

export default router;
