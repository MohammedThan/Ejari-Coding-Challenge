import express from "express";
import Book from "../../../models/books";
import { fromError } from "zod-validation-error";
import bookSchema, { bookUpdateSchema } from "../../../schema/books";
import { z } from "zod";
import idSchema from "../../../schema/id";
import paginationSchema from "../../../schema/pagination";

const router = express.Router();

// 1. Add a New Book
router.post("/", async (req, res) => {
  try {
    const parsedData = bookSchema.parse(req.body);

    const newBook = new Book({
      title: parsedData.title,
      author: parsedData.author,
      publishedDate: new Date(parsedData.publishedDate),
      numberOfPages: parsedData.numberOfPages,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    // Check if the error is from Zod (validation error)
    if (error instanceof z.ZodError) {
      // Format validation errors
      const formattedErrors = fromError(error);

      res.status(400).json({
        message: "Validation error",
        error: formattedErrors, // Send detailed validation errors
      });
      return;
    }

    // Log server errors for debugging
    console.error("Server Error:", error);

    // Generic server error response
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      error,
    });
  }
});

// 2. Retrieve a List of All Books
router.get("/", async (req, res) => {
  try {
    const parsedQuery = paginationSchema.parse(req.query);
    const { page, limit } = parsedQuery;

    const skip = (page - 1) * limit; // Calculate items to skip

    const books = await Book.find().skip(skip).limit(limit);

    const totalBooks = await Book.countDocuments();

    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      totalBooks,
      totalPages,
      currentPage: page,
      books,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = fromError(error);

      res.status(400).json({
        message: "Validation error",
        error: formattedErrors,
      });
      return;
    }

    res.status(500).json({ message: "Error retrieving books", error });
  }
});

// 3. Get Details of a Specific Book
router.get("/:id", async (req, res) => {
  try {
    const validatedParams = idSchema.parse(req.params);

    const book = await Book.findById(validatedParams.id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = fromError(error);

      res.status(400).json({
        message: "Validation error",
        error: formattedErrors,
      });
      return;
    }

    console.error("Server Error:", error);

    res.status(500).json({ message: "Error retrieving book", error });
  }
});

// 4. Update a Book's Details
router.put("/:id", async (req, res) => {
  try {
    const validatedParams = idSchema.parse(req.params);
    const validatedBody = bookUpdateSchema.parse(req.body);

    // Find and update the book
    const updatedBook = await Book.findByIdAndUpdate(
      validatedParams.id,
      validatedBody,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    // Check if the error is from Zod (validation error)
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors;

      res.status(400).json({
        message: "Validation error",
        error: formattedErrors,
      });
      return;
    }

    // Log server errors for debugging
    console.error("Server Error:", error);

    // Generic server error response
    res.status(500).json({ message: "Error updating book", error });
  }
});

// 5. Delete a Book
router.delete("/:id", async (req, res) => {
  try {
    const validatedParams = idSchema.parse(req.params);

    const deletedBook = await Book.findByIdAndDelete(validatedParams.id);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book successfully deleted" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = fromError(error);

      res.status(400).json({
        message: "Validation error",
        error: formattedErrors,
      });
      return;
    }

    console.error("Server Error:", error);

    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
