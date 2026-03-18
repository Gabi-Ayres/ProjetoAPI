import express from "express";
import * as tagController from "./../controllers/tagController.js";

const router = express.Router();

router.get("/", tagController.getAllTags);
router.get("/:id/tasks", tagController.getTaskByTagId);
router.post("/", tagController.createTag);
router.delete("/:id", tagController.deleteTag);

export default router;