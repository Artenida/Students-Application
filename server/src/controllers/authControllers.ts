import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await User.findByUsername(req.body.username);
    if (existingUser.length > 0) {
      return res.status(409).json({message: "User already exists"});
    } else {
      const success = await User.createUser(
        req.body.username,
        req.body.email,
        req.body.password
      );
      if (success) {
        return res.status(201).json({message: "User has been created"});
      } else {
        return res.status(400).json({message: "Failed to create user"});
      }
    }
  } catch (error) {
    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: any[] = await User.findByUsername(req.body.username);
    if (userData.length === 0) {
      return res.status(400).json({message: "User not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      userData[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({message: "Wrong username or password!"});
    }

    const token = jwt.sign(
      { id: userData[0].id },
      process.env.ACCESS_TOKEN_SECRET as Secret
    );

    const { password: pass, ...rest } = userData[0];

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Sign in successfully",
      user: rest,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};
