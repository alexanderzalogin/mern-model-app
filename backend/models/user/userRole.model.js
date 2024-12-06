import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    }
}, { 
    timestamps: true 
})

const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;
