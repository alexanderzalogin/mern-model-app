import mongoose from "mongoose";

const AgencySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        // required: true,
        trim: true
    },
}, { 
    timestamps: true 
})

const Agency = mongoose.model("Agency", AgencySchema);

export default Agency;
