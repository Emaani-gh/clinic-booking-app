
const asyncHandler = require("../utils/asyncHandler");

const getMe = asyncHandler(async (req, res) => {
  const user = await req.user;
  res.status(200).json(user);
});
module.exports = getMe;