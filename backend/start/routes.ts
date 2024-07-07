import { Express } from "express";
import errorHandler from "../controllers/error-handler";
import notFound from "../middlewares/notFound";
import orderRoutes from "../routes/order-router";
import productRoutes from "../routes/product-router";
import userRoutes from "../routes/user-router";

module.exports = (app: Express) => {
  const { PAYPAL_CLIENT_ID } = process.env;

  app.get("/api/config/paypal", (req, res) => res.send({ clientId: PAYPAL_CLIENT_ID }));
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
  app.get("/", (req, res) => res.status(200).send("API running..."));
  app.use("*", notFound);

  app.use(errorHandler);
};
