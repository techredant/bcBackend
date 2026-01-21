import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import aiReplyRoute from "./routes/aiReply.routes.js";
import streamRoutes from "./routes/stream.routes.js"; // ✅ import new route

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api", (_, res) => res.json({ message: "API running" }));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/ai-reply", aiReplyRoute);
app.use("/api/stream", streamRoutes); // ✅ add this

// Optional root
app.get("/", (_, res) => res.send("Backend running"));

// ❌ DO NOT app.listen() on Vercel
export default app;
