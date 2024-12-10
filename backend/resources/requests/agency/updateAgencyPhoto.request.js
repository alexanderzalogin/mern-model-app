import mongoose from "mongoose";

export class UpdateAgencyPhotoRequestResource {
    constructor(requestBody, params) {
        UpdateAgencyPhotoRequestResource.validate(requestBody, params);

        this.agencyId = params.id === null ? undefined : params.id;
        this.photo = requestBody.photo === null ? undefined : requestBody.photo;
    }

    static validate(requestBody, params) {
        const acceptedFields = new Set(["photo"]);
        const invalidFields = Object.keys(requestBody).filter(k => !acceptedFields.has(k));
        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid fields provided in update agency photo request, expected any of: [${[...acceptedFields].join(", ")}], found: [${[...invalidFields].join(", ")}]`
            );
        }
    
        if (requestBody.photo === undefined || requestBody.photo === null) {
            throw new Error("Invalid agency request, photo field is required");
        }

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            throw new Error("Invalid agency request, agency id field is not valid");
        }
    }
};
