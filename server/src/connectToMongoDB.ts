import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async (): Promise<void> => {
  const mongoDbUrl = process.env.MONGO_DB_URL;

  if (!mongoDbUrl) {
    throw new Error("MONGO_DB_URL is not defined in the environment variables");
  }

  try {
    await mongoose.connect(mongoDbUrl);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDB;
