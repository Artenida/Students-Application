import { NextFunction, Request, Response } from "express";
import Event from "../models/Event";

type EventInputs = {
  title: string;
  description: string;
  date: Date;
  location: string;
  details: string;
  user_id: string;
  files: Express.Multer.File[];
};

export const allEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Event.getEvents();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error getting events", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, date, location, details, user_id } = req.body;
    const files: Express.Multer.File[] = Array.isArray(req.files)
      ? req.files
      : [];
    const inputs: EventInputs = { title, description, date, location, details, user_id, files };
    await Event.createEvent(inputs);
    res
      .status(200)
      .json({ success: true, message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event", error);
    if (error === "Post not found") {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(500).json({ error: "An error ocurred" });
    }
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
      await Event.deleteEventById(postId);
      res.status(200).json("Event has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const searchEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = req.query.keyword as string;
    const data = await Event.searchEvent(keyword);
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json("Error getting events");
  }
};
