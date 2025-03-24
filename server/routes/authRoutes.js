const express = require("express");
const { register, verifyEmail, login, getCustomerDetails } = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password should be at least 6 characters").isLength({ min: 6 }),
  ],
  register
);
router.get("/customers", authMiddleware, getCustomerDetails);
router.get("/verify/:token", verifyEmail);
router.post("/admin/login", login);

module.exports = router;