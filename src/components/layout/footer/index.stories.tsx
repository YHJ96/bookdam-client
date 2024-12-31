import { Canvas, Controls, Description, Subtitle, Title } from '@storybook/blocks';
import type { Meta as ComponentMeta, StoryObj } from '@storybook/react';

import Footer from './index';

const meta = {
  title: 'Component/Footer',
  component: Footer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Canvas of={PC} />
          <Controls of={PC} />
        </>
      ),
    },
  },
} satisfies ComponentMeta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const PC: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'pc',
    },
  },
};

export const Mobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
