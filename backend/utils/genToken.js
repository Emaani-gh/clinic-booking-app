const jwt = require("jsonwebtoken");

const genToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = genToken;
