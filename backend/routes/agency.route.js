import express from "express";
import { createAgency, deleteAgency, getAgencies, getAgencyByUserId, updateAgency, updateAgencyPhoto } from "../controllers/agency.controller.js";

const router = express.Router();

router.get("/", getAgencies)
router.post("/user", getAgencyByUserId)
router.post("/", createAgency)
router.put("/:id", updateAgency)
router.delete("/:id", deleteAgency)
router.put("/:id/photo", updateAgencyPhoto)

export default router;
