import z from "zod";

export const MessageSchema = z.object({
  id: z.int(),
  chatId: z.int(),
  senderId: z.int(),
  textContent: z.string(),
  sentAt: z.string().transform((v) => new Date(v)),
  images: z.array(
    z.object({
      id: z.int(),
      imageName: z.string(),
    }),
  ),
});

export type Message = z.infer<typeof MessageSchema>;
