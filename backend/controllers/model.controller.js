import mongoose from "mongoose";
import Model from '../models/model.model.js';
import User from '../models/user.model.js';
import UserRole from "../models/user/userRole.model.js";
import ModelService from "../services/model.service.js"

export const getModels = async (req, res) => {
    const result = await ModelService.getModels();
        
    if (result.errorMessage) {
        console.log("error in fetching models: ", result.errorMessage);
        res.status(500).json({ success: false, message: result.errorMessage });
    }

    res.status(200).json({ success: true, data: result.value });
}

export const createModel = async (req, res) => {
    const model = req.body.model;
    const user_id = req.body.user_id;

    if (!model.description || !model.photo) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const modelData = { ...model, ...{user_id: user_id} };
    const newModel = new Model(modelData);

    try {
        await newModel.save();
        const user = await User.findByIdAndUpdate(user_id, {
            is_profile_complete: true
        }, { new: true });
        const userRole = await UserRole.create({user_id: user_id.toString(), role_id: 2})
        res.status(201).json({ success: true, data: { user: user, model: newModel, user_role: userRole } });
    } catch (error) {
        console.log('Error in create model: ', error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateModel = async (req, res) => {
    const { id } = req.params;

    const model = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid model id" });
    }

    try {
        const updatedModel = await User.findByIdAndUpdate(id, model, { new: true });
        res.status(200).json({ success: true, data: updatedModel });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteModel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid model id" });
    }

    try {
        await Model.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Model deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateModelPhoto = async (req, res) => {
    const { id } = req.params;

    const photo = req.body.photo;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid model id" });
    }

    try {
        const updatedModel = await Model.findByIdAndUpdate(id, {
            photo: photo
        }, { new: true });
        res.status(200).json({ success: true, data: updatedModel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getModelByUserId = async (req, res) => {
    const user_id = req.body.user_id;

    if (!user_id) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try{
        const model = await Model.findOne({ user_id: user_id });
        res.status(200).json({ success: true, data: model });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
