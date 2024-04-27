import { Request, Response, NextFunction } from "express";

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

export const validateDeleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  next();
};

export const validateCreatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json("Please fill out all fields");
  }
  next();
};

export const validateUpdatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json("Cannot send empty values");
  }
  next();
};
