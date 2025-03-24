const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/emailService");
const { validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseHandler(res, 400, false, "Validation errors", errors.array());
    }

    const { firstName, lastName, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return responseHandler(res, 400, false, "User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = jwt.sign({ email,role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            verificationToken,
        });

        await user.save();
        sendVerificationEmail(email, verificationToken);

        return responseHandler(res, 201, true, "Registration successful! Check your email to verify your account.");
    } catch (error) {
        return responseHandler(res, 500, false, "Server Error", error.message);
    }
};

// Verify Email

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            console.log("Token not found or invalid.");
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email });

        user.isVerified = true;
        await user.save();

        res.json({ message: "Email successfully verified" });
    } catch (error) {
        console.log("Error in Verification: ", error);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

//Admin Login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) 
            return responseHandler(res, 400, false, "Invalid admin credentials");

        if (user.role !== "admin")
            return responseHandler(res, 403, false, "You are not allowed to login from here");

        if (!user.isVerified)
            return responseHandler(res, 400, false, "Email not verified");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return responseHandler(res, 400, false, "Invalid admin credentials");

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return responseHandler(res, 200, true, "Admin login successful", { token });

    } catch (error) {
        return responseHandler(res, 500, false, "Server error", error.message);
    }
};

// Customer Login
exports.customerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, role: "customer" });

        if (!user) return responseHandler(res, 400, false, "Invalid customer credentials");

        if (!user.isVerified)
            return responseHandler(res, 400, false, "Email not verified");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return responseHandler(res, 400, false, "Invalid customer credentials");

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return responseHandler(res, 200, true, "Customer login successful", { token });
    } catch (error) {
        return responseHandler(res, 500, false, "Server error", error.message);
    }
};