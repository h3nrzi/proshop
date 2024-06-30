import { Request, RequestHandler } from "express";
import CreateOrder from "../dtos/Order/CreateOrder";
import Order from "../models/order";

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
export const getOrder: RequestHandler = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }

  return res.json(order);
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder: RequestHandler = async (req: CustomRequest, res, next) => {
  const { orderItems, itemsPrice, paymentMethod, shippingAddress, shippingPrice, taxPrice, totalPrice } =
    req.body as CreateOrder;

  if (!orderItems || orderItems.length === 0) {
    res.status(404);
    throw new Error("No order items");
  }

  const order = new Order({
    orderItems: orderItems.map((orderItem) => ({
      ...orderItem,
      product: orderItem._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders: RequestHandler = async (req: CustomRequest, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).send(orders);
};

// @desc    Update order to paid
// @route   PATCH /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid: RequestHandler = async (req, res, next) => {};

// @desc    Update order to delivered
// @route   PATCH /api/orders/:id/deliver
// @access  Admin
export const updateOrderToDeliver: RequestHandler = async (req, res, next) => {};
