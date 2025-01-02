import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import BookmarkSelectOrder from './index';

const meta: Meta<typeof BookmarkSelectOrder> = {
  title: 'Component/BookmarkSelectOrder',
  component: BookmarkSelectOrder,
  argTypes: {
    order: {
      control: {
        type: 'select',
        options: ['asc', 'desc'],
      },
    },
  },
  args: {
    order: 'asc',
    setOrder: action('setOrder'),
  },
  parameters: {
    docs: {
      subtitle: 'BookmarkSelectOrder 컴포넌트는 북마크 정렬 순서를 선택하는 데 사용됩니다.',
    },
  },
} satisfies Meta<typeof BookmarkSelectOrder>;

export default meta;

type Story = StoryObj<typeof BookmarkSelectOrder>;

export const Default: Story = {};
