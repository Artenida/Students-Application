import express from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { addComments, deleteComments, getComments } from "../../controllers/Forum/commentControllers";

const router = express.Router();

router.get("/getCommentsForPost/:postId", getComments);
router.post("/addComment/:postId", addComments);
router.delete("/deleteComment/:commentId", deleteComments);

export default router;
