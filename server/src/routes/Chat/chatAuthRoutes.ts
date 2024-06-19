import express from "express";
import { loginOrRegister, logout, signup } from "../../controllers/Chat/chatAuthControllers";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", loginOrRegister);

router.post("/logout", logout);

export default router;
