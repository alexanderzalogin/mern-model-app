import mongoose, { model } from "mongoose";
import bcryptjs from "bcryptjs";
import User from '../models/user.model.js';
import CryptoJS from "crypto-js";
import UserRole from "../models/user/userRole.model.js";
import Agency from "../models/agency.model.js";
import AgencyEmployee from "../models/agency/agencyEmployee.js";
import Model from "../models/model.model.js";

export const signupUser = async (req, res) => {
    try {
        const { email, password, confirmPassword, full_name } = req.body;

        if (!email || !password || !confirmPassword || !full_name) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ success: false, message: "Password should be at least 6 characters" });
        }

        if (confirmPassword !== password) {
            return res.status(400).json({ success: false, message: "Passwords don't match" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User with this email already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 8);

        const newUser = new User({ email, password: hashedPassword, full_name });
        const savedUser = await newUser.save();
        res
            .status(201)
            .json({ message: "User signed up successfully", success: true, savedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all the fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User with this email does not exist" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Incorrect password." });
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify({ _id: user._id }), process.env.SECRET_KEY).toString();
        user.token = token;
        await User.findByIdAndUpdate(user._id, user);

        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const token = req.headers["x-token"];
        if (!token) {
            return res.status(400).json({ success: false, message: "Please provide token" });
        }
        let agency = {};
        let model = {};
        const user = await User.findOne({ token });
        const user_role = await UserRole.findOne({ user_id: user._id })
        const agency_employee = await AgencyEmployee.findOne({ user_id: user._id });
        model = await Model.findOne({user_id: user._id});
        
        if (agency_employee) {
            agency = await Agency.findById(agency_employee.agency_id);
        }
        if (model) {
            model = {};
        }

        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User with this token does not exist" });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                _id: user._id,
                full_name: user.full_name,
                email: user.email,
                is_profile_complete: user.is_profile_complete,
            },
            user_role: user_role,
            agency: agency,
            model: model
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.email) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.log('Error in create User: ', error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateUserPhoto = async (req, res) => {
    const { id } = req.params;

    const photo = req.body.photo;
    console.log(photo);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            image: photo
        }, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
