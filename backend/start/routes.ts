import { Express } from "express";
import productRoutes from "../routes/product-router";

module.exports = (app: Express) => {
  app.get("/", (req, res) => res.status(200).send("API running..."));
  app.use("/api/products", productRoutes);
};
