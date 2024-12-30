import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

const meta = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
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
  },
  render: (args) => <Input {...args} className="w-96" />,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
