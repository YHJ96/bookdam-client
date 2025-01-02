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
    docs: {
      subtitle: 'Tooltip 컴포넌트는 툴팁을 표시하는 데 사용됩니다.',
    },
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

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '위쪽에 툴팁을 표시하는 컴포넌트입니다.',
      },
    },
  },
};

export const Bottom: Story = {
  parameters: {
    docs: {
      description: {
        story: '아래쪽에 툴팁을 표시하는 컴포넌트입니다.',
      },
    },
  },
  args: {
    side: 'bottom',
  },
};

export const Left: Story = {
  parameters: {
    docs: {
      description: {
        story: '왼쪽에 툴팁을 표시하는 컴포넌트입니다.',
      },
    },
  },
  args: {
    side: 'left',
  },
};

export const Right: Story = {
  parameters: {
    docs: {
      description: {
        story: '오른쪽에 툴팁을 표시하는 컴포넌트입니다.',
      },
    },
  },
  args: {
    side: 'right',
  },
};
