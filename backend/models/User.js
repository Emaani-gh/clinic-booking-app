const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Fname: String,
    Lname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      default: "patient",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
