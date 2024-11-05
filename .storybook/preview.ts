import type { Preview } from '@storybook/react';

import '../src/app/globals.css';
import { DocsContainer, GlobalDecorator } from './utils';

const preview: Preview = {
  parameters: {
    docs: { container: DocsContainer },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      darkClass: 'dark',
    },
  },

  decorators: [GlobalDecorator],
};

export default preview;
