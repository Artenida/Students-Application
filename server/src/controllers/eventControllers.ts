import { NextFunction, Request, Response } from "express";
import Event from "../models/Event";

type EventInputs = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  music: string;
  user_id: string;
  cost: string;
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

export const getSingleEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;

    const post = await Event.getEventById(id);

    return res.status(200).json({ success: true, data: post });
  } catch (error: any) {
    console.error("Error getting events", error);
    if (error.message === "Event does not exist") {
      return res.status(404).json({ success: false, error: "Event not found" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
};
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id, title, description, date, location, user_id, music, cost } = req.body;
    const files: Express.Multer.File[] = Array.isArray(req.files)
      ? req.files
      : [];
    const inputs: EventInputs = { id, title, description, date, location, user_id, files, music, cost };
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
