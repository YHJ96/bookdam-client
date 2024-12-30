import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './index';

const meta = {
  title: 'Shared/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="flex gap-2">
      <div>왼쪽</div>
      <Separator orientation="vertical" className="h-auto dark:bg-zinc-700" />
      <div>오른쪽</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="grid gap-2">
      <div>위쪽</div>
      <Separator orientation="horizontal" className="dark:bg-zinc-700" />
      <div>아래쪽</div>
    </div>
  ),
};
