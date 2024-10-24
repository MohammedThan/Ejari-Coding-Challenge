import mongoose from "mongoose";
import { z } from "zod";

const idSchema = z.object({
  id: z.string().length(24, { message: "Invalid book ID format" }),
});

export default idSchema;
