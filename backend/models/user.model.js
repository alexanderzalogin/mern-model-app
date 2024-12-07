import mongoose from "mongoose";
import { type } from "os";
import validator from "validator"

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        required: true,
        type: String,
        minLength: 6,
    },
    token: {
        type: String
    },
    is_profile_complete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
