import mongoose from "mongoose";

const agencyEmployeeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    agency_id: {
        type: mongoose.Types.ObjectId,
        ref: "Agency"
    }
}, {
    timestamps: true
})

const AgencyEmployee = mongoose.model("AgencyEmployee", agencyEmployeeSchema);

export default AgencyEmployee;
