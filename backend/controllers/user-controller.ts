import { RequestHandler } from "express";
import _ from "lodash";
import UpdateUserProfile from "../dtos/User/UpdateUserProfile";
import User from "../models/user";
import CustomRequest from "../types/CustomRequest";

// @desc    Get users
// @route   GET /api/users
// @access  Private -> Admin
export const getAllUsers: RequestHandler = async (req, res, next) => {};

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private -> Admin
export const getUser: RequestHandler = async (req, res, next) => {};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private -> Admin
export const updateUser: RequestHandler = async (req, res, next) => {};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private -> Admin
export const deleteUser: RequestHandler = async (req, res, next) => {};

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
