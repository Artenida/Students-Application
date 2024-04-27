import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import eventRoutes from "./routes/eventRoutes";
import path from "path";

dotenv.config();

const app = express();
const base_url = process.env.BASE_URL;

app.use(cors());
app.use(express.json());

const Path = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(Path));

app.use(`${base_url}auth`, authRoutes);
app.use(`${base_url}users`, userRoutes);
app.use(`${base_url}posts`, postRoutes);
app.use(`${base_url}events`, eventRoutes);

app.listen(process.env.DEV_PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.DEV_PORT}`);
});
