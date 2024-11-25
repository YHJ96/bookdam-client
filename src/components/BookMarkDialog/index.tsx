'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { z } from 'zod';

import { ConfirmDialog } from '@/components';
import { useDialog } from '@/shared/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

const formSchema = z.object({
  title: z.string().min(1, {
    message: '제목을 입력해주세요.',
  }),
  url: z.string().url({
    message: '올바른 URL 형식을 입력해주세요.',
  }),
});

interface BookMarkDialogProps {
  title: string;
  description: string;
  resolve: (value: unknown) => void;
}

/* [TODO] 레이아웃 시프트 현상 수정*/
/* Schema 폴더 정리 */
function BookMarkDialog({ title, description }: BookMarkDialogProps) {
  const open = useDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const handleOnSumbit = async () => {
    await open(ConfirmDialog, { title: '북마크 추가', description: '북마크를 추가하시겠습니까?' });
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className={cn('bg-white sm:max-w-[425px]')}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSumbit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="북마크 제목" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="space-y-2">
            <Label>태그</Label>
            <div className="flex space-x-2">
              <Input placeholder="태그 추가" />
              <Button type="button" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

            <div className="h-4" />

            <Button type="submit" className="w-full">
              {title}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BookMarkDialog;
