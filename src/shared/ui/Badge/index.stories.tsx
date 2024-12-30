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
  },
} satisfies Meta<typeof Badge>;

export const Default: StoryObj<typeof Badge> = {};

export const Selected: StoryObj<typeof Badge> = {
  args: {
    variant: 'selected',
  },
};

export const Delete: StoryObj<typeof Badge> = {
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
