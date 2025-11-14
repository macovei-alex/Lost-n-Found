import z from "zod";
import { FeedPostSchema } from "./FeedPost";

export const PaginatedPostsSchema = z.object({
  content: z.array(FeedPostSchema),
  page: z.object({
    size: z.number(),
    number: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  }),
});

export type PaginatedPosts = z.infer<typeof PaginatedPostsSchema>;
