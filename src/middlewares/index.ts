import express from "express";
import cors from "cors";

const middlewares = (app: express.Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: true,
    })
  );
};

export default middlewares;
