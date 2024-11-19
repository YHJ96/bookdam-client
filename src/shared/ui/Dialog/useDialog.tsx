'use client';

import { useContext } from 'react';

import DialogContext from './DialogContext';

function useDialog() {
  const context = useContext(DialogContext);
  if (context === null) throw new Error('useDialog 반드시 DialogProvider 내부에서 사용해야 합니다.');
  return context.push;
}

export default useDialog;
