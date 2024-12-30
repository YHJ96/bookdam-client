import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './index';

const meta = {
  title: 'Shared/Label',
  component: Label,
  tags: ['autodocs'],
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

export const Default: Story = {};
