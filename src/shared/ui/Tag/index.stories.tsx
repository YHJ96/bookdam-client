import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Tag } from './index';

type Story = StoryObj<typeof Tag>;

const meta = {
  title: 'Tag/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '북마크의 태그를 설정합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isDelete: { control: 'boolean', description: '북마크 삭제 기능을 활성화 합니다.' },
    children: { control: 'text', description: '북마크 태그의 내용을 설정합니다.' },
    theme: { control: 'select', description: '북마크 태그의 테마를 설정합니다.' },
  },
  args: {
    onDelete: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300, textAlign: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tag>;

export const Light: Story = {
  args: { children: 'React', theme: 'light' },
};

export const Dark: Story = {
  args: { children: 'React', theme: 'dark' },
};

export const DeleteLight: Story = {
  args: { children: 'React', theme: 'light', isDelete: true },
};

export const DeleteDark: Story = {
  args: { children: 'React', theme: 'dark', isDelete: true },
};

export default meta;
