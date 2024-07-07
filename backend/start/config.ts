import cookieParser from "cookie-parser";
import express, { Express } from "express";
import morgan from "morgan";
// import cors from "cors";
import cookieParser from "cookie-parser";

module.exports = (app: Express) => {
  const { NODE_ENV } = process.env;

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Logging Request
  if (NODE_ENV === "development") app.use(morgan("dev"));

  // CORS Origin Request
  // app.use(cors());
};
