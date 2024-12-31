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
} satisfies Meta<typeof BookmarkEmpty>;

export default meta;

type Story = StoryObj<typeof BookmarkEmpty>;

export const Default: Story = {};
