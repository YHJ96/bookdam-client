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

export const Confirm = ({ title, description, resolve }: ConfirmDialog) => {
  const handleOnClick = (bool: boolean) => async () => resolve(bool);

  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-[340px] md:max-w-[425px]">
        <DialogHeader className="mb-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 md:gap-0">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleOnClick(false)}>
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
};

export default Confirm;
