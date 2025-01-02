import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './index';

const meta = {
  title: 'Shared/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'Image 컴포넌트는 이미지를 표시하는 데 사용됩니다.',
    },
  },
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
    alt: {
      control: {
        type: 'text',
      },
    },
    width: {
      control: {
        type: 'number',
      },
    },
    height: {
      control: {
        type: 'number',
      },
    },
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 이미지 컴포넌트입니다.',
      },
    },
  },
  args: {
    src: 'https://picsum.photos/200/300',
    alt: 'Image',
    width: 200,
    height: 300,
  },
};
