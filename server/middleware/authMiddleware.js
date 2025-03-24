const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/responseHandler");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseHandler(res, 401, false, "Unauthorized: No token provided");
  }


  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return responseHandler(res, 403, false, "Invalid or expired token");
  }
};

module.exports = authMiddleware;