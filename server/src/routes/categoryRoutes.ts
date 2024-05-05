import express from "express";
import { getCategories } from "../controllers/categoryControllers";

const router = express.Router();

router.get("/getCategories", getCategories)

export default router;