import React from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { DialogProvider } from '@/shared/ui';

import Bookmark from './index';

const meta: Meta<typeof Bookmark> = {
  title: 'Component/Bookmark',
  component: Bookmark,
  argTypes: {
    bookmark: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    bookmark: {
      id: 1,
      title: '네이버',
      description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
      url: 'https://naver.com',
      image: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
      tags: [],
      createdAt: new Date().toISOString(),
    },
    updateBookmark: action('updateBookmark'),
    removeBookmark: action('removeBookmark'),
  },
  decorators: [
    (Story: React.ComponentType<any>) => {
      return (
        <DialogProvider>
          <Story />
        </DialogProvider>
      );
    },
  ],
  render: (args) => (
    <div className="w-[400px]">
      <Bookmark {...args} />
    </div>
  ),
} satisfies Meta<typeof Bookmark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
