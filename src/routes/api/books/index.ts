import express from "express";

const router = express();

router.get("/", (req, res) => {
  res.send({ message: "books" });
});

export default router;
