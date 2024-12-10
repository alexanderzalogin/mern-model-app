import Agency from '../models/agency.model.js';
import User from '../models/user.model.js';
import UserRole from '../models/user/userRole.model.js';
import AgencyEmployee from '../models/agency/agencyEmployee.js';

import { ResponseResource } from '../resources/responses/response.resource.js';
import { GetAgenciesResponseResource } from '../resources/responses/agency/getAgencies.resource.js';
import { CreateAgencyResponseResource } from '../resources/responses/agency/createAgency.response.js';
import { UpdateAgencyPhotoResponseResource } from '../resources/responses/agency/updateAgencyPhoto.response.js';

async function getAgencies() {
    try {
        const agencies = await Agency.find();
        return new ResponseResource(new GetAgenciesResponseResource(agencies));
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

async function createAgency(req) {
    const newAgency = new Agency(req.agency);
    try {
        await newAgency.save();
        const user = await User.findByIdAndUpdate(req.user_id, {
            is_profile_complete: true
        }, { new: true });
        const userRole = await UserRole.create({ user_id: req.user_id, role_id: 1 })
        const agencyEmployee = await AgencyEmployee.create({ user_id: req.user_id, agency_id: newAgency._id });
        return new ResponseResource( new CreateAgencyResponseResource(user, newAgency, userRole) );
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

async function updateAgencyPhoto(req) {
    try {
        const updatedAgency = await Agency.findByIdAndUpdate(req.agencyId, {
            photo: req.photo
        }, { new: true });
        return new ResponseResource( new UpdateAgencyPhotoResponseResource(updatedAgency) );
    } catch (error) {
        return new ResponseResource(null, error.message);
    }
}

const AgencyService = { getAgencies, createAgency, updateAgencyPhoto };

export default AgencyService;
