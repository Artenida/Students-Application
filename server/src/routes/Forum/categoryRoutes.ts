import express from "express";
import { getCategories } from "../../controllers/Forum/categoryControllers";

const router = express.Router();

router.get("/getCategories", getCategories)

export default router;