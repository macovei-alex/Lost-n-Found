import { z } from "zod";
import { PageSchema } from "./Page";

export const POST_TYPES = ["LOST", "FOUND"] as const;
export type PostType = (typeof POST_TYPES)[number];

const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type Coordinates = z.infer<typeof CoordinatesSchema>;

export const PostSchema = z.object({
  id: z.number(),
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
  coordinates: CoordinatesSchema,
});

export const FullPostSchema = PostSchema.extend({
  otherImages: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export const PaginatedPostsSchema = z.object({
  content: z.array(PostSchema),
  page: PageSchema,
});

export type Post = z.infer<typeof PostSchema>;
export type FullPost = z.infer<typeof FullPostSchema>;
export type PaginatedPosts = z.infer<typeof PaginatedPostsSchema>;

export type CreatePost = {
  postType: PostType;
  title: string;
  itemDescription: string;
  mainImage: {
    uri: string;
    name: string;
    mimeType?: string;
  } | null;
  productLink?: string;
  location: string;
  coordinates: Coordinates | null;
  otherImages: {
    uri: string;
    name: string;
    mimeType?: string;
  }[];
};
