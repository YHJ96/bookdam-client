import type { Meta, StoryObj } from '@storybook/react';

import BookMarkDialog from './index';

type Story = StoryObj<typeof BookMarkDialog>;

const meta = {
  title: 'Modal/BookMark',
  component: BookMarkDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '북마크 추가 및 수정을 할 수 있는 모달입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: 300, textAlign: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookMarkDialog>;

export const Default: Story = {
  args: {},
};

export default meta;
