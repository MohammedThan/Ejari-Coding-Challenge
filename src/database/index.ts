import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {});
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
