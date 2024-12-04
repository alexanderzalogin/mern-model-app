import express from "express";
import { createUser, deleteUser, getUser, getUsers, loginUser, signupUser, updateUser, updateUserPhoto } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/login", loginUser)
router.post("/signup", signupUser)
router.get("/user", getUser)
router.put("/:id/photo", updateUserPhoto)

export default router;
