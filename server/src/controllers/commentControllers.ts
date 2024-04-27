import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";

type CommentInputs = {
  commentText: string;
  commentDate: Date;
  postId: string;
  userId: string;
};

export const addComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentText, commentDate, userId } = req.body;
    const { postId } = req.params;
    // const { userId } = req.body.user.id;
    const inputs: CommentInputs = { commentText, commentDate, postId, userId };
    await Comment.addComments(userId, postId, commentText, commentDate);
    res
      .status(200)
      .json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comments", error);
    if (error === "Comment not found") {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deleteComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
      await Comment.deleteCommentsById(postId);
      res.status(200).json("Comment has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {postId} = req.params;
    const userPosts = await Comment.getPostComments(postId);
    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error in getUsersPost", error);
    next(error);
  }
};
