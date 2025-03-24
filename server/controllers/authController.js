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
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
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

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired verification token'
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return responseHandler(res, 400, false, "Invalid credentials");

        if (!user.isVerified)
            return responseHandler(res, 400, false, "Email not verified");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return responseHandler(res, 400, false, "Invalid credentials");

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

        return responseHandler(res, 200, true, "Login successful", { token });
    } catch (error) {
        return responseHandler(res, 500, false, "Server error", error.message);
    }
};

//Get Customer Details
exports.getCustomerDetails = async (req, res) => {
    try {
        const customers = await User.find({ role: "customer" }).select("-password -verificationToken");

        if (!customers || customers.length === 0) {
            return responseHandler(res, 404, false, "No customers found");
        }

        return responseHandler(res, 200, true, "Customer details retrieved successfully", customers);
    } catch (error) {
        return responseHandler(res, 500, false, "Server error", error.message);
    }
};
