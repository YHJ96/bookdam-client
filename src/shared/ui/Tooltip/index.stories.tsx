import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './index';

const meta: Meta<typeof TooltipContent> = {
  title: 'Shared/Tooltip',
  component: TooltipContent,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'radio' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    children: {
      control: 'text',
    },
    sideOffset: {
      control: 'number',
    },
  },
  args: {
    side: 'top',
    children: '툴팁',
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    side: 'bottom',
  },
};

export const Left: Story = {
  args: {
    side: 'left',
  },
};

export const Right: Story = {
  args: {
    side: 'right',
  },
};
