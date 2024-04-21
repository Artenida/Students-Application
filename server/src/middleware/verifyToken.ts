import jwt, { Secret } from "jsonwebtoken";
import { errorHandler } from "../utils/error";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers['authorization'];
    const token = headers && headers.split(' ')[1];

    if (!token) {
      throw errorHandler(401, "Unauthorized");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (error, decoded) => {
      if (error) {
        console.error('Invalid token', error);
        throw errorHandler(403, "Invalid token");
      } else {
        console.log('Decoded token', decoded);
        req.body.user = decoded;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
