import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getUsersForSidebar } from "../controllers/chatUserController";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
