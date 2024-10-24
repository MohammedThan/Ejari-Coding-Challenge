import dotenv from "dotenv";

dotenv.config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ejari-books";

export const PORT = process.env.PORT || 5000;

export const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME || "admin";
export const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || "admin";
