import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;
