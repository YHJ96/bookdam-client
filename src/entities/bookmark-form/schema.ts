import z from 'zod';

export const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url({
    message: '올바른 URL 형식을 입력해주세요.',
  }),
});
