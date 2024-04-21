import express, { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  updateProfilePicture,
  updateBio,
  // changePassword,
  // changePassword,
} from "../controllers/userControllers";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(verifyToken);
router.use("/find/:userId", getUser);
router.put("/updateUser/:userId", updateUser);
router.put("/updateBio/:id", updateBio);
// router.put("/changePassword/:id", changePassword);
router.delete("/delete/:userId", deleteUser);
router.put("/updatePicture", upload.single("files"), updateProfilePicture);

export default router;
