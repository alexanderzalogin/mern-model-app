export class GetModelByUserIdRequestResource {
    constructor(requestBody) {
        GetModelByUserIdRequestResource.validate(requestBody);

        this.user_id = requestBody.user_id === null ? undefined : requestBody.user_id;
    }

    static validate(requestBody) {
        const acceptedFields = new Set(["user_id"]);
        const invalidFields = Object.keys(requestBody).filter(k => !acceptedFields.has(k));
        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid fields provided in create model request, expected any of: [${[...acceptedFields].join(", ")}], found: [${[...invalidFields].join(", ")}]`
            );
        }
    
        if (requestBody.user_id === undefined || requestBody.user_id === null) {
            throw new Error("Invalid model request, user_id field is required");
        }
    }
};
