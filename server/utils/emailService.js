const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendVerificationEmail = async (to, token) => {
    const verificationLink = `http://localhost:5000/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: "Verify Your Email - Welcome to Our Platform!",
        html: `
            <div style="width: 100%; text-align: center; padding: 30px 0;">
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #2C3E50;">Welcome to Our Platform!</h2>
                    <p>Thank you for signing up. Please verify your email to activate your account.</p>
                    <div style="margin: 20px 0;">
                        <a href="${verificationLink}" 
                            style="display: inline-block; padding: 12px 20px; font-size: 16px; 
                            color: #fff; background-color: #28a745; text-decoration: none; 
                            border-radius: 5px; font-weight: bold;">
                            Verify Email
                        </a>
                    </div>
                    <p style="color: #666;">If you didn’t sign up, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} Our Platform. All Rights Reserved.</p>
                </div>
            </div>
        `,
    };


    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("❌ Email sending error:", error.message);
        throw new Error("Email sending failed");
    }
};

module.exports = { sendVerificationEmail };