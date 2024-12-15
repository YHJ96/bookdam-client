'use client';

import { useRef, useState } from 'react';

import { Plus } from 'lucide-react';

import { ConfirmDialog } from '@/components';
import { useBookmarkForm } from '@/entities';
import { useDialog } from '@/shared/hooks';
import {
  Badge,
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
  Label,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

interface BookMarkUpdateDialog {
  title: string;
  description: string;
  bookmark: { title: string; description: string; url: string; tags: string[] };
  resolve: (value: { title: string; description: string; url: string; tags: string[] }) => void;
}

function BookMarkUpdateDialog({ title, description, bookmark, resolve }: BookMarkUpdateDialog) {
  const [tags, setTags] = useState<string[]>(bookmark.tags);
  const open = useDialog();
  const form = useBookmarkForm(bookmark);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTags = (tag: string) => {
    const findByText = tags.find((_tag) => _tag.toLowerCase() === tag.toLowerCase());
    if (findByText) return;
    setTags((prev) => [...prev, tag]);
  };

  const deleteTags = (tag: string) => () => {
    setTags((prev) => prev.filter((_tag) => _tag !== tag));
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (!e.currentTarget.value) return;
    e.preventDefault();
    addTags(e.currentTarget.value);
    e.currentTarget.value = '';
  };

  const handleOnClick = () => {
    const $input = inputRef.current;
    if ($input === null) return;
    if (!$input.value) return;
    addTags($input.value);
    $input.value = '';
  };

  const handleOnSumbit = async () => {
    const isConfirm = await open(ConfirmDialog, { title: '북마크 수정', description: '북마크를 수정하시겠습니까?' });
    if (!isConfirm) return;
    resolve({ ...form.getValues(), tags });
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
                    <Input placeholder="제목을 작성하지 않으면 페이지의 제목이 들어갑니다." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Input placeholder="제목을 작성하지 않으면 페이지의 내용이 들어갑니다." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="relative space-y-2 pb-6">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" disabled={true} {...field} />
                  </FormControl>
                  <FormMessage className="absolute bottom-0 left-0" />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>태그</Label>
              <div className="flex space-x-2">
                <Input ref={inputRef} placeholder="태그 추가" onKeyDown={handleOnKeyDown} />
                <Button type="button" size="icon" onClick={handleOnClick}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex h-20 flex-wrap items-start gap-1 overflow-y-auto">
              {tags.map((tag) => (
                <Badge key={tag} isDelete={true} onDelete={deleteTags(tag)}>
                  {tag}
                </Badge>
              ))}
            </div>

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

export default BookMarkUpdateDialog;
