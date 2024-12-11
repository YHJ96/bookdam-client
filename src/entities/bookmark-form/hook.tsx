import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { formSchema } from './schema';

export const useBookmarkForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      url: '',
    },
  });
};
