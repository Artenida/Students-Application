import express from "express";
import { login, register } from "../controllers/authControllers";
import { validateLogin, validateRegistration } from "../middleware/validations";

const router = express.Router()

router.post("/login", validateLogin, login)
router.post("/register", validateRegistration, register)

export default router