const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { ApiError } = require("./errorMiddleware");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw new ApiError("Not authorized, no token", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request (without password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    throw new ApiError("Not authorized, token failed", 401);
  }
});

module.exports = { protect };