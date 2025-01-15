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
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Confirm 컴포넌트는 확인 대화 상자를 표시하는 데 사용됩니다.',
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

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 확인 대화 상자 컴포넌트입니다.',
      },
    },
  },
};
