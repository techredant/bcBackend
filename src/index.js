import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.routes.js";
import aiReplyRoute from "./routes/aiReply.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api", aiReplyRoute);

app.get("/", (_, res) => {
    res.send( "Hello from backend Siasa App" );
});

// Health check
app.get("/api", (_, res) => {
    res.send("API running on Vercel");
});

// ❌ DO NOT app.listen() on Vercel
export default app;
