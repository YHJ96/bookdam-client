import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Badge, BadgeDelete } from './index';

const meta = {
  title: 'Shared/Badge',
  component: Badge,
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'select', options: ['default', 'selected'] },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Badge 컴포넌트는 뱃지를 표시하는 데 사용됩니다.',
    },
  },
} satisfies Meta<typeof Badge>;

export const Default: StoryObj<typeof Badge> = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 뱃지 컴포넌트입니다. 뱃지를 표시합니다.',
      },
    },
  },
};

export const Selected: StoryObj<typeof Badge> = {
  args: {
    variant: 'selected',
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 뱃지 컴포넌트입니다. 뱃지를 클릭한 경우 선택된 상태로 변경됩니다.',
      },
    },
  },
};

export const Delete: StoryObj<typeof Badge> = {
  parameters: {
    docs: {
      description: {
        story: '삭제 뱃지 컴포넌트입니다. X 아이콘을 클릭하는 경우 뱃지가 삭제됩니다.',
      },
    },
  },
  render: ({ children, ...rest }) => (
    <div className="flex items-center gap-2">
      <Badge {...rest}>
        <>
          {children}
          <BadgeDelete onDelete={fn}></BadgeDelete>
        </>
      </Badge>
    </div>
  ),
};

export default meta;
