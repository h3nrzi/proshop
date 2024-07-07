import express from "express";
import { uploadProductImage } from "../controllers/product-controller";
import * as auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
import upload from "../middlewares/upload";
const router = express.Router();

router.use(auth.protect, auth.admin);
router.post("/", upload.single("image"), catchAsync(uploadProductImage));

export default router;
