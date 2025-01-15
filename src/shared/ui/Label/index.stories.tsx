import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './index';

const meta = {
  title: 'Shared/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Label 컴포넌트는 라벨을 표시하는 데 사용됩니다.',
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      htmlFor: { type: 'text' },
    },
  },
  args: {
    children: '이메일',
    htmlFor: 'email',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 라벨 컴포넌트입니다.',
      },
    },
  },
};
