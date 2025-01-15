import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

const meta = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'text',
    placeholder: 'Text',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Input 컴포넌트는 텍스트 입력을 받는 데 사용됩니다.',
    },
  },
  render: (args) => <Input {...args} className="w-96" />,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 입력 컴포넌트입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '비활성화된 입력 컴포넌트입니다.',
      },
    },
  },
  args: { disabled: true },
};
