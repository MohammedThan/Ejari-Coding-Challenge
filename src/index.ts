// * Imports
import express from "express";
import cors from "cors";

// * Routes
import routes from "./routes";

const app = express();
const port = 5000;

// * Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? why cors?
app.use(
  cors({
    origin: true,
  })
);

app.get("/", (req, res) => {
  //!  change the text here
  res.send("Hello, Welcome to Ejari coding challenge!");
});

// * Routes:
app.use(routes);

// * Invalid requests (non-existing routes):
//! check below info
//? why are there multiple errors returned -> so different apps can use the api
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
