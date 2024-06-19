import express from "express";
import { contact, login, register } from "../../controllers/Forum/authControllers";
import { validateLogin, validateRegistration } from "../../middleware/validations";

const router = express.Router()

router.post("/login", validateLogin, login)
router.post("/register", validateRegistration, register)
router.post("/contact", contact);
export default router