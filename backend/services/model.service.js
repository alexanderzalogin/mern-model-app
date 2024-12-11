import Model from '../models/model.model.js';
import User from '../models/user.model.js';
import UserRole from '../models/user/userRole.model.js';
import AgencyEmployee from '../models/agency/agencyEmployee.js';

import { ResponseResource } from '../resources/responses/response.resource.js';
import { GetModelsResponseResource } from '../resources/responses/model/getModelsResponse.resource.js';

async function getModels() {
    try {
        const models = await Model.find();
        return new ResponseResource(new GetModelsResponseResource(models));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

const ModelService = { getModels };

export default ModelService;
