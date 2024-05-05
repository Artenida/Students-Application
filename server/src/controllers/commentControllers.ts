import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";

type CommentInputs = {
  commentText: string;
  postId: string;
  userId: string;
};

export const addComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, comment_text } = req.body;
    const { postId } = req.params;
    await Comment.addComments(postId, user_id, comment_text);
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
    const {id} = req.params;
      await Comment.deleteCommentsById(id);
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
