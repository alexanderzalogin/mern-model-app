export class CreateModelRequestResource {
    constructor(requestBody) {
        CreateModelRequestResource.validate(requestBody);

        this.model = requestBody.model.length < 1 ? undefined : requestBody.model;
        this.user_id = requestBody.user_id === null ? undefined : requestBody.user_id;
    }

    static validate(requestBody) {
        const acceptedFields = new Set(["model", "user_id"]);
        const invalidFields = Object.keys(requestBody).filter(k => !acceptedFields.has(k));
        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid fields provided in create model request, expected any of: [${[...acceptedFields].join(", ")}], found: [${[...invalidFields].join(", ")}]`
            );
        }
    
        if (requestBody.model === undefined || requestBody.model === null) {
            throw new Error("Invalid model request, model field is required");
        }

        if (requestBody.user_id === undefined || requestBody.user_id === null) {
            throw new Error("Invalid model request, user_id field is required");
        }
    }
};
