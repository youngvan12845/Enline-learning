import express, { Request, Response, NextFunction } from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrderAnalytics,
  getUsersAnalytics,
} from "../controller/analytics.controller";

const analyticsRouter = express.Router();

// 获取用户分析
analyticsRouter.get(
  "/users",
  isAuthenticated,
  authorizeRoles("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUsersAnalytics(req, res, next);
    } catch (err) {
      next(err); // 传递错误到错误处理中间件
    }
  }
);

// 获取订单分析
analyticsRouter.get(
  "/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getOrderAnalytics(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

// 获取课程分析
analyticsRouter.get(
  "/courses",
  isAuthenticated,
  authorizeRoles("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getCoursesAnalytics(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export { analyticsRouter };
