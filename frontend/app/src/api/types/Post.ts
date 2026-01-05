import { z } from "zod";

export const PostIdSchema = z.number();

export const POST_TYPES = ["LOST", "FOUND"] as const;
export type PostType = (typeof POST_TYPES)[number];

export const PostSchema = z.object({
  id: PostIdSchema,
  idAccount: z.number(),
  postType: z.enum(POST_TYPES),
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
export type CreatePost = Omit<Post, "id" | "idAccount" | "createdAt" | "resolvedAt">;
