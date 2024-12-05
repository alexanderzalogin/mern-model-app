import mongoose from "mongoose";
import Agency from '../models/agency.model.js';

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
    const agency = req.body;

    if (!agency.name || !agency.description || !agency.photo) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newAgency = new Agency(agency);

    try {
        await newAgency.save();
        res.status(201).json({ success: true, data: newAgency });
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
        const updatedAgency = await User.findByIdAndUpdate(id, {
                 image: photo
          }, { new: true });
        res.status(200).json({ success: true, data: updatedAgency });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
