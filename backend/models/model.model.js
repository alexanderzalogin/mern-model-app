import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        // required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { 
    timestamps: true 
})

const Model = mongoose.model("Model", ModelSchema);

module.exports = Model;
