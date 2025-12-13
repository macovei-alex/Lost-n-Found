import { z } from "zod";

export const PostIdSchema = z.number();

export const PostSchema = z.object({
  id: PostIdSchema,
  idAccount: z.number(),
  postType: z.enum(["LOST", "FOUND"]),
  title: z.string(),
  itemDescription: z.string(),
  location: z.string(),
  createdAt: z.string().transform((v) => new Date(v)),
  resolvedAt: z
    .string()
    .nullish()
    .transform((v) => (v ? new Date(v) : null)),
  mainImageName: z.string(),
  productLink: z.string().nullish(),
});

export const FullPostSchema = PostSchema.extend({
  otherImages: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type Post = z.infer<typeof PostSchema>;
export type FullPost = z.infer<typeof FullPostSchema>;
