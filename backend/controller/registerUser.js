const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const genToken = require("../utils/genToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const { Fname, Lname, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    Fname,
    Lname,
    email,
    password: hashedPass,
    role,
  });

  const token = genToken(newUser);

  res.status(201).json({
    message: "User created successfuly",
    user: {
      Fname: newUser.Fname,
      Lname: newUser.Lname,
      email: newUser.email,
      role: newUser.role,
    },
    token,
  });
});

module.exports = registerUser;
