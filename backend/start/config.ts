import cookieParser from "cookie-parser";
import express, { Express } from "express";
import morgan from "morgan";
import path from "path";

module.exports = (app: Express) => {
  const { NODE_ENV } = process.env;
  const rootDir = path.resolve();

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Logging Request
  if (NODE_ENV === "development") app.use(morgan("dev"));

  // Serve frontend source files
  if (NODE_ENV === "production") app.use(express.static(path.join(rootDir, "/frontend/dist")));

  // Serve Upload Directory
  app.use("/uploads", express.static(path.join(rootDir, "/uploads")));
};
