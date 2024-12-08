import express from "express";
import { createModel, getModels, updateModel, updateModelPhoto, deleteModel, getModelByUserId } from "../controllers/model.controller.js";

const router = express.Router();

router.get("/", getModels)
router.post("/user", getModelByUserId)
router.post("/", createModel)
router.put("/:id", updateModel)
router.delete("/:id", deleteModel)
router.put("/:id/photo", updateModelPhoto)

export default router;
