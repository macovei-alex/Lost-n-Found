import z from "zod";

export const MeSchema = z.object({
  id: z.int(),
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string().nullish(),
  createdAt: z.coerce.date(),
  profileImageName: z.string().nullish(),
});

export type Me = z.infer<typeof MeSchema>;
