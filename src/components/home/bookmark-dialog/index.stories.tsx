/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import type { StoryObj } from '@storybook/react';

import { DialogProvider } from '@/shared/ui';
import useDialog from '@/shared/ui/Dialog/useDialog';
import useDialogContoller from '@/shared/ui/Dialog/useDialogContoller';

import BookmarkDialog from './BookmarkCreateDialog';

type OpenDialog = Parameters<ReturnType<typeof useDialogContoller>['push']>;

const meta = {
  title: 'Component/BookmarkDialog',
  decorators: [
    (Story: React.ComponentType<any>) => {
      return (
        <DialogProvider>
          <Story />
        </DialogProvider>
      );
    },
  ],
  parameters: {
    docs: {
      subtitle: 'BookmarkDialog 컴포넌트는 북마크를 생성 및 수정하는 데 사용됩니다.',
    },
  },
  render: (args: OpenDialog) => {
    const open = useDialog();

    return <button onClick={() => open(args[0], args[1])}>열기</button>;
  },
};

export default meta;

type Story = StoryObj<OpenDialog>;

export const Default: Story = {
  args: [BookmarkDialog, { title: '북마크 추가', description: '북마크를 추가하시겠습니까?' }],
};
