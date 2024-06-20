import express, { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  updateProfilePicture,
  resetPassword,
  changePassword,
  // addSocialMediaAccounts,
  // deleteSocialMediaAccounts,
  // changePassword,
} from "../../controllers/Forum/userControllers";
import { verifyToken } from "../../middleware/verifyToken";
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

router.put("/resetPassword", resetPassword);
// router.use(verifyToken);
router.use("/find/:userId", getUser);
router.put("/updateUser/:id", updateUser);
router.put("/changePassword/:id", changePassword);
router.delete("/delete/:id", deleteUser);
router.put("/updatePicture", upload.single("files"), updateProfilePicture);

export default router;
