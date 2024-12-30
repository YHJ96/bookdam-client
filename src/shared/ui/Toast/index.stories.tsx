/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { useToast } from '@/shared/hooks/useToast';
import { Toast, ToastActionElement, ToastProps, Toaster } from '@/shared/ui';

const meta = {
  title: 'Shared/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive'] },
  },
  args: {
    variant: 'default',
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex h-[250px] w-[300px] justify-center">
        <Story />
        <Toaster />
      </div>
    ),
  ],
  render: (args) => {
    const { toast } = useToast();
    const handleToast = () => toast(args);

    return (
      <div>
        <button onClick={handleToast}>Show Toast</button>
      </div>
    );
  },
} satisfies Meta<typeof Toast>;

export default meta;

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

type Story = Omit<StoryObj<typeof meta>, 'args'> & {
  args: Omit<ToasterToast, 'id'>;
};

export const Default: Story = {
  args: {
    title: '메세지 제목',
    description: '메세지 내용',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: '메세지 제목',
    description: '메세지 내용',
  },
};
