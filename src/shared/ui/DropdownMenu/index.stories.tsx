import type { Meta, StoryObj } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './index';

const meta = {
  title: 'Shared/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger className="w-10">열기</DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>드롭다운 박스</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>아이템1</DropdownMenuItem>
        <DropdownMenuItem>아이템2</DropdownMenuItem>
        <DropdownMenuItem>아이템3</DropdownMenuItem>
        <DropdownMenuItem>아이템4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
