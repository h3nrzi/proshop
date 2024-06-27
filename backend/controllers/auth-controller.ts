import { RequestHandler } from "express";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res, next) => {};

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const register: RequestHandler = async (req, res, next) => {};

// @desc    Logout user (clear cookie)
// @route   POST /api/users/logout
// @access  Public
export const logout: RequestHandler = async (req, res, next) => {};
