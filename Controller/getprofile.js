const { UserModel } = require("../models/User");

module.exports.getprofileuser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
