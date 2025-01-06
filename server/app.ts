require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import { courseRouter } from "./routes/course.route";
import { orderRouter } from "./routes/order.route";
import { notificationRouter } from "./routes/notification.route";
import { analyticsRouter } from "./routes/analytics.route";
import { layoutRouter } from "./routes/layout.route";

// create a server
export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parse
app.use(cookieParser());

// cors =>
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// define root route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API! Use /api/v1 for available endpoints.",
  });
});

// routes
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

// testing route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


// middleware calls
app.use(ErrorMiddleware);
