import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

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
  },
  decorators: [
    (Story) => (
      <DialogProvider>
        <Story />
      </DialogProvider>
    ),
  ],
  render: (args) => (
    <div className="h-[150px]">
      <FloatingButton {...args} />
    </div>
  ),
};

export default meta;

export const Default: StoryObj<typeof FloatingButton> = {
  args: {
    isAnimate: false,
    createBookmark: action('createBookmark'),
  },
};

export const Animate: StoryObj<typeof FloatingButton> = {
  args: {
    isAnimate: true,
    createBookmark: action('createBookmark'),
  },
};
