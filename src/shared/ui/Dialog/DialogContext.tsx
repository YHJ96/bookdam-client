'use client';

import { createContext } from 'react';

import useDialogContoller from './useDialogContoller';

type DialogContextProps = ReturnType<typeof useDialogContoller> | null;

const DialogContext = createContext<DialogContextProps>(null);

export default DialogContext;
