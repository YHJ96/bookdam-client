'use client';

import { Loader2 } from 'lucide-react';

import { useCheckurl } from '@/entities/bookmark';
import { useBookmarkForm } from '@/entities/bookmark-form';
import { useDialog } from '@/shared/hooks';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
} from '@/shared/ui';
import { IfElse } from '@/shared/utils/react';

import BookmarkFormInput from './BookmarkFormInput';
import BookmarkTagForm from './BookmarkTagForm';
import { useBookmarkDialogTag } from './hooks';

interface BookmarkCreateDialogProps {
  title: string;
  description: string;
  resolve: (value: { title: string; description: string; url: string; tags: string[] }) => void;
}

function BookmarkCreateDialog({ title, description, resolve }: BookmarkCreateDialogProps) {
  const { open, close } = useDialog();
  const { tags, addTag, deleteTag } = useBookmarkDialogTag();
  const form = useBookmarkForm();
  const { mutateAsync: checkUrl, isPending } = useCheckurl();

  const urlVaildation = async () => {
    const isUrl = await checkUrl(form.getValues().url);
    if (isUrl) return true;

    form.setError('url', { message: '유효하지 않은 URL 입니다.' });
    return false;
  };

  const handleOnSumbit = async () => {
    const isUrl = await urlVaildation();
    if (!isUrl) return;

    resolve({ ...form.getValues(), tags });
    close();
  };

  return (
    <Dialog defaultOpen>
      <DialogContent id="bookmark-create-dialog" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSumbit)}>
            <BookmarkFormInput
              form={form}
              name="title"
              label="제목"
              placeholder="제목을 작성하지 않으면 페이지의 제목이 들어갑니다."
            />
            <BookmarkFormInput
              form={form}
              name="description"
              label="내용"
              placeholder="제목을 작성하지 않으면 페이지의 내용이 들어갑니다."
            />
            <BookmarkFormInput className="pb-6" form={form} name="url" label="URL" placeholder="https://example.com" />
            <BookmarkTagForm tags={tags} addTag={addTag} deleteTag={deleteTag} />

            <IfElse
              condition={isPending}
              then={
                <Button disabled className="w-full">
                  <Loader2 className="animate-spin" />
                  <span>URL 검증을 진행중입니다.</span>
                </Button>
              }
              other={
                <Button type="submit" className="w-full">
                  {title}
                </Button>
              }
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BookmarkCreateDialog;
