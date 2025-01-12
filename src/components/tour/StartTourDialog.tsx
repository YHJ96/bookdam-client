'use client';

import React, { useRef } from 'react';

import { useUser, useUserUtils } from '@/entities/user';
import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogNoCloseButtonContent,
  DialogTitle,
} from '@/shared/ui';
import { useTourStore } from '@/store';

function StartTourDialog() {
  const { role } = useUser();
  const { setRole } = useUserUtils();
  const { startTour } = useTourStore();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleStartButtonOnClick = () => {
    if (role === 'tourist') return;
    setRole('tourist');
    timerRef.current = setTimeout(() => startTour(role));
  };

  const handleOnAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName !== 'exit') return;
    clearTimeout(timerRef.current);
  };

  const handleOnCheckedChange = (checked: boolean) => {
    document.cookie = `tutorial=${!checked}; path=/; max-age=${60 * 60 * 24 * 7}`;
  };

  return (
    <Dialog defaultOpen modal={true}>
      <DialogNoCloseButtonContent
        id="bookmark-create-dialog"
        className="sm:max-w-[425px]"
        onAnimationEnd={handleOnAnimationEnd}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>북마크 튜토리얼</DialogTitle>
          <DialogDescription>북마크 기능 사용법에 대한 튜토리얼을 보시겠습니까?</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="isChecked" onCheckedChange={handleOnCheckedChange} />
            <label
              htmlFor="isChecked"
              className="cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              일주일 동안 다시 묻지 않기
            </label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">아니요</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleStartButtonOnClick}>예, 튜토리얼을 보겠습니다</Button>
          </DialogClose>
        </DialogFooter>
      </DialogNoCloseButtonContent>
    </Dialog>
  );
}

export default StartTourDialog;
