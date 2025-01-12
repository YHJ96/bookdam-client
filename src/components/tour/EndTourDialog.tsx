import React from 'react';

import { Button, Dialog, DialogClose, DialogHeader, DialogNoCloseButtonContent, DialogTitle, Form } from '@/shared/ui';

interface EndTourDialogProps {
  resolve: (value: boolean) => void;
}

function EndTourDialog({ resolve }: EndTourDialogProps) {
  const handleOnClick = () => resolve(true);

  return (
    <Dialog defaultOpen modal={true}>
      <DialogNoCloseButtonContent
        id="bookmark-create-dialog"
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>시작 가이드 완료!</DialogTitle>
        </DialogHeader>

        <div className="my-6 space-y-2 text-center">
          <p className="mb-3 text-lg font-semibold">축하합니다! 🎉</p>
          <p>시작 가이드를 성공적으로 마치셨습니다.</p>
          <p>이제 본격적으로 서비스를 이용해보세요.</p>
        </div>

        <DialogClose asChild>
          <Button onClick={handleOnClick}>북마크 추가하러 가기</Button>
        </DialogClose>
      </DialogNoCloseButtonContent>
    </Dialog>
  );
}

export default EndTourDialog;
