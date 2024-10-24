import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishedDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Published date must be a valid date",
  }),
  numberOfPages: z
    .number()
    .int()
    .positive("Number of pages must be a positive integer"),
});

export type Book = z.infer<typeof bookSchema>;

export default bookSchema;
