import type { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';

import { Button } from './index';

const meta = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Button 컴포넌트는 버튼을 표시하는 데 사용됩니다.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 버튼 컴포넌트입니다.',
      },
    },
  },
};

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story: '테두리가 있는 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  parameters: {
    docs: {
      description: {
        story: '배경이 없는 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'ghost',
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: '두번째 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story: '삭제 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'destructive',
  },
};

export const Link: Story = {
  parameters: {
    docs: {
      description: {
        story: '링크 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'link',
  },
};

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story: '작은 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  parameters: {
    docs: {
      description: {
        story: '큰 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    size: 'lg',
  },
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story: '아이콘이 있는 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    size: 'icon',
    children: <Mail />,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '비활성화된 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    disabled: true,
  },
};
