import express from "express";
import books from "./books";

const router = express();

router.use("/books", books);

export default router;
