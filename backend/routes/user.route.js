import express from "express";
import { createUser, deleteUser, getUsers, loginUser, signupUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/login", loginUser)
router.post("/signup", signupUser)

export default router;
