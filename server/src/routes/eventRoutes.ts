import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";
import { allEvents, createEvent, deleteEvent, getSingleEvent, searchEvent } from "../controllers/eventControllers";

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
router.get("/getSingleEvent/:id", getSingleEvent);
router.post("/createEvent", upload.array("file", 8), createEvent);
router.delete("/deleteEvent/:id", deleteEvent);
router.get("/searchEvent", searchEvent);

export default router;
