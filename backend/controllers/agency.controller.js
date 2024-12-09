import mongoose from "mongoose";
import Agency from '../models/agency.model.js';
import User from '../models/user.model.js';
import UserRole from "../models/user/userRole.model.js";
import AgencyEmployee from "../models/agency/agencyEmployee.js";

export const getAgencies = async (req, res) => {
    try {
        const agencies = await Agency.find();
        res.status(200).json({ success: true, data: agencies });
    } catch (error) {
        console.log("error in fetching agencies: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createAgency = async (req, res) => {
    const agency = req.body.agency;
    const user_id = req.body.user_id;

    if (!agency.name || !agency.description || !agency.photo) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newAgency = new Agency(agency);

    try {
        await newAgency.save();
        const user = await User.findByIdAndUpdate(user_id, {
            is_profile_complete: true
        }, { new: true });
        const userRole = await UserRole.create({ user_id: user_id, role_id: 1 })
        const agencyEmployee = await AgencyEmployee.create({ user_id: user_id, agency_id: newAgency._id });
        res.status(201).json({ success: true, data: { user: user, agency: newAgency, user_role: userRole } });
    } catch (error) {
        console.log('Error in create agency: ', error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
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
