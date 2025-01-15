import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { bookmarkFormSchema } from './schema';

type UseBookmarkFormProps = {
  title?: string;
  description?: string;
  url?: string;
};

export const useBookmarkForm = ({ title, description, url }: UseBookmarkFormProps = {}) => {
  return useForm<z.infer<typeof bookmarkFormSchema>>({
    resolver: zodResolver(bookmarkFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: title ?? '',
      description: description ?? '',
      url: url ?? '',
    },
  });
};
