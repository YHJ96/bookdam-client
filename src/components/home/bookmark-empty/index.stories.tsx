import type { Meta, StoryObj } from '@storybook/react';

import BookmarkEmpty from './index';

const meta: Meta<typeof BookmarkEmpty> = {
  title: 'Component/BookmarkEmpty',
  component: BookmarkEmpty,
  argTypes: {
    isCSR: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    isCSR: false,
  },
  parameters: {
    docs: {
      subtitle: 'BookmarkEmpty 컴포넌트는 북마크가 없는 경우 표시되는 빈 상태를 나타냅니다.',
    },
  },
} satisfies Meta<typeof BookmarkEmpty>;

export default meta;

type Story = StoryObj<typeof BookmarkEmpty>;

export const Default: Story = {};
