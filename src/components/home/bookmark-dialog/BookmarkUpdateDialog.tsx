'use client';

import { useBookmarkForm } from '@/entities/bookmark-form';
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

import BookmarkFormInput from './BookmarkFormInput';
import BookmarkTagForm from './BookmarkTagForm';
import { useBookmarkDialogTag } from './hooks';

interface BookmarkUpdateDialogProps {
  bookmark: { title: string; description: string; url: string; tags: string[] };
  resolve: (value: { title: string; description: string; url: string; tags: string[] }) => void;
}

function BookmarkUpdateDialog({ bookmark, resolve }: BookmarkUpdateDialogProps) {
  const { tags, addTag, deleteTag } = useBookmarkDialogTag(bookmark.tags);
  const form = useBookmarkForm(bookmark);

  const handleOnSumbit = async () => {
    resolve({ ...form.getValues(), tags });
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>북마크 수정</DialogTitle>
          <DialogDescription>수정할 북마크의 정보를 입력해주세요.</DialogDescription>
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
            <BookmarkFormInput form={form} name="url" label="URL" placeholder="https://example.com" disabled={true} />
            <BookmarkTagForm tags={tags} addTag={addTag} deleteTag={deleteTag} />

            <DialogClose asChild>
              <Button type="submit" className="w-full">
                북마크 수정
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BookmarkUpdateDialog;
