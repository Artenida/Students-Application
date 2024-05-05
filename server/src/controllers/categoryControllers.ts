import { NextFunction, Request, Response } from "express";
import { Category } from "../models/Category";

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tags = await Category.getCategories();
      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error("Error getting categories", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };