import { NextFunction, Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

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

    if (userUpdateResult.success) {
      res.status(200).json({
        message: "User updated successfully",
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

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password, email } = req.body;

    const changePassword = await User.resetPassword(password, email);

    if (changePassword.success) {
      res.status(200).json({
        message: "Password changed successfully",
        user: {
          email,
        },
      });
    } else {
      res.status(400).json({
        message: changePassword.message,
      });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Retrieve user by id
    const user = await User.findById(id);
    console.log(user[0].password)

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user[0].password
    );

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid old password" });
      return;
    }

    // Update user's password
    const updateResult = await User.updatePassword(newPassword, id);

    if (updateResult.success) {
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(500).json({ message: "Failed to change password" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
