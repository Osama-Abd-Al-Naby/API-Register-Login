const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/User"); // Adjust the path as needed
const { validateRegisterUser } = require("../models/User"); // Adjust the path as needed
const asyncHandler = require("express-async-handler");

module.exports.registerCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
  });
  await user.save();
  return res
    .status(201)
    .json({ message: "You registered successfully, please login" });
});
