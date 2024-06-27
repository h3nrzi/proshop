import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import CustomRequest from "../types/CustomRequest";

export const protect: RequestHandler = async (req: CustomRequest, res, next) => {
  let token = "";

  token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = await User.findById(decoded.userId).select("-password");
    return next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed!");
  }
};

export const admin: RequestHandler = async (req: CustomRequest, res, next) => {
  if (req.user && req.user.isAdmin) return next();

  res.status(401);
  throw new Error("Not authorized as admin!");
};
