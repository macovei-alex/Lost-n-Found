import { z } from "zod";

const envPublicSchema = z
  .object({
    EXPO_PUBLIC_API_BASE_URL: z.string().url(),
  })
  .transform((env) => ({
    API_BASE_URL: env.EXPO_PUBLIC_API_BASE_URL,
  }));

export const envParseResult = envPublicSchema.safeParse({
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
});
export const ENV = (envParseResult.data ?? {}) as z.infer<typeof envPublicSchema>;
