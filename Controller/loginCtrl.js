const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/User"); // Adjust the path as needed
const { validateLoginUser } = require("../models/User"); // Adjust the path as needed
const asyncHandler = require("express-async-handler");

module.exports.loginCtrl = asyncHandler(async (req, res) => {
  // const { error } = validateLoginUser(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    token,
  });
});
