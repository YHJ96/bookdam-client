import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './index';

const meta = {
  title: 'Shared/Image',
  component: Image,
  tags: ['autodocs'],
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
  args: {
    src: 'https://picsum.photos/200/300',
    alt: 'Image',
    width: 200,
    height: 300,
  },
};
