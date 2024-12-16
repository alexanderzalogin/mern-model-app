import mongoose from "mongoose";
import Model from '../models/model.model.js';
import User from '../models/user.model.js';
import ModelService from "../services/model.service.js";

import { CreateModelRequestResource } from "../resources/requests/model/createModelRequestResource.resource.js";
import { UpdateModelPhotoRequestResource } from "../resources/requests/model/updateModelPhotoRequest.resource.js";

export const getModels = async (req, res) => {
    const result = await ModelService.getModels();
        
    if (result.errorMessage) {
        console.log("error in fetching models: ", result.errorMessage);
        res.status(500).json({ success: false, message: result.errorMessage });
    }

    res.status(200).json({ success: true, data: result.value });
}

export const createModel = async (req, res) => {
    let request;
    try {
        request = new CreateModelRequestResource(req.body);
    } catch (error) {
        res.status(400).json(error.message);
        return;
    }

    const result = await ModelService.createModel(request);

    if (result.errorMessage) {
        res.status(500).json({ success: false, message: result.errorMessage });
        return;
    }

    res.status(201).json({ success: true, data: result.value });
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
    let request;
    try {
        request = new UpdateModelPhotoRequestResource(req.body, req.params);
    } catch (error) {
        res.status(400).json(error.message);
        return;
    }

    const result = await ModelService.updateModelPhoto(request);
    
    if (result.errorMessage) {
        res.status(500).json({ success: false, message: result.errorMessage });
        return;
    }

    res.status(201).json({ success: true, data: result.value });
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
