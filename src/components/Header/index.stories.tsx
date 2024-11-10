import type { Meta } from '@storybook/react';

import { MetaGenerator, StoryGenerator } from '@/shared/utils/storybook';

import Header from './index';

const genetator = new MetaGenerator(Header)
  .setDocsDescription('웹 상단의 헤더 UI를 제공합니다. 로그인 버튼을 클릭하는 경우 로그인 페이지로 이동합니다.')
  .setRender({ width: 720 })
  .setDisableStories(true)
  .build();

const meta = {
  title: 'Layout/Header',
  ...genetator,
} satisfies Meta<typeof Header>;

export const Default = new StoryGenerator(Header);

export const PC = new StoryGenerator(Header)
  .setLayout('fullscreen')
  .setRender({ width: '100%' })
  .setDocsDisable(true)
  .setViewPort('pc')
  .build();

export const Mobile = new StoryGenerator(Header)
  .setLayout('fullscreen')
  .setRender({ width: '100%' })
  .setDocsDisable(true)
  .setViewPort('mobile')
  .build();

export default meta;
