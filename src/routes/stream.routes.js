import express from "express";
import StreamChat from "stream-chat";

const router = express.Router();

// Server-side Stream client
const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
);

// Example: GET /api/stream-token/:userId
router.get("/stream-token/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) return res.status(400).json({ error: "userId required" });

        // Ensure user exists on Stream
        await serverClient.upsertUser({ id: userId, name: userId });

        // Generate a token for the user
        const token = serverClient.createToken(userId);

        res.json({ token });
    } catch (err) {
        console.error("Stream token error:", err);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

export default router;
