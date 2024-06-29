import express from "express";
import * as orderController from "../controllers/order-controller";
import * as auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

////////// Private
router.use(catchAsync(auth.protect));

router.post("/", catchAsync(orderController.createOrder));
router.get("/:id", catchAsync(orderController.getOrder));
router.get("/myorders", catchAsync(orderController.getMyOrders));
router.patch("/:id/pay", catchAsync(orderController.updateOrderToPaid));

////////// Admin
router.use(catchAsync(auth.admin));

router.get("/", catchAsync(orderController.getAllOrders));
router.patch("/:id/deliver", catchAsync(orderController.updateOrderToDeliver));

export default router;
