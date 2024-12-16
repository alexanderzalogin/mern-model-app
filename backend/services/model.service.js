import Model from '../models/model.model.js';
import User from '../models/user.model.js';
import UserRole from '../models/user/userRole.model.js';

import { ResponseResource } from '../resources/responses/response.resource.js';
import { GetModelsResponseResource } from '../resources/responses/model/getModelsResponse.resource.js';
import { CreateModelResponseResource } from '../resources/responses/model/createModelResponse.resource.js';
import { UpdateModelPhotoResponseResource } from '../resources/responses/model/updateModelPhotoResponse.resource.js';

async function getModels() {
    try {
        const models = await Model.find();
        return new ResponseResource(new GetModelsResponseResource(models));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

async function createModel(req) {
    const modelData = { ...req.model, ...{user_id: req.user_id} };
    const newModel = new Model(modelData);
    try {
        await newModel.save();
        const user = await User.findByIdAndUpdate(req.user_id, {
            is_profile_complete: true
        }, { new: true });
        const userRole = await UserRole.create({user_id: req.user_id, role_id: 2})
        return new ResponseResource( new CreateModelResponseResource(user, newModel, userRole ) );
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

async function updateModelPhoto(req) {
    try {
        const updatedModel = await Model.findByIdAndUpdate(req.modelId, {
            photo: req.photo
        }, { new: true });
        return new ResponseResource( new UpdateModelPhotoResponseResource(updatedModel) );
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

const ModelService = { getModels, createModel, updateModelPhoto };

export default ModelService;
