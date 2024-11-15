import React from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

interface ConfirmDialog {
  title: string;
  description: string;
  resolve: (bool: boolean) => void;
}

function ConfirmDialog({ title, description, resolve }: ConfirmDialog) {
  const handleOnClick = (bool: boolean) => async () => resolve(bool);

  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-[340px] md:max-w-[425px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-black dark:text-white">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 md:gap-0">
          <DialogClose asChild>
            <Button className="dark:text-white" variant="outline" onClick={handleOnClick(false)}>
              취소
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleOnClick(true)}>확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
