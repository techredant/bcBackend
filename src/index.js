import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Routes
import chatRoutes from "./routes/chat.routes.js";
import aiReplyRoute from "./routes/aiReply.routes.js";
import streamRoutes from "./routes/stream.routes.js";
import userRoutes from "./routes/user.routes.js";
import aiRoutes from "./routes/upsert-ai.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import statusRoutes from "./routes/status.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import verifyRoutes from "./routes/verify.routes.js";
import newsRoutes from "./routes/news.routes.js";

// ------------------- Express App -------------------
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api", (_, res) => res.json({ message: "API running" }));
app.get("/", (_, res) => res.send("Backend running"));

// ------------------- Routes -------------------
app.use("/api/chat", chatRoutes);
app.use("/api/ai-reply", aiReplyRoute);
app.use("/api/stream", streamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upsert-ai", aiRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/statuses", statusRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", verifyRoutes);
app.use("/api/news", newsRoutes);

// ------------------- HTTP & Socket.IO -------------------
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Make io available in routes
app.set("io", io);

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
