import type { Meta, StoryObj } from '@storybook/react';

import TrashBookmarkEmpty from './index';

const meta: Meta<typeof TrashBookmarkEmpty> = {
  title: 'Component/TrashBookmarkEmpty',
  component: TrashBookmarkEmpty,
  parameters: {
    docs: {
      description: {
        story: '휴지통에 들어있는 북마크가 없을 때 표시되는 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof TrashBookmarkEmpty>;

export default meta;

type Story = StoryObj<typeof TrashBookmarkEmpty>;

export const Default: Story = {};
