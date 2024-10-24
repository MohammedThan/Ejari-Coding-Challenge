import { Schema, model } from "mongoose";
import IBook from "../interfaces/books";

const BookSchema = new Schema<IBook>({
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
const Book = model<IBook>("Book", BookSchema);

export default Book;
