import type { Meta, StoryObj } from '@storybook/react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './index';

const meta: Meta<typeof SheetContent> = {
  title: 'Shared/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    side: 'right',
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger>열기</SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>제목</SheetTitle>
          <SheetDescription>내용</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>
            <button className="hover:underline">취소</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SheetContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
