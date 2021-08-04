const user_model = require("../models/User-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await user_model.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and Password are required");
  }
  const user = await user_model.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid email or password");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const getUsers = async (req, res) => {
  const users = await user_model.find({});
  res.status(StatusCodes.OK).json({ users });
};

module.exports = { register, login, getUsers };
