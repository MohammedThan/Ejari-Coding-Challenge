import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishedDate: z.union([
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Published date must be a valid date",
    }),
    z.string().refine(
      (dateString) => {
        // Regex to validate the date format "YYYY-MM-DD"
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(dateString);
      },
      {
        message: "Published date must be in the format YYYY-MM-DD",
      }
    ),
  ]),
  numberOfPages: z
    .number()
    .int()
    .positive("Number of pages must be a positive integer"),
});

export const bookUpdateSchema = bookSchema.partial();
export type Book = z.infer<typeof bookSchema>;

export default bookSchema;
