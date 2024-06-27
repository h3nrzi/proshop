import { Express } from "express";
import errorHandler from "../controllers/error-handler";
import notFound from "../middlewares/notFound";
import productRoutes from "../routes/product-router";
import userRoutes from "../routes/user-router";

module.exports = (app: Express) => {
  app.get("/", (req, res) => res.status(200).send("API running..."));
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("*", notFound);

  app.use(errorHandler);
};
