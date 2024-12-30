import type { Meta, StoryObj } from '@storybook/react';

import { Popover, PopoverContent, PopoverTrigger } from './index';

const meta = {
  title: 'Shared/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'radio',
      options: ['center', 'start', 'end'],
    },
    children: {
      control: 'text',
    },
    side: {
      control: 'radio',
      options: ['bottom', 'left', 'right', 'top'],
    },
  },
  args: {
    align: 'center',
    children: 'Popover',
    side: 'bottom',
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger>열기</PopoverTrigger>
      <PopoverContent {...args} />
    </Popover>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PopoverContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
