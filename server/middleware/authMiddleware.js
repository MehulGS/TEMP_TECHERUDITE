const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/responseHandler");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseHandler(res, 401, false, "Unauthorized: No token provided");
  }

  // Extract token from Bearer string
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return responseHandler(res, 403, false, "Invalid or expired token");
  }
};

module.exports = authMiddleware;