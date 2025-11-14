import { z } from "zod";

export const FeedPostSchema = z.object({
  id: z.number(),
  idAccount: z.number(),
  postType: z.enum(["LOST", "FOUND"]),
  title: z.string(),
  itemDescription: z.string(),
  location: z.string(),
  createdAt: z.string().transform((v) => (v ? new Date(v) : null)),
  resolvedAt: z
    .string()
    .nullish()
    .transform((v) => (v ? new Date(v) : null)),
  mainImageName: z.string(),
  productLink: z.string().nullish(),
});

export type FeedPost = z.infer<typeof FeedPostSchema>;
