import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const base_url = process.env.BASE_URL;

app.use(cors());
app.use(express.json());

app.use(`${base_url}auth`, authRoutes);

app.listen(process.env.DEV_PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.DEV_PORT}`);
});
