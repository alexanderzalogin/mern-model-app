import mongoose from "mongoose";

export class UpdateModelPhotoRequestResource {
    constructor(requestBody, params) {
        UpdateModelPhotoRequestResource.validate(requestBody, params);

        this.modelId = params.id === null ? undefined : params.id;
        this.photo = requestBody.photo === null ? undefined : requestBody.photo;
    }

    static validate(requestBody, params) {
        const acceptedFields = new Set(["photo"]);
        const invalidFields = Object.keys(requestBody).filter(k => !acceptedFields.has(k));
        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid fields provided in update model photo request, expected any of: [${[...acceptedFields].join(", ")}], found: [${[...invalidFields].join(", ")}]`
            );
        }
    
        if (requestBody.photo === undefined || requestBody.photo === null) {
            throw new Error("Invalid model request, photo field is required");
        }

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            throw new Error("Invalid model request, model id field is not valid");
        }
    }
};
