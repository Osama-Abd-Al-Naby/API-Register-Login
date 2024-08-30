const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define the method to generate auth token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, password: this.password },
    process.env.JWT_SECRET
  );
};

// Create a model based on the schema
const UserModel = mongoose.model("User", userSchema);

// Validate register user
function validateRegisterUser(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Validate login user
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  UserModel,
  validateRegisterUser,
  validateLoginUser,
};
