import { RequestHandler } from "express";
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
export const getUserProfile: RequestHandler = async (req: CustomRequest, res, next) => {};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
export const updateUserProfile: RequestHandler = async (req: CustomRequest, res, next) => {};
