import { RequestHandler } from "express";
import _ from "lodash";
import UpdateUser from "../dtos/User/UpdateUser";
import UpdateUserProfile from "../dtos/User/UpdateUserProfile";
import Order from "../models/order";
import User from "../models/user";
import CustomRequest from "../types/CustomRequest";

// @desc    Get users
// @route   GET /api/users
// @access  Private -> Admin
export const getAllUsers: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private -> Admin
export const getUser: RequestHandler = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private -> Admin
export const updateUser: RequestHandler = async (req, res, next) => {
  const { email, name, isAdmin } = req.body as UpdateUser;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.email === "admin@gmail.com") {
    res.status(400);
    throw new Error("Cannot update this user");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin ? true : false;

  const updatedUser = await user.save();

  res.status(200).json(_.pick(updatedUser, "_id", "name", "email", "isAdmin"));
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private -> Admin
export const deleteUser: RequestHandler = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.email === "admin@gmail.com") {
    res.status(400);
    throw new Error("Cannot delete this user");
  }

  await Order.deleteMany({ user: user._id });
  await User.deleteOne({ _id: user._id });

  res.status(200).json({ message: "User deleted successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile: RequestHandler = async (req: CustomRequest, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json(_.pick(user, "_id", "name", "email", "isAdmin"));
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
export const updateUserProfile: RequestHandler = async (req: CustomRequest, res, next) => {
  const { email, name, password } = req.body as UpdateUserProfile;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) user.password = password!;
  const updatedUser = await user.save();

  return res.status(200).json(_.pick(updatedUser, "_id", "name", "email", "isAdmin"));
};
