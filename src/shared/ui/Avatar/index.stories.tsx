import type { Meta, StoryObj } from '@storybook/react';
import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from './index';

const meta = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/YHJ96.png" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export const Default: StoryObj<typeof Avatar> = {};

export const Fallback: StoryObj<typeof Avatar> = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  ),
};

export default meta;
