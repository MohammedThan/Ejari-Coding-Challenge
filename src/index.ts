// * Imports
import express from "express";
import cors from "cors";

// * Routes
import routes from "./routes";

// * Database
import connectDB from "./database";

// * Config
import { PORT } from "./config";

connectDB();

const app = express();

// * Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Ejari coding challenge!");
});

// * Routes:
app.use(routes);

// * Invalid requests (non-existing routes):
app.use((req, res) => {
  res.status(404).send({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      statusCode: 404,
    },
    message: "Invalid Request",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
