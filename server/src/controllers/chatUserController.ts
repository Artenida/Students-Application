import { Request, Response } from "express";
import { User, UserDocument } from "../models/ChatUserModel";

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const getUsersForSidebar = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      res.status(401).json({ error: "Unauthorized - No user provided" });
      return;
    }

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
