import mongoose from "mongoose";
import Agency from '../models/agency.model.js';
import User from '../models/user.model.js';
import UserRole from "../models/user/userRole.model.js";
import AgencyEmployee from "../models/agency/agencyEmployee.js";
import AgencyService from "../services/agency.service.js"
import { CreateAgencyRequestResource } from "../resources/requests/agency/createAgency.request.js";

export const getAgencies = async (req, res) => {
    const result = await AgencyService.getAgencies();
        
    if (result.errorMessage) {
        console.log("error in fetching agencies: ", result.errorMessage);
        res.status(500).json({ success: false, message: result.errorMessage });
    }

    res.status(200).json({ success: true, data: result.value.agencies });
}

export const createAgency = async (req, res) => {
    let agency;
    try {
        agency = new CreateAgencyRequestResource(req.body);
    } catch (error) {
        res.status(400).json(error.message);
        return;
    }

    const result = await AgencyService.createAgency(agency);

    if (result.errorMessage) {
        res.status(500).json({ success: false, message: result.errorMessage });
        return;
    }

    res.status(201).json({ success: true, data: result.value });
}

export const updateAgency = async (req, res) => {
    const { id } = req.params;

    const agency = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid agency id" });
    }

    try {
        const updatedAgency = await User.findByIdAndUpdate(id, agency, { new: true });
        res.status(200).json({ success: true, data: updatedAgency });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteAgency = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid agency id" });
    }

    try {
        await Agency.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Agency deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateAgencyPhoto = async (req, res) => {
    const { id } = req.params;

    const photo = req.body.photo;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid agency id" });
    }

    try {
        const updatedAgency = await Agency.findByIdAndUpdate(id, {
            photo: photo
        }, { new: true });
        res.status(200).json({ success: true, data: updatedAgency });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAgencyByUserId = async (req, res) => {
    const user_id = req.body.user_id;

    if (!user_id) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const agency_employee = await AgencyEmployee.findOne({ user_id: user_id });
    try{
        const agency = await Agency.findById(agency_employee.agency_id);
        res.status(200).json({ success: true, data: agency });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
