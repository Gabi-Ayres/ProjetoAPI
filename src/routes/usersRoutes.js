import express from "express";
import * as usersController from "./../controllers/userController.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/",  usersController.createUser);
router.put("/:id", checkUserExists, usersController.updateUser);
router.delete("/:id", checkUserExists, usersController.deleteUser);
router.patch("/:id",checkUserExists, usersController.updateUser);


export default router;