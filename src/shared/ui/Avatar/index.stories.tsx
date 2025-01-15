import type { Meta, StoryObj } from '@storybook/react';
import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from './index';

const meta = {
  title: 'Shared/Avatar',
  component: Avatar,

  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Avatar 컴포넌트는 사용자의 아바타를 표시하는 데 사용됩니다.',
    },
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

export const Default: StoryObj<typeof Avatar> = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 아바타 컴포넌트입니다. 사용자의 프로필 이미지를 표시합니다.',
      },
    },
  },
};

export const Fallback: StoryObj<typeof Avatar> = {
  parameters: {
    docs: {
      description: {
        story: '아바타의 이미지를 가져올 수 없는 경우 보여지는 기본 이미지입니다.',
      },
    },
  },
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
