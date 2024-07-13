import { Express } from "express";
import path from "path";
import errorHandler from "../controllers/error-handler";
import notFound from "../middlewares/notFound";
import orderRoutes from "../routes/order-router";
import productRoutes from "../routes/product-router";
import uploadRoutes from "../routes/upload-router";
import userRoutes from "../routes/user-router";

module.exports = (app: Express) => {
  const { PAYPAL_CLIENT_ID, NODE_ENV } = process.env;
  const rootDir = path.resolve();

  app.get("/api/config/paypal", (req, res) => res.send({ clientId: PAYPAL_CLIENT_ID }));
  app.use("/api/upload", uploadRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
  if (NODE_ENV === "production") {
    app.get("*", (req, res) => res.sendFile(path.join(rootDir, "/frontend/dist/index.html")));
  } else {
    app.get("/", (req, res) => res.send("API is running..."));
  }
  app.use("*", notFound);

  app.use(errorHandler);
};
