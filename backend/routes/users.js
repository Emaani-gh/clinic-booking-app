var express = require("express");
const Protected = require("../middleware/authMiddlware");
const registerUser = require("../controller/registerUser");
const Login = require("../controller/login");
const getMe = require("../controller/me");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Create new user
router.post("/register", registerUser);

// LOGIN
router.post("/login", Login);

router.get("/me", Protected, getMe);

module.exports = router;
