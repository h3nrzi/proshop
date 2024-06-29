import { Request, RequestHandler } from "express";

export interface CustomRequest extends Request {
  user?: any;
}

// @desc    Get All Orders
// @route   GET /api/orders
// @access  Admin
export const getAllOrders: RequestHandler = async (req, res, next) => {};

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrder: RequestHandler = async (req, res, next) => {};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder: RequestHandler = async (req: CustomRequest, res, next) => {};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders: RequestHandler = async (req: CustomRequest, res, next) => {};

// @desc    Update order to paid
// @route   PATCH /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid: RequestHandler = async (req, res, next) => {};

// @desc    Update order to delivered
// @route   PATCH /api/orders/:id/deliver
// @access  Admin
export const updateOrderToDeliver: RequestHandler = async (req, res, next) => {};
