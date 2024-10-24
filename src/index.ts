// * Imports
import express from "express";

// * Middlewares
import Middlewares from "./middlewares";

// * Routes
import routes from "./routes";

// * Database
import connectDB from "./database";

// * Config
import { PORT } from "./config";

const app = express();

// * Database connection
connectDB();

// * Middlewares
Middlewares(app);

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
