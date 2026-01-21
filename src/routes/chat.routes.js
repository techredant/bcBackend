import express from "express";

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Messages required" });
        }

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
                        ...messages.map((m) => ({
                            role: m.role === "user" ? "user" : "assistant",
                            content: m.text,
                        })),
                    ],
                }),
            }
        );

        if (!cfResponse.ok) {
            throw new Error(`Cloudflare error ${cfResponse.status}`);
        }

        const result = await cfResponse.json();

        const aiText =
            result?.result?.response ?? "No response from AI";

        res.json({ reply: aiText });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({ error: "AI request failed" });
    }
});

export default router;
