import { Express } from "express";
const app = require("express")() as Express;
import products from "./data/products";

app.get("/", (req, res) => res.status(200).send("API running..."));

app.get("/api/products", (req, res) => res.status(200).json(products));

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.status(200).json(product);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
