const asyncHandler = require("../utils/asyncHandler");
const genToken = require("../utils/genToken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const Login = asyncHandler(async (req, res) => {
  // GET REQ BODY
  const { email, password } = req.body;

  // CHECK IF USER ALREADYY EXIST
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // COMPARE PASS
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // GEN token for JWT
  const token = genToken(user.id);

  // RETURN RESPONSE
  res.status(200).json({ message: "Login successfully", token });
});

module.exports = Login;
