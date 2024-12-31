import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import BookmarkTagFilter from './index';

const meta: Meta<typeof BookmarkTagFilter> = {
  title: 'Component/BookmarkTagFilter',
  component: BookmarkTagFilter,
  argTypes: {
    tags: {
      control: {
        type: 'object',
      },
    },
    selectedTags: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    tags: ['취미', '공부', '일'],
    selectedTags: ['취미'],
    toggleTag: action('toggleTag'),
  },
} satisfies Meta<typeof BookmarkTagFilter>;

export default meta;

type Story = StoryObj<typeof BookmarkTagFilter>;

export const Default: Story = {};
