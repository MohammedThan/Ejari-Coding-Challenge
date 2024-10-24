// * Imports
import express from "express";

// * Routes
import api from "./api";

const router = express.Router();

router.use("/api", api);

export default router;
