'use client';

import React from 'react';

import { Plus } from 'lucide-react';

import { ConfirmDialog } from '@/components';
import { useBookmarkForm } from '@/entities';
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

interface BookMarkDialogProps {
  title: string;
  description: string;
  resolve: (value: { title: string; description: string; url: string }) => void;
}

/* [TODO] 레이아웃 시프트 현상 수정*/
function BookMarkDialog({ title, description, resolve }: BookMarkDialogProps) {
  const open = useDialog();
  const form = useBookmarkForm();

  const handleOnSumbit = async () => {
    const isConfirm = await open(ConfirmDialog, { title: '북마크 추가', description: '북마크를 추가하시겠습니까?' });
    if (!isConfirm) return;
    resolve({ ...form.getValues() });
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
              name="description"
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
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Input placeholder="북마크 내용" {...field} />
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
