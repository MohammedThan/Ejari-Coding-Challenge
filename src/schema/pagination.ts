import { z } from "zod";

const paginationSchema = z.object({
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0, {
      message: "Page must be a positive integer",
    }),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0, {
      message: "Limit must be a positive integer",
    }),
});

export default paginationSchema;
