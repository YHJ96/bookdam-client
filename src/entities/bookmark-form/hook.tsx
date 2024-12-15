import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { formSchema } from './schema';

type UseBookmarkFormProps = {
  title?: string;
  description?: string;
  url?: string;
};

export const useBookmarkForm = ({ title, description, url }: UseBookmarkFormProps = {}) => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: title ?? '',
      description: description ?? '',
      url: url ?? '',
    },
  });
};
