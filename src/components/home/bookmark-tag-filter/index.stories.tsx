import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import BookmarkTagFilter from './index';

const meta: Meta<typeof BookmarkTagFilter> = {
  title: 'Component/BookmarkTagFilter',
  component: BookmarkTagFilter,
  parameters: {
    docs: {
      subtitle: 'BookmarkTagFilter 컴포넌트는 북마크 태그를 필터링하는 데 사용됩니다.',
    },
  },
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
