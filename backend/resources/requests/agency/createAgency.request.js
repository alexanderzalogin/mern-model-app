export class CreateAgencyRequestResource {
    constructor(requestBody) {
        CreateAgencyRequestResource.validate(requestBody);

        this.agency = requestBody.agency.length < 1 ? undefined : requestBody.agency;
        this.user_id = requestBody.user_id === null ? undefined : requestBody.user_id;
    }

    static validate(requestBody) {
        const acceptedFields = new Set(["agency", "user_id"]);
        const invalidFields = Object.keys(requestBody).filter(k => !acceptedFields.has(k));
        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid fields provided in create agency request, expected any of: [${[...acceptedFields].join(", ")}], found: [${[...invalidFields].join(", ")}]`
            );
        }
    
        if (requestBody.agency === undefined || requestBody.agency === null) {
            throw new Error("Invalid agency request, agency field is required");
        }

        if (requestBody.user_id === undefined || requestBody.user_id === null) {
            throw new Error("Invalid agency request, user_id field is required");
        }
    }
};
