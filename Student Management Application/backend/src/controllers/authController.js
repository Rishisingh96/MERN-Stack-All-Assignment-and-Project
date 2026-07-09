const Student = require("../models/Student");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, adminKey } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await Student.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Only allow admin role if correct admin key is provided
        let userRole = "user";
        if (role === "admin") {
            const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "your-secret-admin-key";
            if (adminKey !== ADMIN_SECRET_KEY) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid admin key. Cannot create admin user."
                });
            }
            userRole = "admin";
        }

        const user = await Student.create({
            name,
            email,
            password,
            role: userRole
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check Empty Fields

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required"

            });

        }

        // Find User

        const user = await Student.findOne({ email }).select("+password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        // Compare Password

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        // Check User Status

        if (user.status === "disabled") {

            return res.status(403).json({

                success: false,

                message: "Your account has been disabled"

            });

        }

        // Generate JWT
        const token = generateToken(user);

        // Store Token in Cookie
        res.cookie("token", token, {

            httpOnly: true,

            maxAge: 24 * 60 * 60 * 1000

        });

        // Success Response
        res.status(200).json({

            success: true,

            message: "Login Successful",

            token

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Logout Controller
exports.logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({
            success: true,
            message: "Logout Successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Current User (Protected Route)
exports.getMe = async (req, res) => {
    try {
        // req.user is set by auth middleware
        const user = await Student.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};