import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import aiReplyRoute from "./routes/aiReply.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", aiReplyRoute);

app.use("/api", chatRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(console.error);

app.get("/", (_, res) => res.send("API running"));

app.listen(5000, () => console.log("Server started on 5000"));
