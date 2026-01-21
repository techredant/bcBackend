// // src/routes/stream.routes.js
// import express from "express";
// import { StreamChat } from "stream-chat"; // <-- note no "-expo"
// const router = express.Router();

// // Initialize Stream client (server-side)
// const serverClient = new StreamChat(
//     process.env.STREAM_API_KEY,
//     process.env.STREAM_API_SECRET
// );

// router.get("/stream-token/:userId", async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ error: "User ID is required" });
//     }

//     try {
//         // Generate a user token
//         const token = serverClient.createToken(userId);
//         return res.json({ token });
//     } catch (err) {
//         console.error("Stream token error:", err);
//         return res.status(500).json({ error: "Failed to create Stream token" });
//     }
// });

// export default router;


// backend/src/routes/stream.routes.js
import express from "express";
import { StreamChat } from "stream-chat";

const router = express.Router();

const serverClient = new StreamChat(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
);

// Temporary dummy token for any userId
router.get("/stream-token/:userId", async (req, res) => {
    const { userId } = req.params;

    // Fallback to a dummy ID if none provided
    const effectiveUserId = userId || "test-user";

    try {
        const token = serverClient.createToken(effectiveUserId);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create token" });
    }
});

export default router;
