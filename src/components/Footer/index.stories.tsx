import type { Meta } from '@storybook/react';

import { MetaGenerator, StoryGenerator } from '@/shared/utils/storybook';

import Footer from './index';

const generator = new MetaGenerator(Footer)
  .setDocsDescription(
    '웹 하단의 푸터 UI를 제공합니다. 깃허브 링크를 클릭하면 코드가 있는 리파지토리로 이동합니다. 메일을 클릭하면 메일로 이동합니다.',
  )
  .setRender({ width: 720 })
  .setDisableStories(true)
  .build();

const meta = {
  title: 'Layout/Footer',
  ...generator,
} satisfies Meta<typeof Footer>;

export const Default = new StoryGenerator(Footer);

export const PC = new StoryGenerator(Footer)
  .setLayout('fullscreen')
  .setRender({ width: '100%' })
  .setDocsDisable(true)
  .setViewPort('pc')
  .build();

export const Mobile = new StoryGenerator(Footer)
  .setLayout('fullscreen')
  .setRender({ width: '100%' })
  .setDocsDisable(true)
  .setViewPort('mobile')
  .build();

export default meta;
