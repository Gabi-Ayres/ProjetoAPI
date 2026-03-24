import express from "express";
import * as taskController from "./../controllers/taskController.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";

const router = express.Router();

router.get("/stats", taskController.getTaskStats);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskId);
router.post("/", taskController.createTask);
router.post("/:id/tags", taskController.createTaskTag);
router.post("/:id/comments", checkUserExists, taskController.createdComment)
router.get("/:id/comments", taskController.getCommentsForTask)
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
