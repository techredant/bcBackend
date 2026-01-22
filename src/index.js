import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import aiReplyRoute from "./routes/aiReply.routes.js";
import streamRoutes from "./routes/stream.routes.js"; 
import userRoutes from "./routes/user.routes.js"
import aiRoutes from "./routes/upsert-ai.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api", (_, res) => res.json({ message: "API running" }));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/ai-reply", aiReplyRoute);
app.use("/api", streamRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/upsert-ai", aiRoutes);



// Optional root
app.get("/", (_, res) => res.send("Backend running"));

// ❌ DO NOT app.listen() on Vercel
export default app;
