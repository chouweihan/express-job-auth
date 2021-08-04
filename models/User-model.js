const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: 3,
    maxlength: 40,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email is invalid",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is reuqired"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const randomBytes = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, randomBytes);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { user_id: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

UserSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
