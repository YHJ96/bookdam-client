import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import BookmarkSearchInput from './index';

const meta: Meta<typeof BookmarkSearchInput> = {
  title: 'Component/BookmarkSearchInput',
  component: BookmarkSearchInput,
  argTypes: {
    search: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    search: '',
    setSearch: action('setSearch'),
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookmarkSearchInput>;

export default meta;

type Story = StoryObj<typeof BookmarkSearchInput>;

export const Default: Story = {};
