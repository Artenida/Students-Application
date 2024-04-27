import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";
import { allEvents, createEvent, deleteEvent, searchEvent } from "../controllers/eventControllers";

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

router.get("/allEvents", allEvents);
router.post("/createEvent", verifyToken, upload.array("file", 7), createEvent);
router.delete("/deleteEvent/:id", deleteEvent);
// router.put("/update/:id", verifyToken, validateUpdatePost, updatePost);
router.get("/searchEvent", searchEvent);

export default router;
