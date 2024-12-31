import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { DialogProvider } from '@/shared/ui';

import TrashBookmark from './index';

const meta: Meta<typeof TrashBookmark> = {
  title: 'Component/TrashBookmark',
  component: TrashBookmark,
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
    url: {
      control: {
        type: 'text',
      },
    },
    image: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    title: '네이버',
    description: '네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요',
    url: 'https://naver.com',
    image: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    redoBookmark: action('redoBookmark'),
    undoBookmark: action('undoBookmark'),
  },
  decorators: [
    (Story) => (
      <DialogProvider>
        <Story />
      </DialogProvider>
    ),
  ],
  render: (args) => (
    <div className="w-[400px]">
      <TrashBookmark {...args} />
    </div>
  ),
} satisfies Meta<typeof TrashBookmark>;

export default meta;

type Story = StoryObj<typeof TrashBookmark>;

export const Default: Story = {};
