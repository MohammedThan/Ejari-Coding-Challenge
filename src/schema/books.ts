import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishedDate: z
    .string()
    .date()
    .transform((date) => new Date(date)),
  numberOfPages: z
    .number()
    .int()
    .positive("Number of pages must be a positive integer"),
});

export const bookUpdateSchema = bookSchema.partial();
export type Book = z.infer<typeof bookSchema>;

export default bookSchema;
