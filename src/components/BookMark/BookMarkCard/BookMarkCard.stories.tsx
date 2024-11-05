import type { Meta, StoryObj } from '@storybook/react';

import BookMarkCard from './BookMarkCard';
import { MOCK } from './mock';

type Story = StoryObj<typeof BookMarkCard>;

const meta = {
  title: 'BookMark/Card',
  component: BookMarkCard,
  parameters: {
    darkMode: { stylePreview: true },
    layout: 'centered',
    docs: {
      description: {
        component:
          '이미지와 제목, 설명을 함께 보여주는 카드형식의 UI입니다. `<div>`의 속성을 상속받았기 때문에 `<div>`에 있는 속성들도 사용이 가능합니다. <div> Ex. `onClick`',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '북마크의 제목을 입력합니다.',
    },
    description: {
      control: 'text',
      description: '북마크 설명을 입력합니다.',
    },
    url: {
      control: 'text',
      description: '북마크 주소를 입력합니다.',
    },
    theme: {
      control: 'select',
      description: '북마크 테마를 설정합니다.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookMarkCard>;

export const Light: Story = {
  args: { title: MOCK.TITLE, description: MOCK.DESCRIPTION, url: MOCK.URL, theme: 'light' },
};

export const Dark: Story = {
  args: { title: MOCK.TITLE, description: MOCK.DESCRIPTION, url: MOCK.URL, theme: 'dark' },
};

export default meta;
