import z from "zod";
import { PostSchema } from "./Post";

export const PaginatedPostsSchema = z.object({
  content: z.array(PostSchema),
  page: z.object({
    size: z.number(),
    number: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  }),
});

export type PaginatedPosts = z.infer<typeof PaginatedPostsSchema>;
