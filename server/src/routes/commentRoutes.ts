import express from "express";
import {
  createPost,
  deletePost,
  getSinglePost,
  getPosts,
  getUsersPost,
  getPaginatedPosts,
  searchPosts,
  // getBloggersPost,
} from "../controllers/postControllers";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../middleware/validations";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";
import { addComments, deleteComments, getComments } from "../controllers/commentControllers";

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, files, cb) {
    cb(null, files.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/getSinglePost/:postId", getComments);
router.get("/addComment/:postId", verifyToken, addComments);
router.delete("/deleteComment/:commentId", verifyToken, deleteComments);

export default router;
