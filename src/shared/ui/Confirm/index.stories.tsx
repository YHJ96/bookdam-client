import { Meta, StoryObj } from '@storybook/react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';

interface ConfirmProps {
  title: string;
  description: string;
  defaultOpen?: boolean;
}

const meta = {
  title: 'Shared/Confirm',
  component: Dialog,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    title: '제목',
    description: '내용',
  },
  render: (args) => (
    <Dialog defaultOpen={false} {...args}>
      <DialogTrigger>
        <Button>확인</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] md:max-w-[425px]">
        <DialogHeader className="mb-6">
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 md:gap-0">
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button>확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<ConfirmProps>;

export default meta;

type Story = StoryObj<ConfirmProps>;

export const Default: Story = {};
