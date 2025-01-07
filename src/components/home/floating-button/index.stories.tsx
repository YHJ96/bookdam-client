import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DialogProvider } from '@/shared/ui';

import FloatingButton from './index';

const meta: Meta<typeof FloatingButton> = {
  title: 'Component/FloatingButton',
  component: FloatingButton,
  args: {
    isAnimate: true,
    createBookmark: action('createBookmark'),
  },
  parameters: {
    layout: 'padded',
    docs: {
      subtitle: 'FloatingButton 컴포넌트는 북마크를 생성하는 데 사용됩니다.',
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <DialogProvider>
            <Story />
          </DialogProvider>
        </QueryClientProvider>
      );
    },
  ],
  render: (args) => (
    <div className="h-[150px]">
      <FloatingButton {...args} />
    </div>
  ),
};

export default meta;

export const Default: StoryObj<typeof FloatingButton> = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 북마크 생성 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    isAnimate: false,
    createBookmark: action('createBookmark'),
  },
};

export const Animate: StoryObj<typeof FloatingButton> = {
  parameters: {
    docs: {
      description: {
        story:
          '애니메이션이 포함된 북마크 생성 버튼 컴포넌트입니다. 페이지에 북마크가 존재하지 않는 경우 애니메이션이 활성화됩니다.',
      },
    },
  },
  args: {
    isAnimate: true,
    createBookmark: action('createBookmark'),
  },
};
