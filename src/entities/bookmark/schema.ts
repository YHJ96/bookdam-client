import { z } from 'zod';

export const bookmarkSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
);
