// backend/src/routes/aiReply.routes.js
import express from "express";
import { StreamChat } from "stream-chat";

const router = express.Router();

// ✅ Stream client (server-side)
const client = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
);

router.post("/ai-reply", async (req, res) => {
    try {
        const { type, message, channel, channel_id } = req.body;
        const channelId = channel?.id || channel_id;

        console.log("Incoming webhook:", type);

        if (type !== "message.new") {
            return res.json({ received: true });
        }

        if (message?.user?.id === "ai-assistant") {
            return res.json({ ignored: true });
        }

        // ---------------------------
        // 1️⃣ CALL CLOUDFLARE AI
        // ---------------------------
        const cfResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are a helpful AI assistant." },
                        { role: "user", content: message.text },
                    ],
                }),
            }
        );

        if (!cfResponse.ok) {
            throw new Error(`Cloudflare AI error: ${cfResponse.status}`);
        }

        const result = await cfResponse.json();

        const aiResponse =
            result?.result?.response || "Hello! How can I help you?";

        // ---------------------------
        // 2️⃣ SEND MESSAGE TO STREAM
        // ---------------------------
        const channelRef = client.channel("messaging", channelId, {
            created_by_id: "ai-assistant",
        });

        await channelRef.watch();

        await channelRef.sendMessage({
            text: aiResponse,
            user_id: "ai-assistant",
        });

        return res.json({ success: true, reply: aiResponse });
    } catch (error) {
        console.error("AI reply error:", error);
        return res.status(500).json({ error: error.message || "Server error" });
    }
});

export default router;
