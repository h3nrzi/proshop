import express from "express";
import { getAllProducts, getProduct } from "../controllers/product-controller";
const router = express.Router();
import catchAsync from "../middlewares/catchAsync";

router.get("/", catchAsync(getAllProducts));
router.get("/:id", catchAsync(getProduct));

export default router;
