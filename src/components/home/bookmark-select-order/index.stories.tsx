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
} satisfies Meta<typeof BookmarkSelectOrder>;

export default meta;

type Story = StoryObj<typeof BookmarkSelectOrder>;

export const Default: Story = {};
