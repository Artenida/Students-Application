import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";

type PostInputs = {
  title: string;
  description: string;
  user_id: string;
  files: Express.Multer.File[];
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.getPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error in getPosts", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;

    const post = await Post.getPostById(postId);

    return res.status(200).json({ success: true, data: post });
  } catch (error: any) {
    console.error("Error in getPost", error);
    if (error.message === "Post does not exist") {
      return res.status(404).json({ success: false, error: "Post not found" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, user_id } = req.body;
    const files: Express.Multer.File[] = Array.isArray(req.files)
      ? req.files
      : [];
    const inputs: PostInputs = { title, description, user_id, files };
    await Post.createPost(inputs);
    res
      .status(200)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post", error);
    if (error === "Post not found") {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
      await Post.deletePostById(postId);
      res.status(200).json("Post has been deleted!");
  } catch (error) {
    next(error);
  }
};

// export const updatePost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { title, description, tags } = req.body;
//     const postId = req.params.id;
//     try {
//       await Post.updatePost(title, description, postId, tags);
//       res.status(200).json("Post has been updated!");
//     } catch (error) {
//       res.status(403).json("Your post wasn't updated");
//     }
//   } catch (error) {
//     console.error("Error in updatePost controller:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

export const getUsersPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId} = req.params;
    const userPosts = await Post.getUsersPost(userId);
    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error in getUsersPost", error);
    next(error);
  }
};

export const getPaginatedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await Post.getPosts();
    let { page, limit } = req.query;

    if (page && limit) {
      const pageAsNumber = parseInt(page as string);
      const limitAsNumber = parseInt(limit as string);

      if (
        !isNaN(pageAsNumber) &&
        !isNaN(limitAsNumber) &&
        pageAsNumber > 0 &&
        limitAsNumber > 0
      ) {
        const startIndex = (pageAsNumber - 1) * limitAsNumber;
        const endIndex = pageAsNumber * limitAsNumber;

        const results: {
          next?: { pageAsNumber: number };
          prev?: { pageAsNumber: number };
          result: any[];
          totalPosts?: number;
          pageCount?: number;
        } = { result: [] };
        results.totalPosts = allPosts.length;
        results.pageCount = Math.ceil(allPosts.length / limitAsNumber);

        if (endIndex < allPosts.length) {
          results.next = {
            pageAsNumber: pageAsNumber + 1,
          };
        }
        if (startIndex > 0) {
          results.prev = {
            pageAsNumber: pageAsNumber - 1,
          };
        }

        results.result = allPosts.slice(startIndex, endIndex);

        return res.json(results);
      }
    }

    throw new Error("Invalid page or limit parameter");
  } catch (error) {
    console.error("Error in getPaginatedPosts:", error);
    res.status(500).json({ error: "Error in getPaginatedPosts" });
  }
};

export const searchPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = req.query.keyword as string;
    const data = await Post.searchPost(keyword);
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json("Error getting posts");
  }
};

// export const getBloggersPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.params.userId;
//     const userPosts = await Post.retrieveBlogsByUser(userId);
//     res.status(200).json(userPosts);
//   } catch (error) {
//     console.error("Error in getBloggersPost", error);
//     next(error);
//   }
// };
