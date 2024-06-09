import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import eventRoutes from "./routes/eventRoutes";
import commentRoutes from "./routes/commentRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import chatAuthRoutes from "./routes/chatAuthRoutes";
import messageRoutes from "./routes/messageRoutes";
import chatUserRoutes from "./routes/chatUserRoutes";
import connectToMongoDB from "./connectToMongoDB";
import cookieParser from "cookie-parser";

import path from "path";

dotenv.config();

const app = express();
const base_url = process.env.BASE_URL;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const Path = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(Path));

app.use(`${base_url}auth`, authRoutes);
app.use(`${base_url}users`, userRoutes);
app.use(`${base_url}posts`, postRoutes);
app.use(`${base_url}events`, eventRoutes);
app.use(`${base_url}comments`, commentRoutes);
app.use(`${base_url}categories`, categoryRoutes);

app.use(`${base_url}authChat`, chatAuthRoutes);
app.use(`${base_url}messages`, messageRoutes);
app.use(`${base_url}usersChat`, chatUserRoutes);


app.listen(process.env.DEV_PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${process.env.DEV_PORT}`);
});
