import { Request, RequestHandler } from "express";
import CreateProduct from "../dtos/Product/CreateProduct";
import CreateProductReview from "../dtos/Product/CreateProductReview";
import UpdateProduct from "../dtos/Product/UpdateProduct";
import Product from "../models/product";

export interface CustomRequest extends Request {
  user?: any;
}

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getAllProducts: RequestHandler = async (req, res, next) => {
  const { keyword, pageNumber } = req.query;

  const pageSize = 8;
  const page = Number(pageNumber) || 1;
  const searchCriteria = keyword ? { name: { $regex: keyword, $options: "i" } } : {};

  const productsCountDocs = await Product.countDocuments(searchCriteria);
  const pages = Math.ceil(productsCountDocs / pageSize);

  const products = await Product.find(searchCriteria)
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  res.json({ products, page, pages });
};

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
export const getProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  return res.status(200).json(product);
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin
export const createProduct: RequestHandler = async (req: CustomRequest, res, next) => {
  const { name, price, image, brand, category, countInStock, numReviews, description } =
    req.body as CreateProduct;

  console.log(req.body);

  const product = new Product({
    user: req.user._id,
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts: RequestHandler = async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  return res.status(200).json(products);
};

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  admin
export const updateProduct: RequestHandler = async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body as UpdateProduct;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  return res.json(updatedProduct);
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  admin
export const deleteProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: product._id });

  return res.status(200).json({ message: "Product deleted successfully" });
};

// @desc    Upload product image
// @route   PATCH /api/products/:id
// @access  Admin
export const uploadProductImage: RequestHandler = (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  }

  return res.send({
    message: "Image Uploaded",
    image: "/" + req.file.path,
  });
};

// @desc    Create a new review
// @route   POST /api/products/:id/review
// @access  Private
export const createProductReview: RequestHandler = async (req: CustomRequest, res, next) => {
  const { comment, rating } = req.body as CreateProductReview;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // const alreadyReviewed = product.reviews.find(
  //   (review) => review.user.toString() === req.user._id.toString()
  // );
  // if (alreadyReviewed) {
  //   res.status(400);
  //   throw new Error("Product already reviewed");
  // }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating,
    comment,
  };

  await product.addReview(review);
  await product.save();

  res.status(201).json({ message: "Review Added" });
};
