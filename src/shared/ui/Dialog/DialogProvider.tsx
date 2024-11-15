'use client';

import React from 'react';

import DialogContext from './DialogContext';
import useDialogContoller from './useDialogContoller';

interface ModalProviderProps {
  children: React.ReactNode;
}

function DialogProvider({ children }: ModalProviderProps) {
  const controller = useDialogContoller();
  const context = controller.top();

  const handleOnAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName !== 'exit') return;
    controller.pop();
  };

  return (
    <DialogContext.Provider value={controller}>
      <>{children}</>
      {context && (
        <div onAnimationEnd={handleOnAnimationEnd}>
          <context.component key={context.key} resolve={context.resolve} {...context.props} />
        </div>
      )}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
