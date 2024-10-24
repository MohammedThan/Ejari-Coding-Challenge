import { Schema, model } from "mongoose";
import { Book } from "../schema/books";

const BookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: true,
  },
});

// Create a Mongoose model for the book
const Book = model<Book>("Book", BookSchema);

export default Book;
