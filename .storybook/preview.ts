import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';

import '../src/app/globals.css';
import { DocsContainer, GlobalDecorator } from './utils';

const CUSTOM_VIEWPORTS = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '360px',
      height: '500px',
    },
  },
  pc: {
    name: 'PC',
    styles: {
      width: '1080px',
      height: '800px',
    },
  },
};

export const preview: Preview = {
  parameters: {
    docs: { container: DocsContainer },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    darkMode: {
      darkClass: 'dark',
      stylePreview: true,
    },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...CUSTOM_VIEWPORTS },
      defaultViewport: 'Reset viewpoint',
    },
  },
  decorators: [GlobalDecorator],
  tags: ['autodocs'],
};

export default preview;
