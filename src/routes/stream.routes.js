import express from "express";
import { StreamChat } from "stream-chat";

const router = express.Router();

const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
);

router.get("/stream-token/:userId", (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }

    try {
        const token = serverClient.createToken(userId);
        res.json({ token });
    } catch (err) {
        console.error("Stream token error:", err);
        res.status(500).json({ error: "Failed to create token" });
    }
});

export default router;
