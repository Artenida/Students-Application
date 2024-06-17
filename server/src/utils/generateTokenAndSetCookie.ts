import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const generateTokenAndSetCookie = (userId: any, res: Response): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevent XSS attacks
    sameSite: "strict", // Prevent CSRF attacks
    // secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
  });
  return token;
};

export default generateTokenAndSetCookie;
