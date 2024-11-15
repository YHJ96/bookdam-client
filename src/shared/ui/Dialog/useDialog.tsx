'use client';

import { useContext } from 'react';

import DialogContext from './DialogContext';

function useDialog() {
  const context = useContext(DialogContext);
  if (context === null) throw new Error('프로바이더를 제공해야합니다.');
  return context.push;
}

export default useDialog;
