// routes/commentRoutes.js (excerpt)
import express from "express";
import Comment from "../models/comment.js";

const router = express.Router();

// ------------------- Like/Unlike a Reply -------------------
router.post("/:commentId/replies/:replyId/like", async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const reply = comment.replies.id(replyId);
        if (!reply) return res.status(404).json({ message: "Reply not found" });

        const liked = !reply.likes.includes(userId);

        if (liked) {
            reply.likes.push(userId);
        } else {
            reply.likes = reply.likes.filter((id) => id !== userId);
        }

        await comment.save();

        res.json({
            success: true,
            likes: reply.likes.length,
            liked,
        });
    } catch (err) {
        console.error("Error liking reply:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
