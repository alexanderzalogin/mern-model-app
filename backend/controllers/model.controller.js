import mongoose from "mongoose";
import Model from '../models/model.model.js';

export const getModels = async (req, res) => {
    try {
        const models = await Model.find();
        res.status(200).json({ success: true, data: models });
    } catch (error) {
        console.log("error in fetching models: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createModel = async (req, res) => {
    const model = req.body;

    if (!model.user_id || !model.description || !model.photo) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newModel = new Model(model);

    try {
        await newModel.save();
        res.status(201).json({ success: true, data: newModel });
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
        const updatedModel = await User.findByIdAndUpdate(id, {
                 image: photo
          }, { new: true });
        res.status(200).json({ success: true, data: updatedModel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
