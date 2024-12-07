import mongoose from "mongoose";

const agencyEmployeeSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    agency_id: {
        type: String,
    }
}, {
    timestamps: true
})

const AgencyEmployee = mongoose.model("AgencyEmployee", agencyEmployeeSchema);

export default AgencyEmployee;
