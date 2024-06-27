import { RequestHandler } from "express";
import _ from "lodash";
import LoginDto from "../dtos/User/LoginDto";
import User from "../models/user";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as LoginDto;

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

  return res.status(200).json(_.pick(user, "name", "email", "isAdmin"));
};

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const register: RequestHandler = async (req, res) => {};

// @desc    Logout user (clear cookie)
// @route   POST /api/users/logout
// @access  Public
export const logout: RequestHandler = async (req, res) => {};
