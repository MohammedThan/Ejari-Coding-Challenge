import express from "express";
import Book from "../../../models/books";

const router = express.Router();
//! make sure response code is correct
// 1. Add a New Book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishedDate, numberOfPages } = req.body;
    const newBook = new Book({
      title,
      author,
      publishedDate: new Date(publishedDate),
      numberOfPages,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding the book", error });
  }
});

// 2. Retrieve a List of All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
});

// 3. Get Details of a Specific Book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
});

// 4. Update a Book's Details
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishedDate, numberOfPages } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishedDate, numberOfPages },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// 5. Delete a Book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
