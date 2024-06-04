import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return next(res.status(400).json({ message: "User ID is required" }));
    }

    const userData = await User.getAllUserData(userId);
    res.json(userData);
  } catch (error) {
    console.error("Error retrieving user data", error);
    return next(
      res.status(500).json({ message: "Error retrieving user data" })
    );
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, fields, bio, profile_picture } = req.body;
    const { id } = req.params;

    const userUpdateResult = await User.updateUser(id, username, email, bio, fields);
    // const universityUpdateResult = await User.updateUniversity(id, subject);

    if (userUpdateResult.success) {
      res.status(200).json({
        message: "User and university updated successfully",
        user: {
          id,
          username,
          email,
          bio,
          profile_picture,
          fields,
        },
      });
    } else {
      res.status(400).json({
        message: userUpdateResult.message,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const file: Express.Multer.File = req.file as Express.Multer.File;

  try {
    await User.updateProfilePicture(userId, file);
    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(400).json({ message: "Error updating profile picture" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const isDeleted = await User.deleteUser(Number(id));
    if (!isDeleted) {
      return next(res.status(400).json({ message: "User not found" }));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return next(res.status(500).json({ message: "Error deleting user:" }));
  }
};

