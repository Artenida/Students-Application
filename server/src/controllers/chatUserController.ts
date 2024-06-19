// import { Request, Response } from "express";
// import { User, UserDocument } from "../models/ChatUserModel";

// interface AuthenticatedRequest extends Request {
//   user?: UserDocument;
// }

// export const getUsersForSidebar = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//   try {
//     const loggedInUserId = req.user?._id;

//     if (!loggedInUserId) {
//       res.status(401).json({ error: "Unauthorized - No user provided" });
//       return;
//     }

//     const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

//     res.status(200).json(filteredUsers);
//   } catch (error: any) {
//     console.error("Error in getUsersForSidebar: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import { Request, Response } from "express";
import { User, UserDocument } from "../models/ChatUserModel";

interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

export const getUsersForSidebar = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Extract the username from the request body
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ error: "Bad Request - Username not provided" });
      return;
    }

    // Check if the user already exists in the MongoDB database
    let user = await User.findOne({ username });

    // If the user does not exist, create a new user
    if (!user) {
      user = new User({ username });
      await user.save();
    }

    // Get the ID of the logged-in user from MongoDB
    const loggedInUserId = user._id;

    // Retrieve all users except the logged-in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });

    // Return the list of users
    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
