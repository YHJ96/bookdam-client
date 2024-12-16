'use client';

import { useBookmarkForm } from '@/entities/bookmark-form';
import { useDialog } from '@/shared/hooks';
import {
  Button,
  Confirm,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
} from '@/shared/ui';

import BookmarkFormInput from './BookmarkFormInput';
import BookmarkTagForm from './BookmarkTagForm';
import { useBookmarkDialogTag } from './hooks';

interface BookmarkCreateDialogProps {
  title: string;
  description: string;
  resolve: (value: { title: string; description: string; url: string; tags: string[] }) => void;
}

function BookmarkCreateDialog({ title, description, resolve }: BookmarkCreateDialogProps) {
  const { tags, addTag, deleteTag } = useBookmarkDialogTag();
  const open = useDialog();
  const form = useBookmarkForm();

  const handleOnSumbit = async () => {
    const isConfirm = await open(Confirm, { title: '북마크 추가', description: '북마크를 추가하시겠습니까?' });
    if (!isConfirm) return;
    resolve({ ...form.getValues(), tags });
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="bg-white sm:max-w-[425px]">
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

            <Button type="submit" className="w-full">
              {title}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BookmarkCreateDialog;
