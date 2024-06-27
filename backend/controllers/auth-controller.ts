import { RequestHandler } from "express";
import _ from "lodash";
import Login from "../dtos/User/Login";
import Register from "../dtos/User/Register";
import User from "../models/user";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as Login;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  user.generateAuthToken(res);

  return res.status(200).json(_.pick(user, "_id", "name", "email", "isAdmin"));
};

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const register: RequestHandler = async (req, res) => {
  const { email, name, password } = req.body as Register;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  newUser.generateAuthToken(res);

  return res.status(200).json(_.pick(newUser, "_id", "name", "email", "isAdmin"));
};

// @desc    Logout user (clear cookie)
// @route   POST /api/users/logout
// @access  Public
export const logout: RequestHandler = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  return res.status(200).json({ message: "Logged out successfully!" });
};
