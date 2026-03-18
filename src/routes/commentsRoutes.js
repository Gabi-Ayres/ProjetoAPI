import express from "express";
import * as commentsController from "../controllers/commentController.js";

const router = express.Router();

router.get("/tasks/:id/comments", commentsController.getCommentsForTask);
router.post("/tasks/:id/comments", commentsController.createCommentForTask);


export default router;