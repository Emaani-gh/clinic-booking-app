const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const Protected = asyncHandler(async (req, res, next) => {
  let token;
  // get the token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }

  // verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id).select("-password");
    // next
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }

  // add user to req
});

module.exports = Protected;
