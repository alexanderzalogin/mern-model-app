import express from "express";
import { createModel, getModels, updateModel, updateModelPhoto, deleteModel } from "../controllers/model.controller";

const router = express.Router();

router.get("/", getModels)
router.post("/", createModel)
router.put("/:id", updateModel)
router.delete("/:id", deleteModel)
router.put("/:id/photo", updateModelPhoto)

export default router;
