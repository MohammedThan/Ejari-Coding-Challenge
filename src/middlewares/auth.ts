import { Request, Response, NextFunction } from "express";
import { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from "../config";
const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  // Get the Authorization header
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "No credentials provided." });
    return;
  }

  // Extract the Base64 encoded string and decode it
  const base64Credentials = authHeader.split(" ")[1];


  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );

  const [username, password] = credentials.split(":");


  // Check if the username and password are correct
  if (username === BASIC_AUTH_USERNAME && password === BASIC_AUTH_PASSWORD) {
    next(); // Authentication successful, proceed to the next middleware
  } else {
    res.status(403).json({ message: "Invalid credentials." });
    return;
  }
};

export default basicAuth;
